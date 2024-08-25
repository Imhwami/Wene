import { useEffect, useState } from 'react';
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {

  const [allproducts, setAllProducts] = useState([]);
  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allproducts')
      .then((res) => res.json())
      .then((data) => { setAllProducts(data) })
  }

  useEffect(() => {
    fetchInfo();
  }, [])

  const remove_product = async(id) => {
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (confirmed) {
        await fetch('http://localhost:4000/removeproduct', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id })
        });
        await fetchInfo();
    }
};

  return (
    <div className='list-product'>
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p style={{fontSize:'18px', fontWeight:'500', marginRight:'-30px'}}>Products</p>
        <p style={{fontSize:'18px', fontWeight:'500'}}>Title</p>
        <p style={{fontSize:'18px', fontWeight:'500'}}>Old Price</p>
        <p style={{fontSize:'18px', fontWeight:'500'}}>New Price</p>
        <p style={{fontSize:'18px', fontWeight:'500'}}>Category</p>
        <p style={{fontSize:'18px', fontWeight:'500'}}>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, index) => {
          return <>
            <div key={index} className="listproduct-format-main listproduct-format">
              <img src={product.image} alt="" className="listproduct-product-icon" />
              <p className="listproduct-title">{product.name}</p>
              <p>Rp {product.old_price}</p>
              <p>Rp {product.new_price}</p>
              <p>{product.category}</p>
              <img onClick = {()=>{remove_product(product.id)}}className='listproduct-remove-icon' src={cross_icon} alt="Remove - Product from User side" />
            </div>
            <hr />
          </>
        })}
      </div>
    </div>
  )
}

export default ListProduct
