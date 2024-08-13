import React, { useState, useEffect, useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import Breadcrum from '../Components/Breadcrumbs/Breadcrum'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay'
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox'

const Product = () => {
  const { productId } = useParams();
  const { all_product } = useContext(ShopContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
      const fetchProductById = async (id) => {
          try {
              const response = await fetch(`http://localhost:4000/product/${id}`);
              if (!response.ok) {
                  throw new Error('Failed to fetch product');
              }
              const data = await response.json();
              setProduct(data);
          } catch (error) {
              console.error('Error fetching product:', error);
          }
      };

      const foundProduct = all_product.find((e) => e.id === Number(productId));
      if (foundProduct) {
          setProduct(foundProduct);
      } else {
          fetchProductById(productId);
      }
  }, [all_product, productId]);

  if (!product) {
      return <p>Loading product details...</p>;
  }

  return (
      <div>
          <Breadcrum product={product} />
          <ProductDisplay product={product} />
          <DescriptionBox />
      </div>
  );
};

export default Product;