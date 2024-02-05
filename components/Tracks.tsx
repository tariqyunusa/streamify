"use client"
import React, { useEffect } from 'react'

const Tracks = () => {
    useEffect(() => {
        const accessToken = localStorage.getItem('spotifyAccessToken')
        fetch('https://api.spotify.com/v1/me/top/tracks?time_range=short_term', {
            headers: {
                Authoriaton : `Bearer ${accessToken}`
            }
        }).then(resp => resp.json())
        .then((resp : any) => {
            console.log("top tracks", resp);
            
        })
    },[])
  return (
    <div>
      
    </div>
  )
}

export default Tracks
