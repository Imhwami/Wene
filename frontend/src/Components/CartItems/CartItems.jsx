import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'
import './CartItems.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';


const CartItems = () => {
    const notify = () => toast("Wow so easy!");
    const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext)
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
                    return <div>
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
                }
                return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>cart Totals</h1>
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
                    <Link to={'/successfull'} style={{ textDecoration: "none" }}>
                        <button>PROCEED TO CHECKOUT</button>
                    </Link>
                </div>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

                <div className="cartitems-promocode">
                    <p>Please pay to BCA 0198829019 A/N PERSON NAME</p>
                    
                    <br /> <div class="container">
                    <p>Address details: Jalan Jalan</p>
                    {/* <p>Jalan</p> */}
                   

                    <div class="tooltip">
                        <span class="tooltiptext">Edit The Address Details</span>
                        <Link to={'/address'} style={{ textDecoration: "none" }}>
                        <button class="edit-button">
                            <i class="fa fa-pencil"></i> 
                        </button>    </Link>     </div>           <br />
                    <hr />
                   
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItems
