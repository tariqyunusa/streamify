"use client"
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { IoChevronForwardOutline } from 'react-icons/io5';
import gsap from 'gsap';
import '../styles/SpotifyPlaylist.css';
import icon from '../public/Spotify_Icon_RGB_White.png';
import { GiGuitarBassHead } from "react-icons/gi"

const SpotifyPlaylist = () => {
  interface Track {
    track: {
      name: string;
      id: string;
      artists: {
        id: string;
        name: string;
        images: { url: string }[];
      }[];
    };
  }

  const [playlistId, setPlaylistId] = useState<string | null>(null);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [trackIndex, setTrackIndex] = useState(0);
  const [playlistName, setPlaylistName] = useState('');
  const [artist, setArtist] = useState();
  const artistImgRef = useRef(null);
  const playlistInfoRef = useRef(null)
  const artistRef = useRef(null)

  useEffect(() => {
    const CLIENT_ID = 'b406d0b20a0d44ae9f9a05b5882009b6';
    const REDIRECT_URI = 'https://streamify-pi.vercel.app/';
    const TARGET_PLAYLIST_ID = '5FAn5H9fbeLr5ibE4vRCHC';
    const auth_url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token&scope=user-top-read`;

    if (!window.location.hash.includes('access_token')) {
      window.location.href = auth_url;
    } else {
      setPlaylistId(TARGET_PLAYLIST_ID);
    }
  }, []);

  const refreshAccessToken = async () => {
    const CLIENT_ID = 'b406d0b20a0d44ae9f9a05b5882009b6';
    const CLIENT_SECRET = '6ff8d99a5adc47a6b7debc934a6ff22f';
    const REFRESH_TOKEN = localStorage.getItem('spotifyRefreshToken') || '';

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

  const getAccessToken = () => {
    if(typeof window !== 'undefined') {
      const hash = window.location.hash.substring(1)
      const params = new URLSearchParams(hash)
      const accessToken = params.get("access_token")
      const expiresIn = params.get('expires_in')
      if(accessToken !== null && expiresIn !== null) {
        const expirationTime = new Date().getTime() + parseInt(expiresIn) * 1000;
      localStorage.setItem('spotifyAccessToken', accessToken);
      localStorage.setItem('spotifyTokenExpiration', expirationTime.toString());
      localStorage.setItem('spotifyRefreshToken', params.get('refresh_token') || '');
      }
      else{
        console.error("Access Token or Expires value is null")
      }
      return accessToken
    }else{
      console.error("window is not defined")
    }

    
      
    

    return null;
  };
getAccessToken()
  useEffect(() => {
    const storedToken = localStorage.getItem('spotifyAccessToken');
    const storedExpiration = localStorage.getItem('spotifyTokenExpiration');
    const isTokenExpired = storedExpiration
      ? parseInt(storedExpiration) < new Date().getTime()
      : true;

    const accessToken = isTokenExpired ? refreshAccessToken() : storedToken;

    if (accessToken && playlistId) {
      fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setTracks(data.items);
          // console.log(data);
          console.log(artistRef.current);
          
         
        })

        .catch((error) => {
          console.log('Error Fetching Tracks:', error);
        });
        
    }
  }, [playlistId]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTrackIndex((prev) => (prev === tracks.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(intervalId);
  }, [tracks]);

  useEffect(() => {
    const accessToken = localStorage.getItem('spotifyAccessToken');
    const artistId = tracks[trackIndex]?.track.artists[0]?.id;

    fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setArtist(data);
        // console.log(data);
        
        animateArtistImage();
        // animateArtistName()
      })
      .catch((error) => {
        console.error('Error fetching artist information:', error);
      });
  }, [trackIndex, tracks]);

  useEffect(() => {
    const accessToken = localStorage.getItem('spotifyAccessToken');
    fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPlaylistName(data.name);
        
      })
      .catch((error) => {
        console.error('Error fetching playlist name:', error);
      });

  }, [playlistId]);

  const animateArtistImage = () => {
    const tl = gsap.timeline()

    tl.fromTo(
      artistImgRef.current,
      {
        opacity: 0,
        clipPath: `polygon(0 0, 100% 0, 100% 0, 0 0)`,
        
      },{
        duration: 2,
        opacity: 1,
        clipPath: `polygon(0 0, 100% 0, 100% 100%, 0% 100%)`,
        ease: 'power3.out'
      }
    )
    


    // gsap.fromTo(
    //   artistImgRef.current,
    //   {
    //     opacity: 0,
    //     clipPath: `polygon(0 0, 100% 0, 100% 0, 0 0)`, // Start the animation above the final position
    //     // scale: 0,
    //   },
    //   {
    //     duration: 2,
    //     opacity: 1,
    //     clipPath: `polygon(0 0, 100% 0, 100% 100%, 0% 100%)`, // End at the final position
    //     // scale: 1, 
    //     ease: 'power3.out',
    //   }
    // );
  };
  const animateArtistName = () => {
    gsap.fromTo(
      artistRef.current,
       {
        opacity: 0,
        clipPath: `polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)`,
        y: -10
       }
      ,{
        clipPath: `polygon(0 100%, 100% 100%, 100% 0, 0 0)`,
        opacity: 1,
        duration: 2,
        y: 0,
        ease: 'power3.out'
      }
    )
  }

  return (
    <>
      {tracks.length > 0 && (
        <div className='container'>
          <div className="playlist___widget">
            <Image
              src={(artist as any)?.images?.[0]?.url || ''}
              alt="artist"
              fill={true}
              className="artist__image"
              ref={artistImgRef}
            />
            <div className="header___playlist__widget">
              <div className="spotify__logo">
                <Image src={icon} width={25} height={25} alt="spotify icon" />
              </div>
              <div className="chevron">
                <IoChevronForwardOutline />
              </div>
            </div>
            <div className="playlist___info" ref={playlistInfoRef}>
              <h4 className="playlist___info_header"></h4>
              <div className="playlist_____track">
                <p className='track_name'>{tracks[trackIndex]?.track?.name}</p>
              </div>
            </div>
          </div>
          <div className="artist__name">
              <h2 ref={artistRef} className='h2___artistname'><span className='person'><GiGuitarBassHead /></span>
                {tracks[trackIndex]?.track.artists[0]?.name}
              </h2>
          </div>
        
        </div>
      )}
    </>
  );
};

export default SpotifyPlaylist;
