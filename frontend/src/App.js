import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; 
import Navbar from './Components/Navbar/Navbar.jsx';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer.jsx';
import wig_banner from './Components/Assets/banner_1.png'
import eyelash_banner from './Components/Assets/banner_2.png'
import nails_banner from './Components/Assets/banner_3.png'
import eyebrow_banner from './Components/Assets/banner_4.png'
import Successfull from './Components/Successfull/Successfull.jsx';
import Address from './Components/Address/Address.jsx';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/wig' element={<ShopCategory banner={wig_banner} category="wig"/>}/>
        <Route path='/eyelash' element={<ShopCategory banner={eyelash_banner} category="eyelash"/>}/>
        <Route path='/nails' element={<ShopCategory banner={nails_banner} category="nails"/>}/>
        <Route path='/eyebrow' element={<ShopCategory banner={eyebrow_banner} category="eyebrow"/>}/>
        <Route path="/product" element={<Product/>}>
        <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
        <Route path='/successfull' element={<Successfull/>}/>
        <Route path='/address' element={<Address/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
