'use client';

import React from 'react'
import Container from '../Container'

const Navbar = () => {
  return (
    <Container>
        <div>Halal Nyams</div>
        <div className='flex flex-row gap-3 justify-center items-center cursor-pointer'>
          <div>Log in</div>
          <div className='flex flex-row border-solid border-[1px] border-black transition cursor-pointer p-2 rounded-[5px]'>
            Sign up
          </div>
        </div>
    </Container>


  )
}

export default Navbar