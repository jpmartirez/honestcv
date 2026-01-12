'use client'

import Brands from '@/components/Brands'
import Results from '@/components/Results'
import { ALargeSmall, ArrowUp, Check, Plus, Sparkles, UserRoundSearch } from 'lucide-react'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'

const Page = () => {
  const [file, setFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null >(null)
  
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] =  useState<boolean>(false)


  const handleSubmit = async () => {
        setLoading(true)
        if (!file) return toast.error("Select a PDF ");
        if (jobDescription === "") return toast.error("Indicate your job description");

        const formData = new FormData();
        formData.append("file", file);
        formData.append('jobDescription', jobDescription)

        const res = await fetch('/api/analyze', {
            method: 'POST',
            body: formData
        })

        if(!res.ok) {
          setLoading(false)
          toast.error("Please try again")
        };

        const data = await res.json();

        if(!data.success) {
          setLoading(false)
          toast.error('Analysis Failed')
        };
        
        setResult(data.editedText);
        setLoading(false)
    }

  if(loading) return <div className='min-h-[80vh] w-full flex justify-center items-center'>
    <span className="loading loading-xl loading-spinner text-info"></span>
  </div>

  return (
    <>
    {result ? (
      <Results result={result}/>
    ) : (
      <div className='max-w-7xl mx-auto w-full flex flex-col items-center justify-center mt-7 lg:mt-12 gap-5 px-5'>
      <div className="badge badge-soft badge-info text-sm lg:text-md flex items-center gap-2"><Sparkles className='size-4'/>New: Advanced ATS Scanning</div>

      <h1 className='text-center font-bold text-2xl md:text-4xl lg:text-5xl'>Optimized Your Resume in <br /> <span className='text-blue-600'>Seconds</span> with AI</h1>

      <p className='max-w-2xl text-gray-500 text-center text-sm md:text-md lg:text-lg xl:text-xl'>Is your resume holding you back? Get instant feedback, ATS scoring, and actionable improvements. Let our AI roast your resume to perfection</p>


      {/* File Input */}
      <div className='max-w-3xl w-full p-5 ' >
        <div className="max-w-2xl w-full rounded-xl overflow-hidden mt-4 mx-auto p-3 shadow-lg shadow-blue-200 bg-base-200" style={{ boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)' }}>
                <textarea className="w-full p-3 pb-0 resize-none outline-none bg-transparent text-gray-700"
                    placeholder="Tell us about your job description and upload your resume" rows={3} value={jobDescription} onChange={e=>setJobDescription(e.target.value)}></textarea>

                    {file && (
                      <div className="mt-3 px-3 flex items-center justify-between rounded-md bg-base-100 p-2 my-3">
                        <div className="flex items-center gap-2 text-sm">
                          📄 <span className="truncate max-w-xs">{file.name}</span>
                        </div>
                        <button
                          onClick={() => {
                            setFile(null)
                         

                            if (fileInputRef.current) fileInputRef.current.value = ""
                          }}
                          className="text-xs text-red-600 cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    )}

                
                <div className="flex items-center justify-between pb-3 px-3">
                    <label htmlFor="dropzone-file"  className="flex items-center justify-center p-1 rounded-full size-6 btn btn-neutral"
                        aria-label="Add">
                        <Plus className='text-white'/>
                        <input ref={fileInputRef} id="dropzone-file" type="file" className="hidden" accept='application/pdf' onChange={e => {
                          const selectedFile = e.target.files?.[0]
                          if (!selectedFile) return

                          if (selectedFile.type !== "application/pdf") {
                            toast.error("Only PDF files are allowed")
                            return
                          }

                          setFile(selectedFile)
                          
                        }}/>
                    </label >
                    <button onClick={handleSubmit} className="flex items-center justify-center p-1 rounded size-6 btn btn-primary" aria-label="Send">
                        <ArrowUp className='text-white'/>
                    </button>
                </div>
        </div>

        <div className='flex items-center justify-center gap-3 p-5 flex-wrap'>
          <div className="badge badge-soft badge-accent"><span><Check className='bg-green-500 text-white rounded-full'width={16} height={16}/></span>ATS Friendly</div>
          <div className="badge badge-soft badge-primary"><span><ALargeSmall className='rounded-full size-5'/></span>Grammar Check</div>
          <div className="badge badge-soft badge-info"><span><UserRoundSearch className='rounded-full size-5'/></span>Skill Gap Analysis</div>
        </div>
      </div> 

      <div className='mt-8 max-w-7xl w-full mb-10'>
        <h1 className='text-lg lg:text-xl font-bold text-gray-400 text-center mb-7'>TRUSTED BY JOB SEEKERS HIRED AT</h1>
        <Brands/>
      </div>

    </div>
    )}
    </>
  )
}

export default Page