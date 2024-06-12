import React, { useContext, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo_2.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link, useLocation } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown from '../Assets/nav_icon.png';
import { Tooltip } from 'react-tooltip';

const Navbar = () => {
    const { getTotalCartItems } = useContext(ShopContext);
    const menuRef = useRef();
    const location = useLocation();
    const currentPath = location.pathname;

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
                <li>
                    <Link style={{ textDecoration: 'none' }} to='/'>Home</Link>
                    {currentPath === "/" && <hr />}
                </li>
                <li>
                    <Link style={{ textDecoration: 'none' }} to='/wig'>Wig</Link>
                    {currentPath === "/wig" && <hr />}
                </li>
                <li>
                    <Link style={{ textDecoration: 'none' }} to='/eyelash'>Eyelash</Link>
                    {currentPath === "/eyelash" && <hr />}
                </li>
                <li>
                    <Link style={{ textDecoration: 'none' }} to='/nails'>Nails</Link>
                    {currentPath === "/nails" && <hr />}
                </li>
                <li>
                    <Link style={{ textDecoration: 'none' }} to='/eyebrow'>Eyebrow</Link>
                    {currentPath === "/eyebrow" && <hr />}
                </li>
            </ul>
            <div className="nav-login-cart">
                {localStorage.getItem('auth-token') ? (
                    <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/login') }}>Logout</button>
                ) : (
                    <Link to='/login'><button>Login</button></Link>
                )}
                <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                <div data-tooltip-id="tooltip" data-tooltip-content="Total of our product on your cart" className="nav-cart-count">
                    {getTotalCartItems()}
                </div>
                <Tooltip id="tooltip" />
            </div>
        </div>
    );
}

export default Navbar;
