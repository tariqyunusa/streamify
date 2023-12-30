"use client"
import React from 'react'
import { useState, useEffect } from 'react'

const SpotifyPlaylist: React.FC = () => {
    const [playlistId, setplaylistId] = useState<string | null>(null)
    const [tracks, setTracks] = useState([])
    useEffect(()=> {
      const CLIENT_ID = "b406d0b20a0d44ae9f9a05b5882009b6"
      const REDIRECT_URI = "http://localhost:3000/"
      const TARGET_PLAYLIST_ID = "5FAn5H9fbeLr5ibE4vRCHC"
      const auth_url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token`
      if (!window.location.hash.includes("access_token")) {
        window.location.href = auth_url;
      } else {
        setplaylistId(TARGET_PLAYLIST_ID);
      }
    },[])
    //Extract Access Token From URL
    const getAccessToken = () => {
      const hash = window.location.hash.substring(1)
      const params = new URLSearchParams(hash)
      return params.get("access_token")
    }
    useEffect(()=>{
      const accessToken = getAccessToken()
      if(accessToken && playlistId) {
        fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
          headers : {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(response => response.json())
        .then(data => {
          setTracks(data.items)
          console.log(data.items);
        })
        .catch(error => {
          console.log('Error Fetching Tracks:', error);
        })
      }
    },[playlistId])

  return (
    <div>
      
    </div>
  )
}

export default SpotifyPlaylist
