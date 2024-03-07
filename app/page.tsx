import "../styles/page.css"
import "./globals.css"
import icon from "../public/Spotify_Icon_RGB_White.png"
import Image from "next/image"
import Nav from '@/components/Nav'
import SpotifyPlaylist from "@/components/SpotifyPlaylist"
import Link from "next/link"
import { useRouter } from "next/router"


export default function Home() {
  const router = useRouter()

  const handleClick = () => {
    router.push('/MostPlayed')
  }

  return (
    
    <main className="home_container">
      <Nav />
      <section className="body__container">
      <div className="left__container">
        <div className="info___left">
          <h3 className="left__container_h3">Track Your Listening Habits on <span className="span_container">Spotify</span>.</h3>
           <button className="container____btn" onClick={handleClick}><Image src={icon} width={25} height={25} alt="spotify icon" /><span className="btn___text">Proceed With Spotify</span></button>
        </div>
      </div>
      <div className="right__container">  
        <SpotifyPlaylist />
        <div className="info__playlist">
          <p className="information">COGNITIVE DISSONANCE was a playlist that was made after a vow to stop listening to music which worked for about 6 months only for the playlist to be made after a very stressful day and terrible exam. the reasoning behind the name is wile the playlist was being made the maker constantly kept repeating to his self "I DON'T LISTEN TO MUSIC".</p>
        </div>
      </div>
      
      </section>
    </main>
  )
}
