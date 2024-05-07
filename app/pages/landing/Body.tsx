'use client';

import React from 'react';
import './body.css';

const Body = () => {
  return (
    <div>
        <div className='Overlay'>overlay</div>


        <div className='BgSearch max-w-[2520px] mx-auto xl:px-20 mx:px-10 sm:px-2 px-4 flex border-solid border-[1px] pb-3 flex-col h-[900px] pt-[24rem]'>
            <div className='flex text-white text-[46px] z-50 italic font-bold'>Find halal food near you</div>
            <div className='Search z-50'>
                <div className='SearchBar'>Search by locations.....</div>
                <div className='SearchButton'>Search</div>
            </div>
        </div>

        <div className='max-w-[2520px] mx-auto xl:px-20 mx:px-10 sm:px-2 px-4 flex border-solid border-[1px] pt-[50px] pb-3 grid-cols-1 h-[1500px] flex-col'>
            <div className='mb-10 h2'>Search by Cuisine </div>
            <div className='CuisineGrid grid-cols-4'>
                <div className='CuisineBox'>Indonesian</div>
                <div className='CuisineBox'>Korean</div>
                <div className='CuisineBox'>Steakhouse</div>
                <div className='CuisineBox'>Fine Dining</div>
                <div className='CuisineBox'>Chinese</div>
                <div className='CuisineBox'>Japanese</div>
                <div className='CuisineBox'>Middle Eastern</div>
                <div className='CuisineBox'>Japanese</div>
                <div className='CuisineBox'>Indian</div>
            </div>
        </div>
        
        <div className='max-w-[2520px] mx-auto xl:px-20 mx:px-10 sm:px-2 px-4 flex border-solid border-[1px] pt-3 pb-3 h-[300px] flex-col'>
            <div className='mt-4 mb-10'>Section 3 - Footer section</div>
            <div className='flex flex-row justify-between'>
                <div>
                    <div className='mb-5'>Halal Nyams</div>
                    <div className='mb-5'>halalnyams@hamnyam.com</div>
                    <div className='mb-5'>icons</div>
                </div>
                <div>
                    <div className='JoinUsButton'>Join us</div>
                    <div>@ Halalnyams 2024</div>
                </div>
            </div>
            

        </div>

    </div>

  )
}

export default Body