import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import './CartItems.css';

const CartItems = () => {
    const [addresses, setAddresses] = useState([]);
    const { getTotalCartAmount, all_product, cartItems, removeFromCart, clearCart } = useContext(ShopContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            const token = localStorage.getItem('auth-token'); // Retrieve the JWT token from local storage
            const response = await fetch('http://localhost:4000/alladdress', {
                headers: {
                    'auth-token': token, // Include the JWT token in the request headers
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch addresses');
            }
            const data = await response.json();
            setAddresses(data.addresses);
            console.log(data);
        } catch (error) {
            console.error('Error fetching addresses:', error);
        }
    };

    const handleProceedToCheckout = async () => {
        try {
            const token = localStorage.getItem('auth-token'); // Retrieve the JWT token from local storage
            const response = await fetch('http://localhost:4000/clearcart', {
                method: 'POST',
                headers: {
                    'auth-token': token, // Include the JWT token in the request headers
                },
            });
            if (!response.ok) {
                throw new Error('Failed to clear cart');
            }
            await response.text();
            clearCart();
            navigate('/successfull'); // Navigate to the success page
        } catch (error) {
            console.error('Error clearing cart:', error);
            alert("An error occurred while clearing the cart");
        }
    };

    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className="cartitems-format cartitems-format-main">
                                <img src={e.image} alt="" className='carticon-product-icon' />
                                <p>{e.name}</p>
                                <p>Rp {e.new_price}</p>
                                <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                                <p>{e.new_price * cartItems[e.id]}</p>
                                <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="" />
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h2>Cart Summary</h2>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>Rp{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>Rp{getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button className='checkout' onClick={handleProceedToCheckout}>PROCEED TO CHECKOUT</button>
                </div>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

                <div className="cartitems-promocode">
                    <p>Please pay to <b>BCA 0198829019 A/N Person Name</b></p>
                    <br />
                    <hr />
                    <br />
                    <div className="container">
                        <h2>Address Information</h2>
                        <div className="tooltip">
                            <span className="tooltiptext">Replace the address with the new one</span>
                            <Link to={'/address'} style={{ textDecoration: "none" }}>
                                <button className="replace-button">
                                    <i className="fa fa-exchange"></i>
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="container">
                        <p><strong>Address details: </strong></p>
                        {addresses.length > 0 && (
                            <div key={addresses[addresses.length - 1]._id}>
                                <p> &nbsp;{addresses[addresses.length - 1].address_details}</p>
                            </div>
                        )}
                        {addresses.length > 0 && (
                            <div key={addresses[addresses.length - 1]._id}>
                                <p> &nbsp;{addresses[addresses.length - 1].postal_code}</p>
                            </div>
                        )}
                        <hr />
                    </div>
                    <div className='container'>
                        <p><b>Note: </b></p>
                        {addresses.length > 0 && (
                            <div key={addresses[addresses.length - 1]._id}>
                                <p> &nbsp;{addresses[addresses.length - 1].address_note}</p>
                            </div>
                        )}
                    </div>
                    <div className='container'>
                        <p><b>City: </b></p>
                        {addresses.length > 0 && (
                            <div key={addresses[addresses.length - 1]._id}>
                                <p> &nbsp;{addresses[addresses.length - 1].city}</p>
                            </div>
                        )}
                    </div>
                    <div className='container'>
                        <p><b>Phone Number: </b></p>
                        {addresses.length > 0 && (
                            <div key={addresses[addresses.length - 1]._id}>
                                <p> &nbsp;{addresses[addresses.length - 1].phone_number}</p>
                            </div>
                        )}
                    </div>
                    <br />
                </div>
            </div>
        </div>
    );
};

export default CartItems;
