import React, { useContext, useState } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
    const [selectedService, setSelectedService] = useState(null);

    const handleYesClick = () => {
        setSelectedService('Yes');
    };

    const handleNoClick = () => {
        setSelectedService('No');
    };

    const handleAddToCart = () => {
        if (selectedService) {
            localStorage.setItem('includeService', selectedService);
            addToCart(product.id);
        } else {
            alert('Please select an option for the service.');
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
                            <span className="tooltiptext" style={{width:'360px'}}>If you choose yes, the staff will come and help apply the product</span>
                            <button className="edit-button">
                                <i className="fa fa-question"></i>
                            </button>
                        </div>
                    </div>
                    <div className="productdisplay-right-sizes">
                        <button onClick={handleYesClick} className={selectedService === 'Yes' ? 'selected' : ''}>Yes</button>
                        <button onClick={handleNoClick} className={selectedService === 'No' ? 'selected' : ''}>No</button>
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
        </div>
    );
};

export default ProductDisplay;
