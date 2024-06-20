import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import ProductListingPage from './pages/ProductListingPage'
import ProductDetails from './pages/ProductDetails'
import './App.css'
import CheckoutPage from './pages/CheckoutPage'
import AdminLayout from './layouts/AdminLayout'
import ManageProducts from './pages/admin/ManageProducts'
import AddProducts from './pages/admin/AddProducts'
import ManageBrands from './pages/admin/ManageBrands'
import ManageCategories from './pages/admin/ManageCategories'
import ManageVariants from './pages/admin/ManageVariants'
import UpdateProduct from './pages/admin/UpdateProduct'
import Login from './components/Login'
import SignUp from './components/SignUp'
import AuthLayout from './layouts/AuthLayout'
import Protected from './components/Protected'
import UserProfile from './pages/UserProfile'
import UserOrders from './pages/UserOrders'
import AccountLayout from './layouts/AccountLayout'
import ErrorPage from './pages/ErrorPage'
import { useDispatch } from 'react-redux'
import { checkAuthAsync } from './slices/userSlice'

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuthAsync());
  }, []);
  return (
    <Routes>
      <Route path='/' element={<AuthLayout />}>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
      </Route>
      <Route path='/' element={<MainLayout />} >
        <Route index element={<ProductListingPage />}></Route>
        <Route path='/product/:id' element={<ProductDetails />}></Route>
        <Route path='/checkout' element={<CheckoutPage />}></Route>
        <Route path='/account' element={<AccountLayout />}>
          <Route index element={<UserProfile />}></Route>
          <Route path='myorders' element={<UserOrders />}></Route>
        </Route>
      </Route>
      <Route path='/admin' element={<AdminLayout />}>
        <Route path='manage-products' element={<ManageProducts />}></Route>
        <Route path='add-product' element={<AddProducts />}></Route>
        <Route path='manage-brands' element={<ManageBrands />}></Route>
        <Route path='manage-categories' element={<ManageCategories />}></Route>
        <Route path='manage-variants' element={<ManageVariants />}></Route>
        <Route path='update-product/:id' element={<UpdateProduct />}></Route>
      </Route>
      <Route path='/error' element={<ErrorPage />}></Route>
    </Routes>
  )
}

export default App
