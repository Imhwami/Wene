import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        {/* <div className="descriptionbox-nav-box fade">Reviews (122)</div> */}
        </div>
        <div className="descriptionbox-description">
            <p>An e-commerce website is an online platfrm that facilitate buying and selling of products
                or services over the internet serves as a virtual marketplace where business and individual
                showcase their products, interact with customer, and conduct transactions without the need 
                for a physical presence. E-commerce websites have gained immense popularity due to their 
                convenience, accessibility, and the global rach they offer.
             <p>E-commerce websites typically display products or services a detailed descriptions, images, prices,
                and any available varian (e.g., sizes, colors). Each product usually has its own dedication with relevant information
             </p>
            </p>
      </div>
    </div>
  )
}

export default DescriptionBox
