"use client"
import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import Nav from '@/components/Nav'
import "../styles/MostPlayed.css"
import SecondNav from '@/components/SecondNav'
import Image from 'next/image'
import { FaHeadphones } from "react-icons/fa";
import gsap from 'gsap'
import Tracks from '@/components/Tracks'
import { log } from 'console'
import Artists from '@/components/Artist'
import Loader from '@/components/Loader'

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
  interface artist{
    artistImg: string,
    artistName: string
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
    let favArtist : any 
    let secondArtist : any 
    let thirdArtist : any 
    let fourthArtist : any
    let fifthArtist : any 
    
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
            // console.log(response);
            
        }).catch((error) => {
            console.error("error fetching person data", error)
        }) 
        
    },[])
    useEffect(() => {
        // fetching the user's favourite artist
        const accessToken = localStorage.getItem('spotifyAccessToken')
        fetch('https://api.spotify.com/v1/me/top/artists?time_range=medium_term', {
            headers: {
                Authorization : `Bearer ${accessToken}`
            }
        })
        .then(resp => resp.json())
        .then((resp) => {
            // console.log(resp.items); 
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
    //   console.log("your favs:",secondArtist, thirdArtist, fourthArtist, fifthArtist);   
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
//    console.log("your favourite artist", favArtist);
   
    
  return (
   <section>
    <Artists />
 
   </section>
  )
}

export default MostPlayed
