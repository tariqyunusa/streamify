import React from 'react'
import Link from 'next/link'
import { FiFeather } from "react-icons/fi";
import { FiShare2 } from "react-icons/fi";
import "../styles/SecondNav.css"


const SecondNav = ({username}: any) => {
  return (
    <nav className='nav_container'>
        <div className="left__side_nav">
            <div className="logo">
            {/* <h1 className='logo__h1'>Streamify</h1> */}
            </div>
            <div className="links">
            <Link href="" className='Links___Link'><FiFeather />About</Link>
            <Link href="" className='Links___Link'><FiShare2 />Share</Link>
            </div>
        </div>
        <div className="right__side_nav">
            <div className="color"></div>
            <div className="user"><h5 className='username'>{username ? username.display_name : "Guest"}</h5></div>
        </div>

    </nav>
  )
}

export default SecondNav
