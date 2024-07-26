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
import { useDispatch, useSelector } from 'react-redux'
import { checkAuthAsync } from './slices/userSlice'
import Logout from './components/Logout'
import { fetchCartAsync } from './slices/cartSlice'
import { fetchWishlistAsync } from './slices/wishlistSlice'
import DisplayMessages from './components/DisplayMessages'
import ManageUsers from './pages/admin/ManageUsers'
import { fetchBrandsAsync } from './slices/brandSlice'
import { fetchCategoriesAsync } from './slices/categorySlice'
import { fetchProductsAsync } from './slices/productSlice'
import ChangePassword from './pages/ChangePassword'
import OrderSuccess from './pages/OrderSuccess'
import OrderFailed from './pages/OrderFailed'
import UserOrder from './pages/UserOrder'
import ManageOrders from './pages/admin/ManageOrders'

const App = () => {
  const user = useSelector(state => state.user.currUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuthAsync());
    dispatch(fetchBrandsAsync());
    dispatch(fetchCategoriesAsync());
    // dispatch(fetchProductsAsync());
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(fetchCartAsync());
      dispatch(fetchWishlistAsync());
    }
  }, [user]);


  return (
    <DisplayMessages>
      <Routes>
        <Route path='/order-success' element={<OrderSuccess />}></Route>
        <Route path='/order-failed' element={<OrderFailed />}></Route>
        <Route path='/reset-password/:token' element={<ChangePassword />}></Route>
        <Route path='/logout' element={<Logout />}></Route>
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
            <Route path='order/:id' element={<UserOrder />}></Route>
          </Route>
        </Route>
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<ManageProducts />}></Route>
          <Route path='add-product' element={<AddProducts />}></Route>
          <Route path='manage-brands' element={<ManageBrands />}></Route>
          <Route path='manage-categories' element={<ManageCategories />}></Route>
          <Route path='manage-variants' element={<ManageVariants />}></Route>
          <Route path='manage-users' element={<ManageUsers />}></Route>
          <Route path='update-product/:id' element={<UpdateProduct />}></Route>
          <Route path='manage-orders' element={<ManageOrders />}></Route>
        </Route>
        <Route path='*' element={<ErrorPage />}></Route>
      </Routes>
    </DisplayMessages>
  )
}

export default App
