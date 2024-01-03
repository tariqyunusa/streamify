import "../styles/page.css"
import "./globals.css"
import icon from "../public/Spotify_Icon_RGB_White.png"
import Image from "next/image"
import Nav from '@/components/Nav'
import SpotifyPlaylist from "@/components/SpotifyPlaylist"

export default function Home() {
  return (
    
    <main className="home_container">
      <Nav />
      <section className="body__container">
      <div className="left__container">
        <h3 className="left__container_h3">Track Your Listening Habits on <span className="span_container">Spotify</span>.</h3>
        <button className="container____btn"><Image src={icon} width={25} height={25} alt="spotify icon" /><span className="btn___text">Proceed With Spotify</span></button>
      </div>
      <div className="right__container">
        
<SpotifyPlaylist />
      
      </div>
      </section>
    </main>
  )
}
