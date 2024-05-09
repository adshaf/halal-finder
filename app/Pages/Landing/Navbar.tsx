'use client';

import React from 'react'

const Navbar = () => {
  return (
    <div className='fixed w-full z-10 flex flex-row justify-between pt-4 pr-[5rem] pl-[5rem]'>
        <div className='flex flex-row justify-center items-center text-2xl bolder italic text-white'>
          Halal Nyams
        </div>
        <div className='flex flex-row gap-3 justify-center items-center cursor-pointer text-xl'>
          <div className='bold flex-row mix-blend-difference text-white hover:bg-green-200 hover:text-black p-2 transition rounded-md'>
            Log in
          </div>
          <div className='flex flex-row border-solid border-[1px] border-white text-white 
            transition cursor-pointer p-2 rounded-[5px] hover:bg-green-200 hover:text-black'>
            Sign up
          </div>
        </div>
    </div>


  )
}

export default Navbar