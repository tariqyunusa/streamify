import React, { useEffect, useState } from 'react'
import "../styles/Loader.css"
import axios from "axios"
const Loader = ({fetchData } : any) => {
    const [artists, setArtists] = useState(null)
    const [loading, setIsLoading] = useState(true)
    const [progress, setProgress] = useState(0)
   useEffect(() => {
    const fetchItems = async () => {
     try {
      const result = await fetchData(setProgress)
      setArtists(result)
     }catch(error) {
      console.error("there was an error fetching your people", error)
     }finally{
      setIsLoading(false)
     }
    }
    fetchItems()
    },[fetchData])
  return (
    <div> 
      {loading ? <p>{progress !== undefined ? `${progress}%` : ""}</p> : <div>hey there</div> } 
      
    </div>
  )
}

export default Loader
