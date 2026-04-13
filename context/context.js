"use client"
import { createContext, useState } from "react";
const songs = [
    {
        "id": 888,
        "title": "Lutt Le Gaya",
        "artist": "Dhurandhar",
        "releaseDate": "2026-01-15",
        "audioUrl": "https://pagalworld.is/wp-content/uploads/2026/04/Jab%20Talak%20(Teaser)%20(From%20%E2%80%9CCocktail%202%E2%80%9D)%20-%20Jab%20Talak%20(Teaser)%20(From%20%E2%80%9CCocktail%202%E2%80%9D)%20(128%20kbps).mp3",
        "coverImage": "https://pagalworld.is/wp-content/uploads/2026/03/Dhurandhar-Hindi-2025-20260203083204-500x500.jpg",
        "isLiked": false,
        "rating": 4.5
    },
    {
        "id": 6767,
        "title": "Khat",
        "artist": "navjot ahuja",
        "releaseDate": "24-03-2026",
        "audioUrl": "https://pagalworld.is/wp-content/uploads/2026/03/Khat - Khat (128 kbps).mp3",
        "coverImage": "https://pagalworld.is/wp-content/uploads/2026/03/Khat-Hindi-2025-20251130113423-500x500.jpg",
        "isLiked": false
    },
    {
        "id": 25565,
        "title": "Tere Ishk Mein",
        "artist": "A.R. Rahman, Irshad Kamil",
        "releaseDate": "24-03-2026",
        "audioUrl": "https://pagalworld.is/wp-content/uploads/2026/03/Deewaana Deewaana - Tere Ishk Mein (128 kbps).mp3",
        "coverImage": "https://pagalworld.is/wp-content/uploads/2026/03/Tere-Ishk-Mein-Hindi-2025-20251203141038-500x500.jpg",
        "isLiked": false
    },
    {
        "id": 3,
        "title": "ikkis",
        "artist": "Amitabh Bhattacharya, Arijit Singh",
        "releaseDate": "23-03-2026",
        "link": "https://pagalworld.is/wp-content/uploads/2026/03/Sitaare%20(From%20&quot;Ikkis&quot;)%20-%20Ikkis%20(128%20kbps).mp3",
        "audioUrl": "https://pagalworld.is/wp-content/uploads/2026/03/Sitaare (From &quot;Ikkis&quot;) - Ikkis (128 kbps).mp3",
        "coverImage": "https://pagalworld.is/wp-content/uploads/2026/03/Ikkis-Hindi-2025-20251226143212-500x500.jpg",
        "isLiked": false
    },
    {
        "id": 4,
        "title": "pradox",
        "artist": "Dhanda Nyoliwala",
        "releaseDate": "23-03-2026",
        "audioUrl": "https://pagalworld.is/wp-content/uploads/2026/03/Paradox - Paradox (128 kbps).mp3",
        "coverImage": "https://pagalworld.is/wp-content/uploads/2026/03/Paradox-Hindi-2026-20260217053125-500x500.jpg",
        "isLiked": false
    },
    {
        "id": 5,
        "title": "Tabaahi",
        "artist": "Vishal Mishra",
        "releaseDate": "23-03-2026",
        "audioUrl": "https://pagalworld.is/wp-content/uploads/2026/03/Tabaahi (From &quot;Toxic&quot;) - Tabaahi (From Toxic) (128 kbps).mp3",
        "coverImage": "https://pagalworld.is/wp-content/uploads/2026/03/Tabaahi-From-Toxic-Hindi-2026-20260302122113-500x500.jpg",
        "isLiked": false
    },
    {
        "id": 6,
        "title": "Lutt Le Gaya",
        "artist": "Dhurandhar",
        "releaseDate": "2026-01-15",
        "audioUrl": "https://pagalworld.is/wp-content/uploads/2026/03/Lutt Le Gaya - Dhurandhar (128 kbps).mp3",
        "coverImage": "https://pagalworld.is/wp-content/uploads/2026/03/Dhurandhar-Hindi-2025-20260203083204-500x500.jpg",
        "isLiked": false,
        "rating": 4.5
    },
    {
        "id": 7,
        "title": "Khat",
        "artist": "navjot ahuja",
        "releaseDate": "24-03-2026",
        "audioUrl": "https://pagalworld.is/wp-content/uploads/2026/03/Khat - Khat (128 kbps).mp3",
        "coverImage": "https://pagalworld.is/wp-content/uploads/2026/03/Khat-Hindi-2025-20251130113423-500x500.jpg",
        "isLiked": false
    },
    {
        "id": 8,
        "title": "Tere Ishk Mein",
        "artist": "A.R. Rahman, Irshad Kamil",
        "releaseDate": "24-03-2026",
        "audioUrl": "https://pagalworld.is/wp-content/uploads/2026/03/Deewaana Deewaana - Tere Ishk Mein (128 kbps).mp3",
        "coverImage": "https://pagalworld.is/wp-content/uploads/2026/03/Tere-Ishk-Mein-Hindi-2025-20251203141038-500x500.jpg",
        "isLiked": false
    },
    {
        "id": 9,
        "title": "ikkis",
        "artist": "Amitabh Bhattacharya, Arijit Singh",
        "releaseDate": "23-03-2026",
        "link": "https://pagalworld.is/wp-content/uploads/2026/03/Sitaare%20(From%20&quot;Ikkis&quot;)%20-%20Ikkis%20(128%20kbps).mp3",
        "audioUrl": "https://pagalworld.is/wp-content/uploads/2026/03/Sitaare (From &quot;Ikkis&quot;) - Ikkis (128 kbps).mp3",
        "coverImage": "https://pagalworld.is/wp-content/uploads/2026/03/Ikkis-Hindi-2025-20251226143212-500x500.jpg",
        "isLiked": false
    },
    {
        "id": 10,
        "title": "pradox",
        "artist": "Dhanda Nyoliwala",
        "releaseDate": "23-03-2026",
        "audioUrl": "https://pagalworld.is/wp-content/uploads/2026/03/Paradox - Paradox (128 kbps).mp3",
        "coverImage": "https://pagalworld.is/wp-content/uploads/2026/03/Paradox-Hindi-2026-20260217053125-500x500.jpg",
        "isLiked": false
    },
    {
        "id": 11,
        "title": "Tabaahi",
        "artist": "Vishal Mishra",
        "releaseDate": "23-03-2026",
        "audioUrl": "https://pagalworld.is/wp-content/uploads/2026/03/Tabaahi (From &quot;Toxic&quot;) - Tabaahi (From Toxic) (128 kbps).mp3",
        "coverImage": "https://pagalworld.is/wp-content/uploads/2026/03/Tabaahi-From-Toxic-Hindi-2026-20260302122113-500x500.jpg",
        "isLiked": false
    },
    {
        "id": 12,
        "title": "Lutt Le Gaya",
        "artist": "Dhurandhar",
        "releaseDate": "2026-01-15",
        "audioUrl": "https://pagalworld.is/wp-content/uploads/2026/03/Lutt Le Gaya - Dhurandhar (128 kbps).mp3",
        "coverImage": "https://pagalworld.is/wp-content/uploads/2026/03/Dhurandhar-Hindi-2025-20260203083204-500x500.jpg",
        "isLiked": false,
        "rating": 4.5
    },
    {
        "id": 13,
        "title": "Khat",
        "artist": "navjot ahuja",
        "releaseDate": "24-03-2026",
        "audioUrl": "https://pagalworld.is/wp-content/uploads/2026/03/Khat - Khat (128 kbps).mp3",
        "coverImage": "https://pagalworld.is/wp-content/uploads/2026/03/Khat-Hindi-2025-20251130113423-500x500.jpg",
        "isLiked": false
    },
    {
        "id": 14,
        "title": "Tere Ishk Mein",
        "artist": "A.R. Rahman, Irshad Kamil",
        "releaseDate": "24-03-2026",
        "audioUrl": "https://pagalworld.is/wp-content/uploads/2026/03/Deewaana Deewaana - Tere Ishk Mein (128 kbps).mp3",
        "coverImage": "https://pagalworld.is/wp-content/uploads/2026/03/Tere-Ishk-Mein-Hindi-2025-20251203141038-500x500.jpg",
        "isLiked": false
    },
    {
        "id": 15,
        "title": "ikkis",
        "artist": "Amitabh Bhattacharya, Arijit Singh",
        "releaseDate": "23-03-2026",
        "link": "https://pagalworld.is/wp-content/uploads/2026/03/Sitaare%20(From%20&quot;Ikkis&quot;)%20-%20Ikkis%20(128%20kbps).mp3",
        "audioUrl": "https://pagalworld.is/wp-content/uploads/2026/03/Sitaare (From &quot;Ikkis&quot;) - Ikkis (128 kbps).mp3",
        "coverImage": "https://pagalworld.is/wp-content/uploads/2026/03/Ikkis-Hindi-2025-20251226143212-500x500.jpg",
        "isLiked": true
    },
    {
        "id": 16,
        "title": "pradox",
        "artist": "Dhanda Nyoliwala",
        "releaseDate": "23-03-2026",
        "audioUrl": "https://pagalworld.is/wp-content/uploads/2026/03/Paradox - Paradox (128 kbps).mp3",
        "coverImage": "https://pagalworld.is/wp-content/uploads/2026/03/Paradox-Hindi-2026-20260217053125-500x500.jpg",
        "isLiked": false
    },
    {
        "id": 17,
        "title": "Tabaahi",
        "artist": "Vishal Mishra",
        "releaseDate": "23-03-2026",
        "audioUrl": "https://pagalworld.is/wp-content/uploads/2026/03/Tabaahi (From &quot;Toxic&quot;) - Tabaahi (From Toxic) (128 kbps).mp3",
        "coverImage": "https://pagalworld.is/wp-content/uploads/2026/03/Tabaahi-From-Toxic-Hindi-2026-20260302122113-500x500.jpg",
        "isLiked": true
    }
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