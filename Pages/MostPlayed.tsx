import React, { useEffect, useState } from 'react'
import Nav from '@/components/Nav'
import "../styles/MostPlayed.css"
import SecondNav from '@/components/SecondNav'
import Image from 'next/image'
import { FaHeadphones } from "react-icons/fa";

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
            // console.log(response);
            
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
       <div className="first_artist artist">
        <div className="info__artist_rank_name">
            {favArtist && favArtist.length > 0 ? <div><span>your favorite artist</span>
            <h3>{favArtist[0].name}</h3> </div>: ""}
        </div>
        {favArtist && favArtist.length > 0 ? <Image className='first_artist artist_img' src={favArtist[0].images[0].url} fill={true} alt={favArtist[0].name}/> : ""}</div>
        <div className="second_artist artist">
            {secondArtist && secondArtist.length > 0 ? <Image className='artist_img' fill={true} src={secondArtist[0].images[0].url} alt={secondArtist[0].name} />: "" }
        </div>
        <div className="third_artist artist">
            {thirdArtist && thirdArtist.length >0 ? <Image className='artist_img' fill={true} src={thirdArtist[0].images[0].url} alt={thirdArtist[0].name}/>: ""}
        </div>
        <div className="fourth_artist artist">
            {fourthArtist && fourthArtist.length > 0 ? <Image className='artist_img' src={fourthArtist[0].images[0].url} fill={true} alt={fourthArtist[0].name}/> : ""} 
        </div>
        <div className="fifth_artist artist">
            {fifthArtist && fifthArtist.length > 0 ? <Image className='artist_img' src={fifthArtist[0].images[0].url} fill={true} alt={fifthArtist[0].name}/> : ""}
        </div>
       </div>
        
    </main>
   </section>
  )
}

export default MostPlayed
