"use client"
import React, { useState, useEffect } from 'react';
import "../styles/SpotifyPlaylist.css"
import icon from "../public/Spotify_Icon_RGB_White.png"
import { IoChevronForwardOutline } from "react-icons/io5"
import Image from 'next/image';

const SpotifyPlaylist = () => {
  interface Track {
    track: {
      name: string;
    };
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

  const refreshAccessToken = async () => {
    const CLIENT_ID = "b406d0b20a0d44ae9f9a05b5882009b6";
    const CLIENT_SECRET = "6ff8d99a5adc47a6b7debc934a6ff22f";
    const REFRESH_TOKEN = localStorage.getItem("spotifyRefreshToken"); // Use your actual method to retrieve the refresh token

    const refreshAccessToken = async () => {
      const CLIENT_ID = "b406d0b20a0d44ae9f9a05b5882009b6";
      const CLIENT_SECRET = "6ff8d99a5adc47a6b7debc934a6ff22f";
      const REFRESH_TOKEN = localStorage.getItem("spotifyRefreshToken") ?? ''; // Default to an empty string if null
    
      try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
          },
          body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: REFRESH_TOKEN,
          }).toString(),
        });
    
        if (!response.ok) {
          console.log('Error refreshing token:', response.status);
          return null;
        }
    
        const data = await response.json();
        const expirationTime = new Date().getTime() + parseInt(data.expires_in) * 1000;
    
        localStorage.setItem('spotifyAccessToken', data.access_token);
        localStorage.setItem('spotifyTokenExpiration', expirationTime.toString());
    
        return data.access_token;
      } catch (error) {
        console.log('Error refreshing token:', error);
        return null;
      }
    };
    
  };

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
getAccessToken()
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

  return(
<>
    {tracks.length > 0 && (
      <div>
        <div className="playlist___widget">
          <div className="header___playlist__widget">
            <div className="spotify__logo">
              <Image src={icon} width={25} height={25} alt="spotify icon" />
            </div>
            <div className="chevron">
              <IoChevronForwardOutline />
            </div>
          </div>
          <div className="playlist___info">
            <div className="playlist_____track">
              <p>{tracks[trackIndex].track.name}</p>
            </div>
          </div>
        </div>
      </div>
    )}
  </>
  );
};

export default SpotifyPlaylist;
