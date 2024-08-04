import React, { useEffect, useState } from 'react'
import './Popular.css'
import Item from '../Items/Item'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/popularinwomen');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPopularProducts(data);
      } catch (error) {
        toast.error(`Failed to fetch popular products`);
      }
    };

    fetchPopularProducts();
  }, []);

  return (
    <div className='popular'>
      <h1>POPULAR IN HAIR</h1>
      <hr />
      <div className='popular-item'>
        {popularProducts.map((item,i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div> 
  )
} 

export default Popular
