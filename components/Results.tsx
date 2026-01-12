import { BadgeCheck, BookA, CircleCheckBig, EqualApproximately, Lightbulb } from 'lucide-react'
import React from 'react'
import ReactMarkdown from "react-markdown";


const Results = ({result} : {result:string}) => {

  const data = JSON.parse(result);

  return (
    <div className='max-w-7xl mx-auto w-full my-10'>
      {/* Header */}
      <div className='flex flex-col gap-2 justify-center mb-10'>
        <h1 className='text-2xl font-bold'>Detailed Resume Analysis Report</h1>
        <p>AI-powered insights for your professional profile based on your Job Description </p>
      </div>

      {/* Results */}
      <div className="flex items-center gap-5 justify-center flex-wrap">


        {/* Grammar Review */}

          <div className='flex flex-col gap-2 justify-center'>
            <div className="card max-w-96 w-full bg-base-100 card-md shadow-md">
              <div className="card-body">
                {/* Grammar Review */}
                <div className='card-title w-full flex items-center justify-between '>
                  <div className='flex items-center gap-2'>
                    <BookA className='text-blue-500'/>
                    <p className='text-lg text-blue-500 font-semibold'>Grammar Review</p>
                  </div>
                  <div>
                    <span className='text-gray-500 text-sm'>Score: {data.grammar_review.score}/100</span>
                  </div>
                </div>

                {/* Typos Found */}
                <div className='w-full p-3 bg-red-200 rounded-xl'>
                  <h1 className='text-red-600 font-bold'>TYPOS FOUND ({data.grammar_review.typos})</h1>
                  {data.grammar_review.typos.map((typo: string, index: number) => (
                    <p className='text-green-500' key={index}>{typo}</p>
                  ))}
                </div>

                {/* Tone Analysis */}
                <div>
                  <p className='font-bold text-lg'>Tone Analysis</p>
                  <p className='text-gray-500 text-sm'>Professional and consistent throughout. Good use of action verbs</p>
                </div>
                
              </div>
            </div>
          </div>

          {/* Content Accuracy */}
          <div className="card max-w-96 w-full bg-base-100 card-md shadow-sm">
            <div className="card-body flex flex-col gap-2 justify-center">
              <div className='card-title'>
                <BadgeCheck className='text-blue-500'/>
                <p className='text-blue-500'>Content Accuracy</p>
              </div>

              {/* Consistency Score */}
              <div className='flex flex-col gap-2 justify-center'>
                <div className='flex items-center justify-between'>
                  <p className='font-bold text-md'>Consistency Score</p>
                  <div className='text-blue-500'>{data.content_accuracy.consistency_score}%</div>
                </div>
                <div className='w-full bg-gray-200 rounded-lg' >
                  <div className='bg-blue-500 h-auto rounded-lg text-blue-500' style={{width: `${data.content_accuracy.consistency_score}%`}}>.</div>
                </div>
                  
              </div>
            </div>
          </div>


        {/* Job Relevance */}
        <div className="card max-w-96 w-full bg-base-100 card-md shadow-sm">
          <div className="card-body flex flex-col gap-2 justify-center">
            <div className='card-title flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <EqualApproximately className='text-blue-500'/>
                <p className='text-blue-500'>Job Relevance</p>
              </div>

              <div className=''><p className='text-sm text-gray-500'>Match: {data.job_relevance.match_score}%</p></div>
            </div>

            {/* Missing Keywords */}
            <div className='flex flex-col justify-center gap-2 mb-3'>
              <div>
                <p className='text-gray-500 font-bold'>MISSING KEYWORDS</p>
              </div>

              <div className='flex items-center flex-wrap gap-2'>
                {data.job_relevance.missing_keywords.map((word: string, index:number) => (
                  <span key={index} className='bg-orange-100 px-2 py-1 rounded-md text-orange-500 font-semibold'>{word}</span>
                )) }
              </div>
            </div>

            {/* Fit Analysis */}
            <div className='flex flex-col gap-2 justify-center'>
              <div><p className='text-gray-800 font-bold'>FIT ANALYSIS</p></div>
              <span className='text-gray-500'><ReactMarkdown>{data.job_relevance.analysis}</ReactMarkdown></span>
              
              
            </div>
          </div>
        </div>

        {/* Overall Recommendation */}
        <div className='w-full bg-blue-100 p-4 border border-blue-300 rounded-xl'>
          {/* Header */}
          <div className='flex items-center gap-4 mb-5'>
            <Lightbulb className='text-blue-500'/>
            <p className='text-blue-500 text-xl font-bold'>Overall Recommendation</p>
          </div>

          <div className='flex flex-col gap-2 w-full px-5'>
            {data.overall_recommendations.map((rec: string, index: number)=>(
              <div className='flex items-center gap-3' key={index}>
                <CircleCheckBig className='text-blue-500'/>
                <span className='text-gray-700 font-medium'><ReactMarkdown>{rec}</ReactMarkdown></span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Results