import Brands from '@/components/Brands'
import { ALargeSmall, Check, Sparkles, UserRoundSearch } from 'lucide-react'
import { useState } from 'react'

const Page = () => {
  const [file, setFile] = useState<File | null>(null)

  

  return (
    <div className='max-w-7xl mx-auto w-full flex flex-col items-center justify-center mt-7 lg:mt-12 gap-5 px-5'>
      <div className="badge badge-soft badge-info text-sm lg:text-lg flex items-center gap-2"><Sparkles className='size-4'/>New: Advanced ATS Scanning</div>

      <h1 className='text-center font-bold text-2xl md:text-4xl lg:text-5xl'>Optimized Your Resume in <br /> <span className='text-blue-600'>Seconds</span> with AI</h1>

      <p className='max-w-2xl text-gray-500 text-center text-sm md:text-md lg:text-lg xl:text-xl'>Is your resume holding you back? Get instant feedback, ATS scoring, and actionable improvements. Let our AI roast your resume to perfection</p>


      {/* File Input */}
      <div className='max-w-3xl w-full p-5  rounded-xl' style={{ boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)' }}>
        <div className="flex items-center justify-center w-full">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-400 border-dashed rounded-base cursor-pointer hover:bg-gray-200 bg-gray-100 rounded-lg">
              <div className="flex flex-col items-center justify-center text-body pt-5 pb-6">
                  <p className="mb-2 text-lg lg:text-xl font-bold">Drag & Drop your Resume Here</p>
                  <p className="text-md text-gray-500">Supports PDF, Docs up to 10mb</p>
              </div>
              
              <input id="dropzone-file" type="file" className="hidden" />
          </label>
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
  )
}

export default Page