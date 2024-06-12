import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/12.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/hero_image_1.png'
import {Link} from 'react-router-dom'

const Hero = () => {
    return (
        <div className='hero'>
            <div className="hero-left">
                <h2>NEW ARRIVALS ONLY</h2>
                <div>
                    <div className="hero-hand-icon">
                        <p>beauty</p>
                        <img src={hand_icon} alt="" />
                    </div>
                    <p>enhancement</p>
                    <p>is for everyone</p>
                </div>
                <Link to={'/wig'} style={{textDecoration:"none"}}Link>
                <div className="hero-latest-btn">
                    <div>Latest Collection</div>
                    <img src={arrow_icon} alt="" />
                </div>
                </Link>
            </div>
            <div className="hero-right">
                <img src={hero_image} alt="" />
            </div>
        </div>
    )
}

export default Hero
