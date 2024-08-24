import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; 
import Navbar from './Components/Navbar/Navbar.jsx';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer.jsx';
import Successfull from './Components/Successfull/Successfull.jsx';
import Address from './Components/Address/Address.jsx';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './Components/NotFound/NotFound.jsx';

// Import banners directly
import wig_banner from './Components/Assets/banner_1.png';
import eyelash_banner from './Components/Assets/banner_2.png';
import nails_banner from './Components/Assets/banner_3.png';
import eyebrow_banner from './Components/Assets/banner_4.png';
import default_banner from './Components/Assets/banner_3.png'; 

// Manually assign banners based on category name
const categoryBanners = {
  "Wig": wig_banner,
  "Eyelash": eyelash_banner,
  "Nails": nails_banner,
  "Eyebrow": eyebrow_banner,
  "Softlense": default_banner 
};

function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:4000/categories');
        const data = await response.json();
        if (data.success) {
          setCategories(data.categories);
        } else {
          toast.error("Failed to fetch categories.");
        }
      } catch (error) {
        toast.error("Failed to connect to the server.");
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          {categories.map(category => (
            <Route 
              key={category._id}
              path={`/${category.name.toLowerCase()}`} 
              element={<ShopCategory banner={categoryBanners[category.name] || default_banner} category={category.name.toLowerCase()} />} 
            />          
          ))}
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/successfull" element={<Successfull />} />
          <Route path="/address" element={<Address />} />
          <Route path="*" element={<NotFound />} /> {/* Catch-all route for 404 page */}
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
