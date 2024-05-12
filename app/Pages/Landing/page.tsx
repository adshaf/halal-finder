'use client';

import Link from 'next/link';
import React from 'react';
import './Landing.css';
import { FaFacebook } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

const Landing = () => {
  return (
    <div>
        <div className='Overlay'></div>

        <div className='BgSearch max-w-[2520px] mx-auto xl:px-20 mx:px-10 sm:px-2 px-4 flex border-solid border-[1px] pb-3 flex-col min-h-[900px] pt-[24rem]'>
            <div className='flex text-white text-[46px] z-20 italic font-bold'>Find halal food near you</div>
            <div className='Search z-10'>
                <div className='SearchBar'>
                    <div className='flex flex-row gap-4 items-center'>
                        <FaSearch className='text-2xl'/>
                        <div>Search by locations.....</div>
                    </div>
                    </div>
                <Link href={""}  className='SearchButton hover:bg-green-950 transition'>Search</Link>
            </div>
        </div>

        <div className='max-w-[2520px] mx-auto xl:px-20 mx:px-10 sm:px-2 px-4 flex border-solid border-[1px] pt-[50px] pb-3 grid-cols-1 h-[1500px] flex-col'>
            <div className='mb-10 h2'>Search by Cuisine </div>
            <div className='CuisineGrid grid-cols-4'>
                <div className='Box1'>
                    <div className='CardOverlay'>
                        <div className='BoxText'>Indonesian</div>
                    </div>
                </div>
                <div className='Box2'>
                    <div className='CardOverlay'>
                        <div className='BoxText'>Korean</div>
                    </div>
                </div>
                <div className='Box3'>
                    <div className='CardOverlay'>
                        <div className='BoxText'>Steakhouse</div>
                    </div>
                </div>
                <div className='Box4'>
                    <div className='CardOverlay'>
                        <div className='BoxText'>Fine Dining</div>
                    </div>
                </div>
                <div className='Box5'>
                    <div className='CardOverlay'>
                        <div className='BoxText'>Chinese</div>
                    </div>
                </div>
                <div className='Box6'>
                    <div className='CardOverlay'>
                        <div className='BoxText'>Japanese</div>
                    </div>
                </div>
                <div className='Box7'>
                    <div className='CardOverlay'>
                        <div className='BoxText'>Middle Eastern</div>
                    </div>
                </div>
                <div className='Box8'>
                    <div className='CardOverlay'>
                        <div className='BoxText'>Fast Food</div>
                    </div>
                </div>
                <div className='Box9'>
                    <div className='CardOverlay'>
                        <div className='BoxText'>Indian</div>
                    </div>
                </div>
            </div>
        </div>
        
        <div className='max-w-[2520px] mx-auto xl:px-20 mx:px-10 sm:px-2 px-4 flex border-solid border-[1px] pt-3 pb-3 h-[300px] flex-col'>
            <div className='flex flex-row justify-between'>
                <div>
                    <div className='Footer'>Halal Nyams</div>
                    <div className='FooterEmail'>halalnyams@hamnyam.com</div>
                    <div className='IconsList'>
                        <FaFacebook />
                        <FaTiktok />
                        <RiInstagramFill />
                        <FaSquareXTwitter />
                    </div>
                </div>
                <div>
                    <div className='JoinUsButton cursor-pointer'>Join us</div>
                    <div className='FooterEmail'>(c) Halalnyams 2024</div>
                </div>
            </div>
        </div>
    </div>

  )
}

export default Landing