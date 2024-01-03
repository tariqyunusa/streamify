"use client"
import React, { useState, useEffect } from 'react';
import "../styles/SpotifyPlaylist.css"

const SpotifyPlaylist: React.FC = () => {
  interface Track{
    track:{
      name: string
    }
   
  }
  const [playlistId, setPlaylistId] = useState<string | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [trackIndex, setTrackIndex] = useState(0)

  useEffect(() => {
    const CLIENT_ID = "b406d0b20a0d44ae9f9a05b5882009b6";
    const REDIRECT_URI = "http://localhost:3000/";
    const TARGET_PLAYLIST_ID = "5FAn5H9fbeLr5ibE4vRCHC";
    const auth_url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token`;

    if (!window.location.hash.includes("access_token")) {
      window.location.href = auth_url;
    } else {
      setPlaylistId(TARGET_PLAYLIST_ID);
    }
  }, []);

  // Extract Access Token From URL
  const getAccessToken = () => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");
    const expiresIn = params.get("expires_in");

    if (accessToken && expiresIn) {
      const expirationTime = new Date().getTime() + parseInt(expiresIn) * 1000;
      localStorage.setItem("spotifyAccessToken", accessToken);
      localStorage.setItem("spotifyTokenExpiration", expirationTime.toString());
      return accessToken;
    }

    return null;
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("spotifyAccessToken");
    const storedExpiration = localStorage.getItem("spotifyTokenExpiration");
    const isTokenExpired = storedExpiration ? parseInt(storedExpiration) < new Date().getTime() : true;

    const accessToken = isTokenExpired ? getAccessToken() : storedToken;

    if (accessToken && playlistId) {
      fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setTracks(data.items);
          console.log("tracks",data.items);
        })
        .catch((error) => {
          console.log('Error Fetching Tracks:', error);
        });
    }
  }, [playlistId]);
  useEffect(()=>{
    const intervalId = setInterval(()=>{
      setTrackIndex((prev) => 
        prev === tracks.length - 1 ? 0 : prev + 1 
      )
    },5000)
    return () => clearInterval(intervalId)
  },[tracks])
// console.log("current track  State:", tracks);

  return <div className='playlist___widget'>
    {tracks.length > 0 && (
  <h1>{tracks[trackIndex].track.name}</h1>
)}
    

  </div>;
};

export default SpotifyPlaylist;
