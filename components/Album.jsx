"use client"
import React from 'react'
import Navbar from './common/Navbar'
import AlbumCompo from './main/AlbumCompo'

const Album = () => {
  return (
    <div className='max-w-375 w-full mx-auto'>
        {/* <Navbar/> */}
        <AlbumCompo/>
    </div>
  )
}

export default Album