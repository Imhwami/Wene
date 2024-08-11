// import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/logo_2.png'
import navprofile from '../../assets/profile_photo.png'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={navlogo} style={{}} alt="" className="nav-logo" />
      <img src={navprofile} alt="" className='nav-profile' />
    </div>
  )
}

export default Navbar
