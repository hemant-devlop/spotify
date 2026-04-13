import { SpotifyContext } from '@/context/context'
import Image from 'next/image'
import React, { useContext } from 'react'

const SongsList = ({ songs,handleSetSong,box1w }) => {
const spotifyCtx=useContext(SpotifyContext);

    return (<div>{songs.map(item =>
        <div onClick={()=>handleSetSong(item.id)} className={`flex p-1.5 hover:bg-[#2a2a2a] ${spotifyCtx.currentSong.id===item.id?'bg-[#2a2a2a88]':''} cursor-pointer mx-1.5 rounded gap-2 transition duration-300`} key={item.id}>
            <div className='size-13'>
                <Image src={item.coverImage} className='rounded' height={500} width={500} alt={item.title} />
            </div>
            <div className={`${box1w<230?'hidden':'block'}`}>
                <p className='font-semibold text-white'>{item.title}</p>
                <p className='font-regular text-sm text-white'>{item.artist}</p>
            </div>

        </div>)}
    </div>
    )
}

export default SongsList