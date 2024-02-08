"use client"
import React, { useEffect, useState } from 'react'
import gsap from 'gsap'
import Image from 'next/image'
import "../styles/Tracks.css"
import { FaItunesNote } from "react-icons/fa6";

interface Track{
    
}
const Tracks = () => {
    const [tracks, setTracks] = useState<any>([])
    let topTrack 
    let secondTrack 
    let thirdTrack 
    let fourthTrack 
    let fifthTrack
    
    useEffect(() => {
        const accessToken = localStorage.getItem('spotifyAccessToken')
        try{
            fetch('https://api.spotify.com/v1/me/top/tracks?time_range=short_term', {
            headers: {
                Authorization: `Bearer ${accessToken}`

            }
        }).then(resp => resp.json())
        .then((resp : any) => {
            // console.log("top tracks", resp.items);
            setTracks(resp.items)
            
        })
        }catch(error){
            console.error("An error occured while fetching your tracks:", error)
        }

    },[])
    // console.log(tracks);
    if(tracks.length > 0 ){
        topTrack = [tracks[0]]
        secondTrack = [tracks[1]]
        thirdTrack = [tracks[2]]
        fourthTrack = [tracks[3]]
        fifthTrack = [tracks[4]]
    }
    
     
    
   
  return (
    <section className='tracks_section'>
        
        {topTrack ? <div className='fav_track'>
            <div className="info__details">
            <div className="icon"><FaItunesNote /></div>
            <div className="info_details">
                <h1 className='info__details_h1'>Steady vibin to</h1>
                <h1 className='info__details_h2'>{topTrack[0].name}</h1>
                <span className='info__details_span'>when it comes to songs {topTrack[0].name} always does it for you.</span>
            </div>
            </div>
            
            <div className="img_track">
                <Image src={topTrack[0].album.images[0].url} alt={topTrack[0].name} fill={true}/>
            </div>
        </div>:""}
       
    </section>
  )
}

export default Tracks
