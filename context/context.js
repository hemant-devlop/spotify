"use client"
import { createContext, useState } from "react";
const songs = [
    {
        "id": 8345688,
        "title": "Guli Mata",
        "artist": "Rajat Nagpal",
        "releaseDate": "2026-01-15",
        "audioUrl": "https://pagalworld.is/wp-content/uploads/2026/04/Guli%20Mata%20-%20Guli%20Mata%20(128%20kbps).mp3",
        "coverImage": "https://pagalworld.is/wp-content/uploads/2026/04/Guli-Mata-Hindi-2023-20230714050721-500x500.jpg",
        "isLiked": false,
        "rating": 4.5
    },
    {
        "id": 676234567,
        "title": "Bairan",
        "artist": "Banjare",
        "releaseDate": "24-03-2026",
        "audioUrl": "https://pagalworld.is/wp-content/uploads/2026/04/Bairan%20-%20Bairan%20(128%20kbps).mp3",
        "coverImage": "https://pagalworld.is/wp-content/uploads/2026/04/Bairan-Unknown-2026-20260223182954-500x500.jpg",
        "isLiked": false
    },
    {
        "id": 87665,
        "title": "Khat",
        "artist": "Navjot Ahuja",
        "releaseDate": "24-03-2026",
        "audioUrl": "https://pagalworld.is/wp-content/uploads/2026/04/Khat%20-%20Khat%20(128%20kbps).mp3",
        "coverImage": "https://pagalworld.is/wp-content/uploads/2026/04/Khat-Hindi-2025-20251130113423-500x500.jpg",
        "isLiked": false
    },
    {
        "id": 3123456543,
        "title": "Diwana Kar raha hai",
        "artist": "Javed Ali",
        "releaseDate": "23-03-2026",
        "link": "https://pagalworld.is/wp-content/uploads/2026/03/Sitaare%20(From%20&quot;Ikkis&quot;)%20-%20Ikkis%20(128%20kbps).mp3",
        "audioUrl": "https://pagalworld.is/wp-content/uploads/2026/04/Deewana%20Kar%20Raha%20Hai%20-%20Raaz%203%20The%20Third%20Dimension%20(128%20kbps).mp3",
        "coverImage": "https://pagalworld.is/wp-content/uploads/2026/04/Raaz-3-Hindi-2012-20221212111420-500x500.jpg",
        "isLiked": false
    },
    {
        "id": 567654564,
        "title": "Ek Din",
        "artist": "Irsad Kamil",
        "releaseDate": "23-03-2026",
        "audioUrl": "https://pagalworld.is/wp-content/uploads/2026/04/Ek%20Din%20-%20Title%20Track%20(Female)%20-%20Ek%20Din%20(Original%20Motion%20Picture%20Soundtrack)%20(128%20kbps).mp3",
        "coverImage": "https://pagalworld.is/wp-content/uploads/2026/04/Ek-Din-Original-Motion-Picture-Soundtrack-Hindi-2026-20260403143442-500x500.jpg",
        "isLiked": false
    },
    {
        "id": 512345678987654,
        "title": "Ghehra Huaa",
        "artist": "Arijit Singh,Armaan Khan",
        "releaseDate": "23-03-2026",
        "audioUrl": "https://pagalworld.is/wp-content/uploads/2026/04/Gehra%20Hua%20-%20Dhurandhar%20(128%20kbps).mp3",
        "coverImage": "https://pagalworld.is/wp-content/uploads/2026/03/gehra-hua-dhurandhar-500-500.jpg",
        "isLiked": false
    },
    {
        "id": 882228,
        "title": "Guli Mata",
        "artist": "Rajat Nagpal",
        "releaseDate": "2026-01-15",
        "audioUrl": "https://pagalworld.is/wp-content/uploads/2026/04/Guli%20Mata%20-%20Guli%20Mata%20(128%20kbps).mp3",
        "coverImage": "https://pagalworld.is/wp-content/uploads/2026/04/Guli-Mata-Hindi-2023-20230714050721-500x500.jpg",
        "isLiked": false,
        "rating": 4.5
    },
    {
        "id": 623456767,
        "title": "Bairan",
        "artist": "Banjare",
        "releaseDate": "24-03-2026",
        "audioUrl": "https://pagalworld.is/wp-content/uploads/2026/04/Bairan%20-%20Bairan%20(128%20kbps).mp3",
        "coverImage": "https://pagalworld.is/wp-content/uploads/2026/04/Bairan-Unknown-2026-20260223182954-500x500.jpg",
        "isLiked": false
    },
    {
        "id": 2565,
        "title": "Khat",
        "artist": "Navjot Ahuja",
        "releaseDate": "24-03-2026",
        "audioUrl": "https://pagalworld.is/wp-content/uploads/2026/04/Khat%20-%20Khat%20(128%20kbps).mp3",
        "coverImage": "https://pagalworld.is/wp-content/uploads/2026/04/Khat-Hindi-2025-20251130113423-500x500.jpg",
        "isLiked": false
    },
    {
        "id": 2345673,
        "title": "Diwana Kar raha hai",
        "artist": "Javed Ali",
        "releaseDate": "23-03-2026",
        "link": "https://pagalworld.is/wp-content/uploads/2026/03/Sitaare%20(From%20&quot;Ikkis&quot;)%20-%20Ikkis%20(128%20kbps).mp3",
        "audioUrl": "https://pagalworld.is/wp-content/uploads/2026/04/Deewana%20Kar%20Raha%20Hai%20-%20Raaz%203%20The%20Third%20Dimension%20(128%20kbps).mp3",
        "coverImage": "https://pagalworld.is/wp-content/uploads/2026/04/Raaz-3-Hindi-2012-20221212111420-500x500.jpg",
        "isLiked": false
    },
    {
        "id": 4223434,
        "title": "Ek Din",
        "artist": "Irsad Kamil",
        "releaseDate": "23-03-2026",
        "audioUrl": "https://pagalworld.is/wp-content/uploads/2026/04/Ek%20Din%20-%20Title%20Track%20(Female)%20-%20Ek%20Din%20(Original%20Motion%20Picture%20Soundtrack)%20(128%20kbps).mp3",
        "coverImage": "https://pagalworld.is/wp-content/uploads/2026/04/Ek-Din-Original-Motion-Picture-Soundtrack-Hindi-2026-20260403143442-500x500.jpg",
        "isLiked": false
    },
    {
        "id": 5345,
        "title": "Ghehra Huaa",
        "artist": "Arijit Singh,Armaan Khan",
        "releaseDate": "23-03-2026",
        "audioUrl": "https://pagalworld.is/wp-content/uploads/2026/04/Gehra%20Hua%20-%20Dhurandhar%20(128%20kbps).mp3",
        "coverImage": "https://pagalworld.is/wp-content/uploads/2026/03/gehra-hua-dhurandhar-500-500.jpg",
        "isLiked": false
    },
    {
        "id": 818,
        "title": "Guli Mata",
        "artist": "Rajat Nagpal",
        "releaseDate": "2026-01-15",
        "audioUrl": "https://pagalworld.is/wp-content/uploads/2026/04/Guli%20Mata%20-%20Guli%20Mata%20(128%20kbps).mp3",
        "coverImage": "https://pagalworld.is/wp-content/uploads/2026/04/Guli-Mata-Hindi-2023-20230714050721-500x500.jpg",
        "isLiked": false,
        "rating": 4.5
    },
    {
        "id": 67,
        "title": "Bairan",
        "artist": "Banjare",
        "releaseDate": "24-03-2026",
        "audioUrl": "https://pagalworld.is/wp-content/uploads/2026/04/Bairan%20-%20Bairan%20(128%20kbps).mp3",
        "coverImage": "https://pagalworld.is/wp-content/uploads/2026/04/Bairan-Unknown-2026-20260223182954-500x500.jpg",
        "isLiked": false
    },
    {
        "id": 265,
        "title": "Khat",
        "artist": "Navjot Ahuja",
        "releaseDate": "24-03-2026",
        "audioUrl": "https://pagalworld.is/wp-content/uploads/2026/04/Khat%20-%20Khat%20(128%20kbps).mp3",
        "coverImage": "https://pagalworld.is/wp-content/uploads/2026/04/Khat-Hindi-2025-20251130113423-500x500.jpg",
        "isLiked": false
    },
    {
        "id": 4523,
        "title": "Diwana Kar raha hai",
        "artist": "Javed Ali",
        "releaseDate": "23-03-2026",
        "link": "https://pagalworld.is/wp-content/uploads/2026/03/Sitaare%20(From%20&quot;Ikkis&quot;)%20-%20Ikkis%20(128%20kbps).mp3",
        "audioUrl": "https://pagalworld.is/wp-content/uploads/2026/04/Deewana%20Kar%20Raha%20Hai%20-%20Raaz%203%20The%20Third%20Dimension%20(128%20kbps).mp3",
        "coverImage": "https://pagalworld.is/wp-content/uploads/2026/04/Raaz-3-Hindi-2012-20221212111420-500x500.jpg",
        "isLiked": false
    },
    {
        "id": 4234,
        "title": "Ek Din",
        "artist": "Irsad Kamil",
        "releaseDate": "23-03-2026",
        "audioUrl": "https://pagalworld.is/wp-content/uploads/2026/04/Ek%20Din%20-%20Title%20Track%20(Female)%20-%20Ek%20Din%20(Original%20Motion%20Picture%20Soundtrack)%20(128%20kbps).mp3",
        "coverImage": "https://pagalworld.is/wp-content/uploads/2026/04/Ek-Din-Original-Motion-Picture-Soundtrack-Hindi-2026-20260403143442-500x500.jpg",
        "isLiked": false
    },
    {
        "id": 5342,
        "title": "Ghehra Huaa",
        "artist": "Arijit Singh,Armaan Khan",
        "releaseDate": "23-03-2026",
        "audioUrl": "https://pagalworld.is/wp-content/uploads/2026/04/Gehra%20Hua%20-%20Dhurandhar%20(128%20kbps).mp3",
        "coverImage": "https://pagalworld.is/wp-content/uploads/2026/03/gehra-hua-dhurandhar-500-500.jpg",
        "isLiked": false
    },
   
]

export const SpotifyContext = createContext({
    allSongs: [],
    currentSong: null,
    isPlaying: false,
    setCurrentSong: () => { },
    setIsPlaying: () => { },
});

export default function SpotifyProvider({ children }) {
    const [allSongs, setAllSongs] = useState(songs);
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleSong = (songId) => {
        const song = allSongs.find(s => s.id === songId);
        if (song) {
            setCurrentSong(song);
            setIsPlaying(true);
        }
    };

    const value = {
        allSongs,
        setAllSongs,
        currentSong,
        setCurrentSong: handleSong,
        isPlaying,
        setIsPlaying,
    };

    return (
        <SpotifyContext.Provider value={value}>{children}</SpotifyContext.Provider>
    );
} 