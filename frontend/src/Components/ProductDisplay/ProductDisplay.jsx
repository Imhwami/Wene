import React, { useContext, useState, useEffect } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart, updateServiceSelection } = useContext(ShopContext);
    const [serviceSelection, setServiceSelection] = useState(() => JSON.parse(localStorage.getItem('serviceSelection')) || []);

    useEffect(() => {
        localStorage.setItem('serviceSelection', JSON.stringify(serviceSelection));
    }, [serviceSelection]);

    const handleServiceClick = (service) => {
        const newSelection = serviceSelection.filter(item => item.productId !== product.id);
        const updatedSelection = [...newSelection, { productId: product.id, selection: service }];
        setServiceSelection(updatedSelection);
        updateServiceSelection(product.id, service);
    };

    const handleAddToCart = () => {
        if (localStorage.getItem('auth-token')) {
            const selectedService = serviceSelection.find(item => item.productId === product.id);
            if (selectedService) {
                addToCart(product.id);
            } else {
                alert('Please select an option for the service.');
            }
        } else {
            toast.error("User must be logged in", {
                style: { width: '250px' },
            });

            setTimeout(() => {
                window.location.replace('/login');
            }, 1000);
        }
    };


    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt="" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">
                        Rp{product.old_price}
                    </div>
                    <div className="productdisplay-right-price-new">
                        Rp{product.new_price}
                    </div>
                </div>
                <div className="productdisplay-right-description">
                    A lightweight, usually knitted, pullover shirt, close-fitting and with a round
                    necklace and short sleeves, worn as an undershirt or outer garment
                </div>
                <div className="productdisplay-right-size">
                    <div className="service-text">
                        <h1>Include Service</h1>
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                        <div className="tooltip">
                            <span className="tooltiptext" style={{ width: '360px' }}>If you choose yes, the staff will come and help apply the product</span>
                            <button className="edit-button">
                                <i className="fa fa-question"></i>
                            </button>
                        </div>
                    </div>
                    <div className="productdisplay-right-sizes">
                        <button
                            onClick={() => handleServiceClick('Yes')}
                            className={
                                serviceSelection.find((item) => item.productId === product.id)?.selection ===
                                    'Yes'
                                    ? 'selected'
                                    : ''
                            }
                        >
                            Yes
                        </button>
                        <button
                            onClick={() => handleServiceClick('No')}
                            className={
                                serviceSelection.find((item) => item.productId === product.id)?.selection ===
                                    'No'
                                    ? 'selected'
                                    : ''
                            }
                        >
                            No
                        </button>
                    </div>
                </div>
                <button className='add-to-cart' onClick={handleAddToCart}>
                    ADD TO CART
                </button>
                <p className='productdisplay-right-category'>
                    <span>Category: </span>
                    Women, T-Shirt, Crop Top
                </p>
                <p className='productdisplay-right-category'>
                    <span>Tags: </span>
                    Modern, Latest
                </p>
            </div>
            <ToastContainer
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                className="custom-toast-container"
            />
        </div>
    );
};

export default ProductDisplay;
