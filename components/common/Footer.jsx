"use client"
import { SpotifyContext } from '@/context/context'
import Image from 'next/image'
import React, { useContext, useEffect, useRef, useState } from 'react'

const Footer = () => {
  const { currentSong, isPlaying, allSongs, setCurrentSong } = useContext(SpotifyContext);
  console.log(currentSong)
  const [favorite, setFavorite] = useState(currentSong?.isLiked);
  const [play, setPlay] = useState(isPlaying);
  const audioRef = useRef(null)
  const [sleekValue, setSleekValue] = useState(null)
  const [duration, setDuration] = useState('')
  const [durationShow, setDurationshow] = useState(null)
  const [currenTime, setCurrenTime] = useState(0)
  const [currenTimeShow, setCurrenTimeShow] = useState("00:00")
  const [loop, setLoop] = useState(false);
  const progress = (currenTime / duration) * 100
  const handlePlay = () => {
    console.log(audioRef.current.duration)
    if (audioRef) {
      setPlay(!play)
      audioRef.current.play()
      if (play) audioRef.current.pause()
    }
  }

  function formatTime(totalSeconds) {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;

    // Ensure 2 digits for both minutes and seconds
    const mm = String(mins).padStart(2, '0');
    const ss = String(secs).padStart(2, '0');

    return `${mm}:${ss}`;
  }

  const handleSleek = (e) => {
    audioRef.current.currentTime = e.target.value;
    setCurrenTime(audioRef.current.currentTime)
  }
  const handleTimeUpdate = () => {
    setCurrenTimeShow(formatTime(Math.floor(audioRef.current.currentTime)))
    setCurrenTime(audioRef.current.currentTime)
  }

  const handleEnded = () => {

    if (loop) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(error => {
        console.log("Autoplay blocked. Showing play button instead.");
      });
    } else {
      handleNextSong()
    }
  }


  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleLoadedMetadata = () => {
        setDurationshow(formatTime(Math.floor(audio.duration)))
        setDuration(audio.duration)
      }
      audio.addEventListener('ended', handleEnded)
      audio.addEventListener('loadedmetadata', handleLoadedMetadata)
      audio.addEventListener('timeupdate', handleTimeUpdate)
      audio.load()
    }

    return () => {
      if (audioRef.current) {
        audioRef.removeEventListener('ended', handleEnded)
        audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata)
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate)
      }
    }
  }, [])



  useEffect(() => {
    audioRef.current.play().catch(error => {
      console.log("Autoplay blocked. Showing play button instead.");
    });
    if (isPlaying) {
      setPlay(true)
    }
  }, [currentSong])


  const handlePrevSong = () => {
    const prevSongIndex = allSongs.findIndex((item) => item.id == currentSong?.id)
    const prevSong = allSongs[prevSongIndex - 1]
    console.log(prevSong)
    if (!!prevSong) {
      setCurrentSong(prevSong?.id)
    } else {
      setCurrentSong(allSongs[allSongs.length - 1].id)
    }
  }
  const handleNextSong = () => {
    const nextSongIndex = allSongs.findIndex((item) => item.id == currentSong.id)
    const nextSong = allSongs[nextSongIndex + 1]
    console.log(nextSong)
    if (!!nextSong) {
      setCurrentSong(nextSong?.id)
    } else {
      setCurrentSong(allSongs[0].id)
    }
  }
  return (
    <footer>
      <div className='bg-[#000000] text-white p-2 flex h-20'>
        <div className='w-80 flex gap-8'>
          <div className='ms-2 flex gap-4'>
            <div>
              <Image src={currentSong?.coverImage}
                height={1000}
                width={1000}
                className='size-15 rounded'
                priority
                alt='img' />
            </div>
            <div className='flex justify-center items-center'>
              <div>
                <p className='font-regular'>{currentSong?.title}</p>
                <span className='font-regular text-xs'>{currentSong?.artist}</span>
              </div>
            </div>
          </div>
          <div className='my-auto'>
            <span onClick={() => setFavorite(!favorite)} className='transition duration-700 cursor-pointer'>
              {!currentSong.isLiked ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="#b3b3b3" fillRule="evenodd" clipRule="evenodd"><path d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12m10-8a8 8 0 1 0 0 16a8 8 0 0 0 0-16" /><path d="M13 7a1 1 0 1 0-2 0v4H7a1 1 0 1 0 0 2h4v4a1 1 0 1 0 2 0v-4h4a1 1 0 1 0 0-2h-4z" /></g></svg> :
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#1ed760" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z" /></svg>}
            </span>
          </div>
        </div>
        <div className='flex flex-col flex-1 '>
          <div className='flex items-center justify-center'>
            <div className='space-x-4'>
              <button className='cursor-pointer'>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="m18 14l4 4l-4 4m0-20l4 4l-4 4" /><path d="M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22M2 6h1.972a4 4 0 0 1 3.6 2.2M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45" /></g></svg>
                </span>
              </button>
              <button onClick={handlePrevSong} className='cursor-pointer'>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="#fff" d="m20.43 5.865l.078.699l.072.767l.036.448l.051.75l.03.55l.038.894l.019.641l.012.675l.004.707l-.004.707l-.012.675l-.019.641l-.024.606l-.028.569l-.05.78l-.035.47l-.09.986l-.079.698a1.332 1.332 0 0 1-1.844 1.065l-.49-.213l-.846-.386l-.62-.298l-.458-.226l-.748-.381l-.538-.283l-.566-.306l-.594-.329l-.619-.353l-.615-.36l-.582-.349l-.809-.5l-.73-.47l-.443-.292l-.406-.274l-.54-.373l-.587-.42l-.43-.319a1.332 1.332 0 0 1 .002-2.13l.325-.242l.422-.306l.517-.363l.607-.414l.694-.458l.51-.327l.546-.342l.581-.355l.617-.366l.32-.186q.312-.18.613-.349l.588-.326l.563-.304l.793-.414l.725-.365l.442-.215l.597-.283l.802-.362l.355-.154a1.332 1.332 0 0 1 1.846 1.065ZM6 5a1 1 0 0 1 .993.883L7 6v12a1 1 0 0 1-.883.993L6 19H5a1 1 0 0 1-.993-.883L4 18V6a1 1 0 0 1 .883-.993L5 5z" /></g></svg>
                </span>
              </button>
            </div>
            <div className='px-4 flex justify-center items-center' >
              <button className='h-10 w-10 cursor-pointer' onClick={handlePlay}>
                <span>{
                  play ? <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="#fff" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2m-1 14H9V8h2zm4 0h-2V8h2z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 16 16"><path fill="#fff" fillRule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1m3.901 7L6 4.066v7.868z" clipRule="evenodd" /></svg>
                }
                </span>
              </button>
            </div>
            <div className='space-x-4'>
              <button onClick={handleNextSong} className='cursor-pointer'>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className='rotate-180' viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="#fff" d="m20.43 5.865l.078.699l.072.767l.036.448l.051.75l.03.55l.038.894l.019.641l.012.675l.004.707l-.004.707l-.012.675l-.019.641l-.024.606l-.028.569l-.05.78l-.035.47l-.09.986l-.079.698a1.332 1.332 0 0 1-1.844 1.065l-.49-.213l-.846-.386l-.62-.298l-.458-.226l-.748-.381l-.538-.283l-.566-.306l-.594-.329l-.619-.353l-.615-.36l-.582-.349l-.809-.5l-.73-.47l-.443-.292l-.406-.274l-.54-.373l-.587-.42l-.43-.319a1.332 1.332 0 0 1 .002-2.13l.325-.242l.422-.306l.517-.363l.607-.414l.694-.458l.51-.327l.546-.342l.581-.355l.617-.366l.32-.186q.312-.18.613-.349l.588-.326l.563-.304l.793-.414l.725-.365l.442-.215l.597-.283l.802-.362l.355-.154a1.332 1.332 0 0 1 1.846 1.065ZM6 5a1 1 0 0 1 .993.883L7 6v12a1 1 0 0 1-.883.993L6 19H5a1 1 0 0 1-.993-.883L4 18V6a1 1 0 0 1 .883-.993L5 5z" /></g></svg>
                </span>
              </button>
              <button onClick={() => setLoop(!loop)} className='cursor-pointer'>
                <span className={`fill-[#ffffff70] ${loop && 'fill-white'} `}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16"><path d="M5.38 2c-1.28 0-2.06 0-2.7.224a4 4 0 0 0-2.45 2.45c-.225.642-.225 1.42-.224 2.7v2.12c0 1.93 1.57 3.5 3.5 3.5a.5.5 0 0 0 0-1a2.5 2.5 0 0 1-2.5-2.5v-2c0-1.44.007-2.03.168-2.49a3 3 0 0 1 1.84-1.84c.461-.161 1.05-.168 2.49-.168h5c1.44 0 2.03.007 2.49.168c.862.302 1.54.979 1.84 1.84c.161.461.168 1.05.168 2.49s-.007 2.03-.168 2.49a3 3 0 0 1-1.84 1.84c-.461.161-1.05.168-2.49.168h-2.79l2.15-2.15a.5.5 0 0 0-.707-.707l-3 3a.5.5 0 0 0 0 .707l3 3a.5.5 0 0 0 .707-.707l-2.15-2.15h2.91c1.28 0 2.06 0 2.7-.224a4 4 0 0 0 2.45-2.45c.225-.642.225-1.42.224-2.7v-.234c0-1.28 0-2.06-.224-2.7a4 4 0 0 0-2.45-2.45c-.642-.225-1.42-.225-2.7-.224h-5.23z" /></svg>
                </span>
              </button>
            </div>
          </div>
          <div className='flex items-center *:px-2 justify-center'>
            <div className='font-regular text-xs'>{currenTimeShow}</div>
            <div className='max-w-100 w-full'>
              <input
                min="0"
                step='0.1'
                style={{
                  background: `linear-gradient(to right, #ffffff ${progress}%, #4d4d4d ${progress}% `
                }}
                max={duration}
                className="h-1 cursor-pointer sleek-slider "
                value={currenTime}
                type="range"
                onChange={handleSleek}
              />
              <audio
                ref={audioRef}
                src={currentSong?.audioUrl}
                preload='metadata'
                className='sleek'
                controlsList='nodownload'
              ></audio>
            </div>
            <div className='font-regular text-xs'>{durationShow}</div>
          </div>
        </div>
        <div className='w-70'>

        </div>
      </div>
    </footer>
  )
}

export default Footer