import React from 'react'
import ProductList from './components/ProductList'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import ProductListingPage from './pages/ProductListingPage'
import ProductDetails from './pages/ProductDetails'
import './App.css'
import CheckoutPage from './pages/CheckoutPage'
import AdminLayout from './layouts/AdminLayout'
import ManageProducts from './pages/admin/ManageProducts'
import AddProducts from './pages/admin/AddProducts'
import EditProduct from './pages/admin/EditProduct'
import ManageBrands from './pages/admin/ManageBrands'
import ManageCategories from './pages/admin/ManageCategories'
import ManageVariants from './pages/admin/ManageVariants'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />} >
        <Route index element={<ProductListingPage />}></Route>
        <Route path='/product/:id' element={<ProductDetails />}></Route>
        <Route path='/checkout' element={<CheckoutPage />}></Route>
      </Route>
      <Route path='/admin' element={<AdminLayout />}>
        <Route path='manage-products' element={<ManageProducts />}></Route>
        <Route path='add-product' element={<AddProducts />}></Route>
        <Route path='manage-brands' element={<ManageBrands />}></Route>
        <Route path='manage-categories' element={<ManageCategories />}></Route>
        <Route path='manage-variants' element={<ManageVariants />}></Route>
        <Route path='edit-product' element={<EditProduct />}></Route>
      </Route>
    </Routes>
  )
}

export default App
