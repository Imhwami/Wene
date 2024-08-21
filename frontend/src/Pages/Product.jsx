import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrumbs/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import NotFound from '../Components/NotFound/NotFound';

const Product = () => {
  const { productId } = useParams();
  const { all_product } = useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeoutReached, setTimeoutReached] = useState(false);

  useEffect(() => {
      const fetchProductById = async (id) => {
          try {
              const response = await fetch(`http://localhost:4000/product/${id}`);
              if (!response.ok) {
                  throw new Error('Failed to fetch product');
              }
              const data = await response.json();
              setProduct(data);
              setLoading(false);
          } catch (error) {
              console.error('Error fetching product:', error);
              setLoading(false);
          }
      };

      const foundProduct = all_product.find((e) => e.id === Number(productId));
      if (foundProduct) {
          setProduct(foundProduct);
          setLoading(false);
      } else {
          fetchProductById(productId);
      }

      // Set a timeout for 3 minutes (180000ms)
      const timeout = setTimeout(() => {
          setTimeoutReached(true);
          setLoading(false);
      }, 180000);

      // Cleanup the timeout if component unmounts or product is found before timeout
      return () => clearTimeout(timeout);
  }, [all_product, productId]);

  if (loading) {
      return <p>Loading product details...</p>;
  }

  if (timeoutReached) {
      return <NotFound />;
  }

  if (!product) {
      return <NotFound />;
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
