import React, { useEffect, useState } from 'react';
import Hero from '../Components/Hero/Hero';
import Popular from '../Components/Popular/Popular';
import Offers from '../Components/Offers/Offers';
import NewCollections from '../Components/NewCollections/NewCollections';
import NewsLetter from '../Components/News/NewsLetter';


const Shop = () => {
  const [loginMessage, setLoginMessage] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('login') === 'success') {
      setLoginMessage('User successfully logged in');
      // Remove the query parameter from the URL
      window.history.replaceState(null, null, window.location.pathname);
    }
  }, []);
  return (
      <div>
      <Hero />
      <Popular />
      <Offers />
      <NewCollections />
      <NewsLetter />
      </div>
  );
};

export default Shop;