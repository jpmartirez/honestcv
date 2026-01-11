export const runtime = "nodejs";

import 'dotenv/config'
import { GoogleGenAI } from '@google/genai';
import { NextResponse } from "next/server";
const pdf = require('pdf-parse-new');

import { nanoid } from 'nanoid';


const client = new GoogleGenAI({});

export async function POST(req: Request) {
    try {

        // Parse incoming data
        const data = req.formData();
        const file: File | null = (await data).get("file") as unknown as File;
        const jobDescription: string = ((await data).get('jobDescription') as string) || "";

        if (!file){
            return NextResponse.json({message: "No file uploaded"}, {status: 400})
        }

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes)

        // Extract text from pdf
        const pdfData = await pdf(buffer);
        const resumeText = pdfData.text;

        // Prompt
        const prompt = `
        Act as a strict, professional Resume Editor and Recruiter.
        Analyze the following resume text against the provided Job Description (if any).

        Resume Text: 
        "${resumeText.slice(0, 20000)}"
        
        Job Description:
        "${jobDescription}"

        You must return a response in strictly valid JSON format with no markdown formatting.
        The JSON object must follow this schema:
        {
        "grammar_review": {
          "score": number, // 0-100
          "issues": string[], // List of specific grammar mistakes or awkward phrasing
          "typos": string[] // List of specific spelling errors
        },
        "content_accuracy": {
          "consistency_score": number, // 0-100 (Are dates consistent? Do skills match experience?)
          "feedback": string // Comment on the logical flow and consistency of the resume
        },
        "job_relevance": {
          "match_score": number, // 0-100 (How well does it fit the provided JD?)
          "missing_keywords": string[], // Keywords from JD missing in Resume
          "analysis": string // Brief paragraph on fit
        },
        "overall_recommendations": string[] // 3-5 high-impact bullet points
      }
        `

            // Get the results
            const interaction =  await client.interactions.create({
                    model: 'gemini-2.5-flash',
                    input: prompt,
                });

            const textOutput = interaction.outputs?.find(
                (o) => o.type === "text"
                );

            const text = textOutput?.text;

            // Clean and Parse JSON
            const editedText =  text?.replace(/```json/g, "").replace(/```/g, "").trim() || "";
            const analysis = JSON.parse(editedText)
            
            return NextResponse.json({success: true, analysis})

        
    } catch (error) {
        console.log("Analyze Error: ", error)
        return NextResponse.json({message: "Failed to analyze the resume", details: (error as Error).message}, {status: 500})
    }
}
