import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';
import './CartItems.css';

const CartItems = () => {
    const navigate = useNavigate();
    const [addresses, setAddresses] = useState([]);
    const { cartItems, all_product, removeFromCart, getTotalCartItems, getTotalCartAmount, clearCart, updateServiceSelection, getServiceCharge, getTotalWithServiceCharge } = useContext(ShopContext);
    const [serviceSelection, setServiceSelection] = useState(() => JSON.parse(localStorage.getItem('serviceSelection')) || []);

    useEffect(() => {
        localStorage.setItem('serviceSelection', JSON.stringify(serviceSelection));
    }, [serviceSelection]);

    const handleReplaceButtonClick = () => {
        const userConfirmed = window.confirm("Are you sure you want to continue? Once you add the new address, the past data will be deleted.");
        if (userConfirmed) {
            navigate('/address');
        }
    };

    const calculateAdditionalServiceCharge = () => {
        let additionalServiceCharge = 0;
        for (const { productId, selection } of serviceSelection) {
            const item = all_product.find(product => product.id === productId);
            if (cartItems[item.id] > 0 && selection === 'Yes') {
                additionalServiceCharge += 30000;
            }
        }
        return additionalServiceCharge;
    };

    const serviceCharge = calculateAdditionalServiceCharge();

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            const token = localStorage.getItem('auth-token');
            const response = await fetch('http://localhost:4000/alladdress', {
                headers: {
                    'auth-token': token,
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
            const token = localStorage.getItem('auth-token');
            const response = await fetch('http://localhost:4000/clearcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) {
                throw new Error('Failed to clear cart');
            }
            await response.text();
            clearCart();
            navigate('/successfull');
        } catch (error) {
            console.error('Error clearing cart:', error);
            alert("An error occurred while clearing the cart");
        }
    };

    const getTotalWithService = () => {
        let total = getTotalCartAmount();
        total += serviceCharge;
        return total;
    };

    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);
        const updatedServiceSelection = serviceSelection.filter(item => item.productId !== productId);
        setServiceSelection(updatedServiceSelection);
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
                                <img className='cartitems-remove-icon' src={remove_icon} onClick={() => handleRemoveFromCart(e.id)} alt="" />
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
                        {Object.values(serviceSelection).some(item => item.selection === 'Yes') && (
                            <>
                                <div className="cartitems-total-item">
                                    <p>Service Charge</p>
                                    <p>Rp{serviceCharge}</p>
                                </div>
                                <hr />
                            </>
                        )}
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>Rp{getTotalWithService()}</h3>
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
                            <button className="replace-button" onClick={handleReplaceButtonClick}>
                                <i className="fa fa-exchange"></i>
                            </button>
                        </div>
                    </div>
                    <div className="container">
                        <p><strong>Address details: </strong></p>
                        {addresses.length > 0 ? (
                            <>
                                <div key={addresses[addresses.length - 1]._id}>
                                    <p> &nbsp;{addresses[addresses.length - 1].address_details}</p>
                                </div>
                                <div key={addresses[addresses.length - 1]._id + '-postal'}>
                                    <p> &nbsp;{addresses[addresses.length - 1].postal_code}</p>
                                </div>
                            </>
                        ) : (
                            <button onClick={handleReplaceButtonClick}>
                                <p style={{color: 'red', fontSize:'14px'}}>&nbsp;Address details is empty, please fill in to edit the address.</p>
                            </button>
                        )}
                        <hr />
                    </div>
                    <div className='container'>
                        <p><b>Note: </b></p>
                        {addresses.length > 0 ? (
                            <div key={addresses[addresses.length - 1]._id}>
                                <p> &nbsp;{addresses[addresses.length - 1].address_note}</p>
                            </div>
                        ) : (
                            <button onClick={handleReplaceButtonClick}>
                                <p style={{color: 'red', fontSize:'14px'}}>&nbsp;Note is empty, please fill in to edit the address.</p>
                            </button>
                        )}
                    </div>
                    <div className='container'>
                        <p><b>City: </b></p>
                        {addresses.length > 0 ? (
                            <div key={addresses[addresses.length - 1]._id}>
                                <p> &nbsp;{addresses[addresses.length - 1].city}</p>
                            </div>
                        ) : (
                            <button onClick={handleReplaceButtonClick}>
                                <p style={{color: 'red', fontSize:'14px'}}>&nbsp;City is empty, please fill in to edit the address.</p>
                            </button>
                        )}
                    </div>
                    <div className='container'>
                        <p><b>Phone Number: </b></p>
                        {addresses.length > 0 ? (
                            <div key={addresses[addresses.length - 1]._id}>
                                <p> &nbsp;{addresses[addresses.length - 1].phone_number}</p>
                            </div>
                        ) : (
                            <button onClick={handleReplaceButtonClick}>
                                <p style={{color: 'red', fontSize:'14px'}}>&nbsp;Phone Number is empty, please fill in to edit the address.</p>
                            </button>
                        )}
                    </div>
                    <br />
                </div>
            </div>
        </div>
    );
};

export default CartItems;
