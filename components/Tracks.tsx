"use client"
import React, { useEffect, useState, MouseEventHandler } from 'react'
import gsap from 'gsap'
import Image from 'next/image'
import "../styles/Tracks.css"
import { FaItunesNote } from "react-icons/fa6";

import { IoPlay } from "react-icons/io5";
import { IoIosPause } from "react-icons/io";

interface Track{
    
}
const Tracks = () => {
    const [tracks, setTracks] = useState<any>([])
    const [isPlaying, setIsPlaying] = useState(false)
    let topTrack : any
    let secondTrack : any
    let thirdTrack : any
    let fourthTrack : any
    let fifthTrack : any
    
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
    if(tracks && tracks.length > 0 ){
        topTrack = [tracks[0]]
        secondTrack = [tracks[1]]
        thirdTrack = [tracks[2]]
        fourthTrack = [tracks[3]]
        fifthTrack = [tracks[4]]
    }
    const playPreview = (previewUrl: string) => {
       const audio = new  Audio(previewUrl)
       audio.play()
       setIsPlaying(true)
       console.log("now playing:", topTrack[0].name);
       
        
    }
    const pausePreview = (previewUrl: string) => {
        const audio = new Audio(previewUrl)
        audio.pause()
        setIsPlaying(false)
    }
   
    
     
    
   
  return (
    <section className='tracks_section'>
        
        {topTrack ? <div className='fav_track'>
            <div className="info__details info_section">
            <div className="icon"><FaItunesNote /></div>
            <div className="info_details">
                <h1 className='info__details_h1'>Steady vibin to</h1>
                <h1 className='info__details_h2'>{topTrack[0].name}</h1>
                <span className='info__details_span'>when it comes to songs {topTrack[0].name} always does it for you.</span>
            </div>
            </div>
            <div className="first_track">
                <span className='position'>#1</span>
            <div className="first_artist_all">
            <div className="img_track">
                <div className="audio_preview" onMouseEnter={() => playPreview(topTrack[0].preview_url)} onMouseLeave={() => pausePreview(topTrack[0].preview_url)}>
               {isPlaying ? <IoIosPause /> : <IoPlay/> }
                </div>
                <Image src={topTrack[0].album.images[0].url} alt={topTrack[0].name} className='img__track' fill={true}/>
            </div>
            <div className="artist__info_first">
                <h5>{topTrack[0].name}</h5>
                <h6>{topTrack[0].artists[0].name}</h6>

            </div>
            </div>
           

            </div>
            <div className="second_track">
                <span className='pos'>#2</span>
                <div className="first_artist_all">
                    <div className="img_track_all">
                        <Image src={secondTrack[0].album.images[0].url} alt={secondTrack[0].name} fill={true} className='img__track'/>
                    </div> 
                    <div className="artist_info_first">
                        <h5>{secondTrack[0].name}</h5>
                        <h6>{secondTrack[0].artists[0].name}</h6>
                    </div>
                </div>
              
            </div>
            <div className="third_track">
                <span className='pos'>#3</span>
                <div className="first_artist_all">
                     <div className="img_track_all">
                    <Image src={thirdTrack[0].album.images[0].url} alt={thirdTrack[0].name} fill={true} className='img__track'/>
                </div>
                <div className="artist_info_first">
                    <h5>{thirdTrack[0].name}</h5>
                    <h6>{thirdTrack[0].artists[0].name}</h6>
                </div>
                </div>
               
            </div>
            <div className="fourth_track">
                <span className='pos'>#4</span>
                <div className="first_artist_all">
                    <div className="img_track_all">
                    <Image src={fourthTrack[0].album.images[0].url} alt={fourthTrack[0].name} fill={true} className='img__track'/>
                </div>
                <div className="artist_info_first">
                    <h5>{fourthTrack[0].name}</h5>
                    <h6>{fourthTrack[0].artists[0].name}</h6>
                </div>
                </div>
                
            </div>
            <div className="fifth_track">
                <span className='pos'>#5</span>
                <div className="first_artist_all">
                   <div className="img_track_all">
                    <Image src={fifthTrack[0].album.images[0].url} alt={fifthTrack[0].name} fill={true} className='img__track'/>
                </div> 
                <div className="artist_info_first">
                    <h5>{fifthTrack[0].name}</h5>
                    <h6>{fifthTrack[0].artists[0].name}</h6>
                </div>
                </div>
                
            </div>
            

        </div>:""}
       
    </section>
  )
}

export default Tracks
