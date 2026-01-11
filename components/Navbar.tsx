import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <nav className="navbar bg-base-100 shadow-md shadow-blue-200 max-w-7xl mx-auto w-full flex justify-between">
        <div className='flex items-center'>
            <Image src='/honestcv-logo.png' alt='HonestCV Logo' width={35} height={35}/>
            <a className="btn btn-ghost text-xl font-bold">HonestCV</a>
        </div>
        
    </nav>
  )
}

export default Navbar