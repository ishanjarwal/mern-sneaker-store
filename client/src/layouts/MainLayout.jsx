import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import MobileNavbar from '../components/MobileNavbar'
import CartPanel from '../components/CartPanel'
import WishlistModal from '../components/WishlistModal'
import { ToastContainer, toast, Flip } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCartAsync, resetCartApiError, resetCartApiMessage } from '../slices/cartSlice'
import { fetchWishlistAsync, resetWishlistApiError, resetWishlistApiMessage } from '../slices/wishlistSlice'

const MainLayout = () => {

    const userId = "661137f22a31832ceb92ddbc";
    const dispatch = useDispatch();
    const cartState = useSelector(state => state.cart.state);
    const cartApiError = useSelector(state => state.cart.apiError);
    const cartApiMessage = useSelector(state => state.cart.apiMessage);

    const wishlistState = useSelector(state => state.wishlist.state);
    const wishlistApiError = useSelector(state => state.wishlist.apiError);
    const wishlistApiMessage = useSelector(state => state.wishlist.apiMessage);


    const [mobileNav, setMobileNav] = useState(false);
    function handleMenu() {
        if (window.innerWidth > 1028) {
            setMobileNav(false);
        }
    }
    window.addEventListener('resize', handleMenu);
    useEffect(() => {
        handleMenu();
    }, []);


    // fetchusercart
    useEffect(() => {
        dispatch(fetchCartAsync(userId));
        dispatch(fetchWishlistAsync(userId));
    }, []);
    useEffect(() => {
        if (cartState == 'fulfilled') {
            dispatch(fetchCartAsync(userId));
        }
    }, [dispatch, cartState]);

    // handle cart errors
    useEffect(() => {
        if (cartApiError) {
            toast.error(cartApiError, { toastId: "cart error toast", containerId: "main-layout-toast-container" })
        }
        if (cartApiMessage) {
            toast.success(cartApiMessage, { toastId: "cart success toast", containerId: "main-layout-toast-container" })
        }
        dispatch(resetCartApiError())
        dispatch(resetCartApiMessage())
    }, [cartState]);


    // fetch user wishlist
    useEffect(() => {
        if (wishlistState == 'fulfilled') {
            dispatch(fetchWishlistAsync(userId));
        }
    }, [dispatch, wishlistState]);

    // handle wishlist errors
    useEffect(() => {
        if (wishlistApiError) {
            toast.error(wishlistApiError, { toastId: "wishlist error toast", containerId: "main-layout-toast-container" })
        }
        if (wishlistApiMessage) {
            toast.success(wishlistApiMessage, { toastId: "wishlist success toast", containerId: "main-layout-toast-container" })
        }
        dispatch(resetWishlistApiError())
        dispatch(resetWishlistApiMessage())
    }, [wishlistState]);

    return (
        <main>
            <ToastContainer
                containerId={"main-layout-toast-container"}
                position="bottom-center"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Flip}
            />
            <WishlistModal />
            <MobileNavbar mobileNav={mobileNav} setMobileNav={setMobileNav} />
            <Navbar setMobileNav={setMobileNav} />
            <CartPanel />
            <div className='max-w-7xl mx-auto w-full'>
                <Outlet />
            </div>
        </main>
    )
}

export default MainLayout
