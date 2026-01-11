'use client'

import { useState } from "react"

const TestPage = () => {
    const [file, setFile] = useState<File | null>(null)

    const handleSubmit = async () => {
        if (!file) return alert("Select a PDF");

        const formData = new FormData();
        formData.append("file", file);
        formData.append('jobDescription', "Frontend Developer with React and Typescript")

        const res = await fetch('/api/analyze', {
            method: 'POST',
            body: formData
        })

        const data = await res.json();
        console.log(data)
    }

  return (
    <div>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />
      <button onClick={handleSubmit}>Upload PDF</button>
    </div>
  )
}

export default TestPage