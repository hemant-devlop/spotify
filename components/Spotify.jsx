'use client'
import React, { useEffect } from 'react'
import Navbar from './common/Navbar'
import MainHomePage from './main/MainHomePage'
import Footer from './common/Footer'

const Spotify = () => {
   useEffect(() => {
    document.addEventListener('selectstart', (e) => {
      e.preventDefault();
    });
  }, [])
  return (
    <div className='max-w-375 w-full mx-auto h-screen '>
        <Navbar/>
        <MainHomePage/>
        <Footer/>
    </div>
  )
}

export default Spotify