import { SpotifyContext } from '@/context/context'
import Image from 'next/image';
import React, { useContext, useState } from 'react'

const RightSidebar = ({ handleSetSong }) => {
    const { allSongs, currentSong } = useContext(SpotifyContext);
      const [favorite, setFavorite] = useState(currentSong?.isLiked);

const hanleQueue=(id)=>{
    handleSetSong(id)
}

    const nextSongIndex = allSongs.findIndex((item) => item.id == currentSong?.id)
    const nextSong = allSongs[nextSongIndex + 1]

    if (!currentSong) {
        return <div className="text-gray-400 p-4">No song selected</div>;
    }

    return (
        <div className="right-sidebar p-4 bg-[#121212] rounded-lg space-y-6">

            <div className="song-image">
                <Image
                    src={currentSong.coverImage}
                    alt={currentSong.title}
                    width={500}
                    height={500}
                    priority={false}
                    className="w-full rounded-lg shadow-lg"
                />
            </div>


            <div className="song-info text-white flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold font-regular">{currentSong.title}</h2>
                    <p className="text-gray-400 text-lg font-regular">{currentSong.artist}</p>
                </div>
                <div className='ps-4'>
                    <span onClick={() => setFavorite(!favorite)} className='transition duration-700 cursor-pointer'>
                        {!currentSong.isLiked ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="#b3b3b3" fillRule="evenodd" clipRule="evenodd"><path d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12m10-8a8 8 0 1 0 0 16a8 8 0 0 0 0-16" /><path d="M13 7a1 1 0 1 0-2 0v4H7a1 1 0 1 0 0 2h4v4a1 1 0 1 0 2 0v-4h4a1 1 0 1 0 0-2h-4z" /></g></svg> :
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#1ed760" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z" /></svg>}
                    </span>
                </div>
            </div>

            <div className="actions flex gap-4">
                <button className="flex-1 outline hover:bg-[#f5f5f5] hover:text-black text-white py-2 rounded-full font-semibold">
                    Follow
                </button>
                <button className="flex-1 outline hover:bg-[#f5f5f5] hover:text-black text-white py-2 rounded-full font-semibold">
                    Queue
                </button>
            </div>

            {nextSong && (
                <div onClick={()=>hanleQueue(nextSong.id)} className="flex justify-between items-center bg-[#1e1e1e] p-4 rounded-lg">
                    <div className='cursor-pointer group'>
                        <p className="text-gray-400 mb-2 font-regular text-sm">Next in Queue</p>
                        <p className="text-white font-semibold group-hover:underline">{nextSong.title}</p>
                        <p className="text-gray-400 font-regular capitalize group-hover:underline ">{nextSong.artist}</p>
                    </div>
                    <div>
                        <div className='size-15'>
                            <Image src={nextSong.coverImage} className='rounded' height={500} width={500} alt={nextSong.title} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default RightSidebar