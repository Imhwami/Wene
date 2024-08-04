import React, { useEffect, useState } from 'react'
import './NewCollections.css'
import Item from '../Items/Item'
import 'react-toastify/dist/ReactToastify.css';
import './NewCollections.css';
import { toast } from 'react-toastify';

const NewCollections = () => {
  const [new_collection, setNew_collection] = useState([]);

  useEffect(() => {
    const fetchNewCollections = async () => {
      try {
        const response = await fetch('http://localhost:4000/newcollections');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setNew_collection(data);
      } catch (error) {
        toast.error(`Failed to fetch new collections`);
      }
    };

    fetchNewCollections();
  }, []);
  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item, i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}
      </div>
    </div>
  )
}

export default NewCollections
