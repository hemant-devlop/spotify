import Spotify from '@/components/Spotify'
import SpotifyProvider from '@/context/context'
const Home = () => {
 
  return (
    <SpotifyProvider>
    <Spotify />
    </SpotifyProvider>
  )
}

export default Home