import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo_2.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../Assets/nav_icon.png'
const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const { getTotalCartItems } = useContext(ShopContext);
    const menuRef = useRef();

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }

    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt="" />
                <p>WEBSITE</p>
            </div>
            <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
            <ul ref={menuRef} className="nav-menu">
                <li onClick={() => { setMenu("home") }}><Link style={{ textDecoration: 'none' }} to='/'>Home</Link>{menu === "home" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("wig") }}><Link style={{ textDecoration: 'none' }} to='/wig'>Wig</Link>{menu === "wig" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("eyelash") }}><Link style={{ textDecoration: 'none' }} to='eyelash'>Eyelash</Link>{menu === "eyelash" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("nails") }}><Link style={{ textDecoration: 'none' }} to='/nails'>Nails</Link>{menu === "nails" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("eyebrow") }}><Link style={{ textDecoration: 'none' }} to='/eyebrow'>Eyebrow</Link>{menu === "eyebrow" ? <hr /> : <></>}</li>
            </ul>
            <div className="nav-login-cart">
                {localStorage.getItem('auth-token') ? <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }}>Logout</button>
                    : <Link to='/login'><button>Login</button></Link>
                }
                <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    )
}

export default Navbar
