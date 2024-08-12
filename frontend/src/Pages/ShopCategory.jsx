import React, { useContext, useState } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Items/Item';

const ShopCategory = (props) => {
    const { all_product } = useContext(ShopContext);
    const [sortOrder, setSortOrder] = useState('highest'); // 'highest' or 'lowest'

    // Filter products by category
    const filteredProducts = all_product.filter(item => item.category === props.category);

    // Sort products by offer price based on sortOrder
    const sortedProducts = filteredProducts.sort((a, b) => {
        if (sortOrder === 'highest') {
            return b.new_price - a.new_price; // Highest to Lowest
        } else {
            return a.new_price - b.new_price; // Lowest to Highest
        }
    });

    // Toggle sort order
    const toggleSortOrder = () => {
        setSortOrder(prevOrder => prevOrder === 'highest' ? 'lowest' : 'highest');
    };

    return (
        <div className='shop-category'>
            <img className='shopcategory-banner' src={props.banner} alt="" />
            <div className="shopcategory-indextSort">
                <p>
                    <span>Showing 1-{sortedProducts.length}</span> out of {sortedProducts.length} products
                </p>
                <div className="shop-category-sort" onClick={toggleSortOrder}>
                    Sort by {sortOrder === 'highest' ? 'Highest Price' : 'Lowest Price'} <img src={dropdown_icon} alt="" />
                </div>
            </div>
            <div className="shopcategory-product">
                {sortedProducts.map((item, i) => (
                    <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                ))}
            </div>
            <div className="shopcategory-loadmore">
                Explore More
            </div>
        </div>
    );
};

export default ShopCategory;
