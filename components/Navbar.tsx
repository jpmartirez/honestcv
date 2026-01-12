import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className="navbar bg-base-100 shadow-md shadow-blue-200 max-w-7xl mx-auto w-full flex justify-between">
        <a href='/' className='flex items-center gap-2 btn bg-transparent border-none shadow-none'>
            <Image src='/honestcv-logo.png' alt='HonestCV Logo' width={35} height={35}/>
            <p className=" text-xl font-bold ">HonestCV</p>
        </a>
        
    </nav>
  )
}

export default Navbar