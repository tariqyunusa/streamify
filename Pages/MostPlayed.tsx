"use client"
import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import Nav from '@/components/Nav'
import "../styles/MostPlayed.css"
import SecondNav from '@/components/SecondNav'
import Image from 'next/image'
import { FaHeadphones } from "react-icons/fa";
import Tracks from '@/components/Tracks'
import gsap from 'gsap'
// import Tracks from '@/components/tracks'

interface SpotifyArtist {
    external_urls: { spotify: string };
    followers: { href: null; total: number };
    genres: string[];
    href: string;
    id: string;
    images: { url: string }[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
  }


const MostPlayed = () => {
    const [user, setUser] = useState<any>()
    const [artist, setArtist] = useState<SpotifyArtist[]>()
    const [bestArtist, setBestArtist] = useState<SpotifyArtist[] | any>([])
    const [tracks, setTracks] = useState<any>([])
    const imgRef = useRef(null)
    const secondimgRef = useRef(null)
    const thirdimgRef = useRef(null)
    const fourthimgRef = useRef(null)
    const fifthimgRef = useRef(null)
    let favArtist : any = []
    let secondArtist : any = []
    let thirdArtist : any = []
    let fourthArtist : any = []
    let fifthArtist : any = []
    
    useEffect(()=>{
        // fetching the current user's personal data
        const accessToken = localStorage.getItem('spotifyAccessToken')
        fetch("https://api.spotify.com/v1/me",{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(response => response.json())
        .then((response: any) => {
            setUser(response)
            console.log(response);
            
        }).catch((error) => {
            console.error("error fetching person data", error)
        }) 
        
    },[])
    useEffect(() => {
        const accessToken = localStorage.getItem('spotifyAccessToken')
        fetch('https://api.spotify.com/v1/me/top/artists?time_range=short_term', {
            headers: {
                Authorization : `Bearer ${accessToken}`
            }
        })
        .then(resp => resp.json())
        .then((resp) => {
            // console.log(resp); 
            setArtist(resp.items)  
        
        }).catch((error: any) => {
            console.error("error fetching user's favorite artist", error)
        })
    },[])
   
   
    const username = user
    
   
    
    if(artist && artist.length > 0){
        favArtist = [artist[0]]
        secondArtist = [artist[1]]
        thirdArtist = [artist[2]]
        fourthArtist = [artist[3]]
        fifthArtist = [artist[4]]
       // console.log("Your favourite artist is:", favArtist[0]);
      console.log(secondArtist, thirdArtist, fourthArtist, fifthArtist);  
    }
 
    
    useLayoutEffect(() => {
        const tl = gsap.timeline()

        tl.fromTo(
            imgRef.current ,
            {
                clipPath: `polygon(0 0, 0 0, 0 100%, 0% 100%)`
            }, {
                clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
                
                duration: 1
            }
        )
        tl.fromTo(
            secondimgRef.current ,
            {
                clipPath: `polygon(0 0, 0 0, 0 100%, 0% 100%)`
            }, {
                clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
                
                duration: 1
            }
        )
        tl.fromTo(
            thirdimgRef.current ,
            {
                clipPath: `polygon(0 0, 0 0, 0 100%, 0% 100%)`
            }, {
                clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
        
                duration: 1
            }
        )
        tl.fromTo(
            fourthimgRef.current ,
            {
                clipPath: `polygon(0 0, 0 0, 0 100%, 0% 100%)`
            }, {
                clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
                
                duration: 1
            }
        )
        tl.fromTo(
            fifthimgRef.current ,
            {
                clipPath: `polygon(0 0, 0 0, 0 100%, 0% 100%)`
            }, {
                clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
            
                duration: 1
            }
        )
    },[imgRef, secondimgRef, thirdimgRef, fourthimgRef, fifthimgRef])
   
    
  return (
   <section className='most_listened'>
    <div className="navigation"><SecondNav username={username} /></div>
    <main className='user_behaviour'>
       <div className="info__intro">
        {favArtist && favArtist.length > 0 ? <div className='artist_conatainer'>
            <div className="icon"><FaHeadphones /></div>
            <div className="info__details">
            <h1 className='info__details_h1'>Jamming with</h1>
            <h2 className='info__details_h2'>{favArtist[0].name}</h2>
            <span className='info__details_span'>No Contest – {favArtist[0].name} Reigns Supreme in Your<br/> Favorite Artist Hierarchy.</span>
            </div>
        </div>: ""}
       </div>
       <div className="artist__container_auto">
       <div className="first_artist artist" ref={imgRef}>
        <div className="info__artist_rank_name">
            {favArtist && favArtist.length > 0 ? <div><div className="artist_about"><span className='fav__artist'>your favorite artist</span><h3 className='fav_artist_h3'>{favArtist[0].name}</h3></div>
            <h3>{favArtist[0].name}</h3> </div>: ""}
        </div>
        {favArtist && favArtist.length > 0 ? <Image className='first_artist artist_img' src={favArtist[0].images[0].url} fill={true} alt={favArtist[0].name}/> : ""}</div>
        <div className="second_artist artist" ref={secondimgRef} >
       
            {secondArtist && secondArtist.length > 0 ? <div className="card"><div className="info_artist"><span>#2</span><h3>{secondArtist[0].name}</h3></div><Image className='artist_img' fill={true} src={secondArtist[0].images[0].url} alt={secondArtist[0].name} /></div> : "" }
        </div>
        <div className="third_artist artist" ref={thirdimgRef} >
        {/* <div className="info_artist"><span>#3</span><h3>{thirdArtist[0].name}</h3></div> */}
            {thirdArtist && thirdArtist.length >0 ? <div className="card"><div className="info_artist"><span>#3</span><h3>{thirdArtist[0].name}</h3></div><Image className='artist_img' fill={true} src={thirdArtist[0].images[0].url} alt={thirdArtist[0].name} /></div>: ""}
        </div>
        <div className="fourth_artist artist" ref={fourthimgRef}>
        {/* <div className="info_artist"><span>#4</span><h3>{fourthArtist[0].name}</h3></div> */}
            {fourthArtist && fourthArtist.length > 0 ? <div className="card"><div className="info_artist"><span>#4</span><h3>{fourthArtist[0].name}</h3></div><Image className='artist_img' fill={true} src={fourthArtist[0].images[0].url} alt={fourthArtist[0].name} /></div> : ""} 
        </div>
        <div className="fifth_artist artist" ref={fifthimgRef}>
        {/* <div className="info_artist"><span>#5</span><h3>{fifthArtist[0].name}</h3></div> */}
            {fifthArtist && fifthArtist.length > 0 ? <div className="card"><div className="info_artist"><span>#5</span><h3>{fifthArtist[0].name}</h3></div><Image className='artist_img' fill={true} src={fifthArtist[0].images[0].url} alt={fifthArtist[0].name} /></div> : ""}
        </div>
       </div>
        {/* <Tracks /> */}
    </main>
    
   </section>
  )
}

export default MostPlayed
