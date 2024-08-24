// import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import AddProduct from '../../Components/AddProduct/AddProduct.jsx'
import ListProduct from '../../Components/ListProduct/ListProduct.jsx'
import AdminTransactionsPage from '../../Components/AdminTransactionPage/AdminTransactionPage.jsx'
import AddCategory from '../../Components/Categories/AddCategory.jsx'
const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar/>
      <Routes>
        <Route path='/addproduct' element={<AddProduct/>}/>
        <Route path='/listproduct' element={<ListProduct/>}/>
        <Route path='/admintransactionpage' element={<AdminTransactionsPage/>}/>
        <Route path="/managecategories" element={<AddCategory/>} />
      </Routes>
    </div>
  )
}

export default Admin
