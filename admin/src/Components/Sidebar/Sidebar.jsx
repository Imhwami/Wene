// import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'
import add_product_icon from '../../assets/Product_Cart.svg'
import list_product_icon from '../../assets/Product_list_icon.svg'
import transaction_icon from '../../assets/transaction.svg'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to={'/addproduct'} style={{textDecoration:"none"}}Link>
        <div className="sidebar-item">
            <img src={add_product_icon} alt="" />
            <p>Add Product</p>
        </div>
      </Link>
      <Link to={'/listproduct'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
            <img src={list_product_icon} alt="" />
            <p>Product List</p>
        </div>
      </Link>
      <Link to={'/admintransactionpage'} style={{textDecoration:"none"}}>
        <div className="sidebar-item">
            <img src={transaction_icon} alt="" />
            <p>Transaction</p>
        </div>
      </Link>
    </div>
  )
}

export default Sidebar
