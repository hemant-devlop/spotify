'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import SongsList from '../common/SongsList'
import { SpotifyContext } from '@/context/context'
import RightSidebar from '../common/RightSidebar'
import Image from 'next/image'

const MainHomePage = () => {
  const spotifyCtx = useContext(SpotifyContext)
  const [songs, setSongs] = useState([])
  const [list, setList] = useState(true)
  const [isActive, setIsActive] = useState(0)
  const [box1, setBox1] = useState(false)
  const [box1w, setBox1w] = useState(280)
  
  const [box, setBox] = useState(false)
  const [boxw, setBoxw] = useState(280)
  

  const middelNav = ['All', 'Music', 'Podcasts']
  const boxRef = useRef(null)
  const leftRef = useRef(null)

  const boxRef1 = useRef(null)
  const rightRef = useRef(null)




  const handleSetSong = (id) => {
    return spotifyCtx.setCurrentSong(id)
  }

  useEffect(() => {

    if (!!spotifyCtx.allSongs) {
      setSongs(spotifyCtx.allSongs)
    }
  }, [])

  const resizeElement1 = boxRef1.current
  const resizeElement = boxRef.current

  const handleOpenbox1 = () => {
    setBox1(true)
    resizeElement1.style.width = '800px'
  }

  const handleClosebox1 = () => {
    if (box1w > 80) {
      setBox1w(75)
      setBox1(false)
      resizeElement1.style.width = '74px'
    } else {
      setBox1(false)
      setBox1w(300)
      resizeElement1.style.width = '280px'
    }
  }
  const handleClosebox = () => {
    if (boxw > 280) {
      setBoxw(280)
      setBox(false)
      resizeElement.style.width = '280px'
    } else {
      setBox(false)
      setBoxw(300)
      resizeElement.style.width = '800px'
    }
  }

  // console.log(currentSong)
  useEffect(() => {
    const resizeElement = boxRef.current
    const styles = getComputedStyle(resizeElement)
    let width = parseInt(styles.width, 10)
    let xCord = 0;

    const resizeElement1 = boxRef1.current
    const styles1 = getComputedStyle(resizeElement1)
    let width1 = parseInt(styles1.width, 10)
    let xCord1 = 0;

    const onMouseMoveBox = (e) => {
      const dx = e.clientX - xCord;
      xCord = e.clientX;
      width = width - dx;

      if (width < 420 && width > 250) {
        resizeElement.style.width = `${width}px`
      }
    }

    const onMouseUpBox = (e) => {
      document.removeEventListener('mousemove', onMouseMoveBox)
    }
    const onMouseDownBox = (e) => {
      xCord = e.clientX;

      document.addEventListener('mousemove', onMouseMoveBox)
      document.addEventListener('mouseup', onMouseUpBox)
    }

    const onMouseMoveBox1 = (e) => {
      const dx = e.clientX - xCord1;
      xCord1 = e.clientX;
      width1 = width1 + dx;
      console.log(width1)
      setBox1w(width1)
      if (width1 < 420 && width1 > 74) {
        resizeElement1.style.width = `${width1}px`
      }
    }

    const onMouseUpBox1 = (e) => {
      document.removeEventListener('mousemove', onMouseMoveBox1)
    }
    const onMouseDownBox1 = (e) => {
      xCord1 = e.clientX;
      console.log(xCord1)
      document.addEventListener('mousemove', onMouseMoveBox1)
      document.addEventListener('mouseup', onMouseUpBox1)
    }

    const resizeleft = leftRef.current
    resizeleft.addEventListener('mousedown', onMouseDownBox)

    const resizeleft1 = rightRef.current
    resizeleft1.addEventListener('mousedown', onMouseDownBox1)

    return () => {
      resizeleft.removeEventListener('mousedown', onMouseDownBox)
      resizeleft1.removeEventListener('mousedown', onMouseDownBox1)
    }
  }, [])

  const rightsideBar = ['Playlists', 'Artists', 'Albums', 'Podcats&Shows', 'Events']
  return (
    <div className=' h-[calc(100vh-10rem)]'>

      <div className='md:hidden bg-[#121212] p-4'>
        {spotifyCtx.currentSong ? (
          <div className='text-white relative overflow-hidden'>
            <div className='flex flex-col items-center mb-6'>
              <Image
                src={spotifyCtx.currentSong.coverImage}
                alt={spotifyCtx.currentSong.title}
                height={300}
                width={300}
                className='w-64 h-64 rounded-lg shadow-2xl mb-4'
              />
              <h1 className='text-2xl font-bold mb-2 text-center font-regular'>{spotifyCtx.currentSong.title}</h1>
              <p className='text-gray-400 mb-4 text-center font-regular'>{spotifyCtx.currentSong.artist}</p>
              <button className='outline hover:bg-[#000000d0] text-white px-6 py-2 rounded-full font-bold mb-4'>
                Like
              </button>
            </div>
            <div className={`absolute shadow-xl bottom-0 transform transition-all duration-500 bg-[#121212a0] rounded-xl  ${list?'translate-y-0':'translate-y-100'}`}>
              <div className='flex justify-between items-center'>
                <h2 className='text-xl font-bold mb-4'>Next Songs</h2>
                <span onClick={()=>setList(false)} className='p-4 font-regular cursor-pointer'>X</span>
              </div>
              <div className='space-y-1'>
                {songs.slice(0, 5).map((song, index) => (
                  <div
                    key={song.id}
                    onClick={() => handleSetSong(song.id)}
                    className='flex items-center gap-3 p-2 rounded-lg hover:bg-[#1e1e1e] cursor-pointer'
                  >
                    <img
                      src={song.coverImage}
                      alt={song.title}
                      className='w-12 h-12 rounded'
                    />
                    <div>
                      <p className='text-white font-medium'>{song.title}</p>
                      <p className='text-gray-400 text-sm font-regular'>{song.artist}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
           <div onClick={()=>setList(!list)} className='absolute left-0 z-99 -bottom-2 cursor-pointer '>
            <span className='fill-white hover:fill-[#808080]'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fillRule="evenodd" d="M2.25 6A.75.75 0 0 1 3 5.25h18a.75.75 0 0 1 0 1.5H3A.75.75 0 0 1 2.25 6m0 4A.75.75 0 0 1 3 9.25h18a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75m0 4a.75.75 0 0 1 .75-.75h8a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75m14.762.43a.75.75 0 0 1 .976 0l3.5 3a.75.75 0 1 1-.976 1.14L17.5 15.987l-3.012 2.581a.75.75 0 1 1-.976-1.138zM2.25 18a.75.75 0 0 1 .75-.75h8a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75" clipRule="evenodd"/></svg>
            </span>
           </div>
          </div>
        ) : (
          <div className='text-gray-400 text-center h-full flex items-center justify-center'>
            Select a song to play
          </div>
        )}
      </div>
      <div className='hidden md:flex bg-black gap-1 px-1.5 h-full'>
        <div ref={boxRef1} className={`bg-[#121212] group w-76 relative rounded-lg h-full overflow-y-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}>
          <div ref={rightRef} className='h-[95%] transform -translate-y-1/2 z-99  top-1/2 w-0.5 absolute right-0 hover:bg-white transition duration-100 hover:cursor-grab'></div>
          <div className='text-white bg-[#121212] shadow-2xl w-full rounded-t-lg sticky top-0 z-20'>
            <div className={`flex items-center justify-between pb-4 ${box1w < 230 ? 'flex-col pt-2' : 'flex-row  pt-4'}`}>
              <div className={`font-bold text-lg flex ${box1w < 230 ? 'p-2' : '-translate-x-8 group-hover:translate-x-0'} transition-all duration-300`}>
                <div className='px-2 flex justify-center items-center cursor-pointer' onClick={handleClosebox1}>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" className='fill-[#b3b3b3] hover:fill-white' viewBox="0 0 24 24"><path d="M3 18h13v-2H3zm0-5h10v-2H3zm0-7v2h13V6zm18 9.59L17.42 12L21 8.41L19.59 7l-5 5l5 5z" /></svg>
                  </span>
                </div>
                <div className={`${box1w < 230 ? 'hidden' : 'block'}`}>Your Liabrary</div>
              </div>
              <div className='flex justify-center items-center gap-4 px-4 *:cursor-pointer'>
                <span className='bg-[#1f1f1f] hover:bg-[#282828] p-2 rounded-full'>
                  <svg data-encore-id="icon" height='18' width='18' role="img" aria-hidden="true" className="fill-[#b3b3b3]" viewBox="0 0 16 16" ><path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75"></path></svg>
                </span>
                <span className={`p-2 rounded-full hover:bg-[#282828] ${box1w < 230 ? 'hidden' : 'block'}`} onClick={handleOpenbox1}>
                  <svg data-encore-id="icon" height='16' width='16' role="img" className='fill-[#b3b3b3]' aria-hidden="true" viewBox="0 0 16 16" ><path d="M6.53 9.47a.75.75 0 0 1 0 1.06l-2.72 2.72h1.018a.75.75 0 0 1 0 1.5H1.25v-3.579a.75.75 0 0 1 1.5 0v1.018l2.72-2.72a.75.75 0 0 1 1.06 0zm2.94-2.94a.75.75 0 0 1 0-1.06l2.72-2.72h-1.018a.75.75 0 1 1 0-1.5h3.578v3.579a.75.75 0 0 1-1.5 0V3.81l-2.72 2.72a.75.75 0 0 1-1.06 0"></path></svg>
                </span>
              </div>
            </div>
            <div className={`${box1w < 230 ? 'hidden' : 'block'}`}>
              <div className='flex items-center gap-2 py-1.5 overflow-x-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-2 font-regular'>
                {rightsideBar.map((item, i) => <div className='px-4 py-1.5 bg-[#2a2a2a] cursor-pointer rounded-full' key={i}>{item}</div>)}
              </div>
            </div>
          </div>
          <div className='bg-[#121212] w-full '>
            <div className={`flex justify-between p-2.5  ${box1w < 230 ? 'hidden' : 'block'}`}>
              <div className={`flex justify-center items-center cursor-pointer`}>
                <span className='p-1.5 rounded-full hover:bg-[#1e1e1e] cursor-pointer'>
                  <svg data-encore-id="icon" className='fill-[#b3b3b3]' role="img" aria-hidden="true" height='20' viewBox="0 0 24 24"><path d="M10.533 1.27893C5.35215 1.27893 1.12598 5.41887 1.12598 10.5579C1.12598 15.697 5.35215 19.8369 10.533 19.8369C12.767 19.8369 14.8235 19.0671 16.4402 17.7794L20.7929 22.132C21.1834 22.5226 21.8166 22.5226 22.2071 22.132C22.5976 21.7415 22.5976 21.1083 22.2071 20.7178L17.8634 16.3741C19.1616 14.7849 19.94 12.7634 19.94 10.5579C19.94 5.41887 15.7138 1.27893 10.533 1.27893ZM3.12598 10.5579C3.12598 6.55226 6.42768 3.27893 10.533 3.27893C14.6383 3.27893 17.94 6.55226 17.94 10.5579C17.94 14.5636 14.6383 17.8369 10.533 17.8369C6.42768 17.8369 3.12598 14.5636 3.12598 10.5579Z"></path></svg>
                </span>
              </div>
              <div className={`flex justify-center items-center cursor-pointer ${box1w < 230 ? 'hidden' : 'block'}`}>
                <span className='font-regular text-[#afafaf] hover:text-white transition duration-200 '>Alphabeticle</span>
                <span className='hover:fill-white fill-[#afafaf]'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#" d="M7 9V7h14v2zm0 4v-2h14v2zm0 4v-2h14v2zM4 9q-.425 0-.712-.288T3 8t.288-.712T4 7t.713.288T5 8t-.288.713T4 9m0 4q-.425 0-.712-.288T3 12t.288-.712T4 11t.713.288T5 12t-.288.713T4 13m0 4q-.425 0-.712-.288T3 16t.288-.712T4 15t.713.288T5 16t-.288.713T4 17" /></svg>
                </span>
              </div>
            </div>
            <SongsList box1w={box1w} handleSetSong={handleSetSong} songs={songs} />
          </div>
        </div>
        <div className='bg-[#121212] text-white grow rounded-lg h-full overflow-y-scroll  [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>

          <div className='p-4 rounded-t-lg bg-[#000050d3] flex gap-4 *:cursor-pointer sticky top-0 z-99'>
            {middelNav.map((item, ind) => <div key={ind} onClick={() => setIsActive(ind)} className={`${isActive === ind ? "bg-white text-black" : "bg-[#1e1e5c] text-white"} px-4 py-1.5 rounded-full font-regular`}>{item}</div>)}
          </div>
          <div>
            <div className='h-[50vh] bg-gradient-to-b from-[#1e1e1e] to-[#121212] p-8 flex flex-col justify-center'>
              {spotifyCtx.currentSong ? (
                <div className='flex gap-8 items-center'>
                  <Image
                    src={spotifyCtx.currentSong.coverImage}
                    alt={spotifyCtx.currentSong.title}
                    height={500}
                    width={500}
                    className='w-48 h-48 rounded-lg shadow-2xl'
                  />
                  <div>
                    <p className='text-sm text-gray-400 mb-2 font-medium'>NOW PLAYING</p>
                    <h1 className='text-5xl font-extrabold mb-4'>{spotifyCtx.currentSong.title}</h1>
                    <p className='text-xl text-gray-300 mb-6 font-regular'>{spotifyCtx.currentSong.artist}</p>
                    <div className='flex gap-4'>
                      <button onClick={()=>handleSetSong(spotifyCtx.currentSong.id)} className='outline outline-white  px-14 py-3 rounded-full cursor-pointer font-bold'>
                        Play
                      </button>
                      <button className='border border-gray-400 px-14 font-bold py-3 cursor-pointer rounded-full hover:border-white'>
                        Like
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='text-gray-400 text-center'>Select a song to play</div>
              )}
            </div>


            <div className='px-6 py-4'>
              <h2 className='text-2xl font-bold mb-6'>All Songs</h2>
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead>
                    <tr className='border-b border-gray-700'>
                      <th className='text-left px-4 py-3 text-gray-400 font-semibold'>#</th>
                      <th className='text-left px-4 py-3 text-gray-400 font-semibold'>Cover</th>
                      <th className='text-left px-4 py-3 text-gray-400 font-semibold'>Name</th>
                      <th className='text-left px-4 py-3 text-gray-400 font-semibold'>Artist</th>
                      <th className='text-left px-4 py-3 text-gray-400 font-semibold'>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {songs.map((song, index) => (
                      <tr
                        key={song.id}
                        onClick={() => handleSetSong(song.id)}
                        className='border-b border-gray-800 hover:bg-[#1e1e1e] transition cursor-pointer group'
                      >
                        <td className='px-4 py-3 text-gray-400 font-regular'>{index + 1}</td>
                        <td className='px-4 py-3'>
                          <img
                            src={song.coverImage}
                            alt={song.title}
                            className='w-10 h-10 rounded'
                          />
                        </td>
                        <td className='px-4 py-3 text-white group-hover:text-green-400 font-regular'>{song.title}</td>
                        <td className='px-4 py-3 text-gray-400 font-regular'>{song.artist}</td>
                        <td className='px-4 py-3 text-gray-400 font-regular'>{song.releaseDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className='bg-[#121212] border-t border-gray-800 px-6 py-8 mt-8'>
              <div className='grid grid-cols-5 gap-6'>
                <div>
                  <h3 className='font-bold mb-4'>Company</h3>
                  <ul className='space-y-2 text-gray-400 font-regular'>
                    <li className='hover:text-white cursor-pointer'>About</li>
                    <li className='hover:text-white cursor-pointer'>Jobs</li>
                    <li className='hover:text-white cursor-pointer'>For the Record</li>
                  </ul>
                </div>
                <div>
                  <h3 className='font-bold mb-4'>Communities</h3>
                  <ul className='space-y-2 text-gray-400 font-regular'>
                    <li className='hover:text-white cursor-pointer'>For Artists</li>
                    <li className='hover:text-white cursor-pointer'>Developers</li>
                    <li className='hover:text-white cursor-pointer'>Advertising</li>
                  </ul>
                </div>
                <div>
                  <h3 className='font-bold mb-4'>Useful Links</h3>
                  <ul className='space-y-2 text-gray-400 font-regular'>
                    <li className='hover:text-white cursor-pointer'>Support</li>
                    <li className='hover:text-white cursor-pointer'>Free Mobile App</li>
                    <li className='hover:text-white cursor-pointer'>Import your music</li>
                  </ul>
                </div>
                <div>
                  <h3 className='font-bold mb-4'>Spotify Plans</h3>
                  <ul className='space-y-2 text-gray-400 font-regular'>
                    <li className='hover:text-white cursor-pointer'>Premium Lite</li>
                    <li className='hover:text-white cursor-pointer'>Premium Standard</li>
                    <li className='hover:text-white cursor-pointer'>Premium Family</li>
                    <li className='hover:text-white cursor-pointer'>Premium Student</li>
                    <li className='hover:text-white cursor-pointer'>Spotify Free</li>
                  </ul>
                </div>
                <div className='flex gap-4 *:p-2.5 *:bg-[#292929] justify-center items-start *:rounded-full *:hover:bg-[#535252] *:cursor-pointer'>
                  <span><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#fff" d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3" /></svg></span>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#fff" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95" /></svg>
                  </span>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#fff" d="M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.2 4.2 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.52 8.52 0 0 1-5.33 1.84q-.51 0-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23" /></svg>
                  </span>
                </div>
              </div>
              <div className='border-t flex justify-center gap-4 border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm'>
                <div className='flex gap-4 '>
                  <span className='font-regular'>Legal</span>
                  <span className='font-regular'>Safety & Privacy Center</span>
                  <span className='font-regular'>Privacy Policy</span>
                  <span className='font-regular'></span>
                  <span className='font-regular'>Cookies</span>
                  <span className='font-regular'>About Ads</span>
                  <span className='font-regular'>Accessibility</span>
                </div>

              
           
              <div>
                  <p>Accessibility © 2026 Spotify AB </p>
              </div>
              </div>
            </div>
          </div>
        </div>
        <div ref={boxRef} className='bg-[#121212] w-70 relative group rounded-lg h-full overflow-y-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
          <div ref={leftRef} className=' h-[95%] transform -translate-y-1/2 z-99  top-1/2 w-0.5 absolute left-0 hover:bg-white transition duration-500 hover:cursor-grab'>
          </div>
          <div className='flex justify-between overflow-hidden py-4 shadow-2xl sticky top-0 z-20 bg-[#121212]'>
            <div className='w-[60%]'>
              <div className='flex text-nowrap overflow-hidden -translate-x-9 p-1 transition-all duration-300 group-hover:translate-x-0'>
                <div onClick={handleClosebox} className='px-2 flex justify-center items-center cursor-pointer'>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" className='rotate-180 fill-[#b3b3b3] hover:fill-white' width="24" height="24" viewBox="0 0 24 24"><path d="M3 18h13v-2H3zm0-5h10v-2H3zm0-7v2h13V6zm18 9.59L17.42 12L21 8.41L19.59 7l-5 5l5 5z" /></svg>
                  </span>
                </div>
                <div className='font-bold text-lg text-white'>Revamped, Vol 2(Remix)</div>
              </div>
            </div>
            <div className='flex opacity-0 *:cursor-pointer group-hover:opacity-100 justify-center items-center gap-4 pe-4 transition-opacity duration-100'>
              <span className='p-1.5 rounded-full hover:bg-[#282828]'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20"><path fill="#b3b3b3" d="M14 10.25a1.25 1.25 0 1 1 2.5 0a1.25 1.25 0 0 1-2.5 0m-5 0a1.25 1.25 0 1 1 2.5 0a1.25 1.25 0 0 1-2.5 0m-5 0a1.249 1.249 0 1 1 2.5 0a1.25 1.25 0 1 1-2.5 0" /></svg>
              </span>
              <span className='p-2 rounded-full hover:bg-[#282828]'>
                <svg data-encore-id="icon" height='16' width='16' role="img" className='fill-[#b3b3b3]' aria-hidden="true" viewBox="0 0 16 16" ><path d="M6.53 9.47a.75.75 0 0 1 0 1.06l-2.72 2.72h1.018a.75.75 0 0 1 0 1.5H1.25v-3.579a.75.75 0 0 1 1.5 0v1.018l2.72-2.72a.75.75 0 0 1 1.06 0zm2.94-2.94a.75.75 0 0 1 0-1.06l2.72-2.72h-1.018a.75.75 0 1 1 0-1.5h3.578v3.579a.75.75 0 0 1-1.5 0V3.81l-2.72 2.72a.75.75 0 0 1-1.06 0"></path></svg>
              </span>
            </div>
          </div>
          <div>
            <RightSidebar handleSetSong={handleSetSong} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainHomePage