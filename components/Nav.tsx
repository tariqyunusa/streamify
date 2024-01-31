import React from 'react'
import Link from 'next/link'
import { FiFeather } from "react-icons/fi";
import { FiShare2 } from "react-icons/fi";
import "../styles/Nav.css"

const Nav = () => {
  return (
    <nav className='Nav_container'>
        <div className="logo__container">
            <h1 className='logo__h1'>Streamify</h1>
        </div>
        <div className="Links__container">
            <Link href="" className='Links___Link'><FiFeather />About</Link>
            <Link href="" className='Links___Link'><FiShare2 />Share</Link>
        </div>
    </nav>
  )
}

export default Nav
