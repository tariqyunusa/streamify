import React, { useEffect } from 'react'
import Loader from './Loader'
import axios, { AxiosProgressEvent } from 'axios';


const Artists = () => {
  const fetchData = async (onProgress: (progress : number) => void) => {
    const accessToken = localStorage.getItem('spotifyAccessToken')
    try{
      const response = await axios.get("https://api.spotify.com/v1/me/top/artists",{
        onDownloadProgress: (progressEvent: any) => {
          const total = progressEvent.total 
            const progress = Math.round((progressEvent.loaded / total) * 100);
            onProgress(progress);
          
        },
        headers : {
          Authorization: `bearer ${accessToken}`
        }
      })
      return response.data
    }catch(error){
      console.error("there was an error fetching your guys:", error)
      throw error
    }
  }
  return (
    <div>
      <Loader fetchData={fetchData} />
    </div>
  )
}

export default Artists
