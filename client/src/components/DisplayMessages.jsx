import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, Flip } from 'react-toastify'
import { toastEmmitter } from '../utils/toastEmmitter';
import { fetchWishlistAsync, resetWishlistResponses } from '../slices/wishlistSlice';
import { fetchCartAsync, resetCartResponses } from '../slices/cartSlice';
import { fetchProductsAsync, resetProductResponses } from '../slices/productSlice';
import { fetchCategoriesAsync, resetCategoryResponses } from '../slices/categorySlice';
import { fetchBrandsAsync, resetBrandResponses } from '../slices/brandSlice';
import { resetUserResponses } from '../slices/userSlice';

const DisplayMessages = ({ children }) => {

    // error logics
    const user = useSelector(state => state.user.currUser);
    const dispatch = useDispatch();
    const cartState = useSelector(state => state.cart.state);
    const cartResponses = useSelector(state => state.cart.responses);
    const wishlistState = useSelector(state => state.wishlist.state);
    const wishlistResponses = useSelector(state => state.wishlist.responses);
    const productState = useSelector(state => state.product.state);
    const productResponses = useSelector(state => state.product.responses);
    const categoryState = useSelector(state => state.category.state);
    const categoryResponses = useSelector(state => state.category.responses);
    const brandState = useSelector(state => state.brand.state);
    const brandResponses = useSelector(state => state.brand.responses);
    const userState = useSelector(state => state.user.state);
    const userResponses = useSelector(state => state.user.responses);

    // wishlist and cart states should be idle always
    useEffect(() => {
        if (cartState == 'fulfilled' && user) {
            dispatch(fetchCartAsync(user._id));
        }
        if (wishlistState == 'fulfilled' && user) {
            dispatch(fetchWishlistAsync(user._id));
        }
        if (productState == 'fulfilled' && user) {
            // dispatch(fetchProductsAsync());
        }
        if (categoryState == 'fulfilled') {
            dispatch(fetchCategoriesAsync());
        }
        if (brandState == 'fulfilled') {
            dispatch(fetchBrandsAsync());
        }
    }, [dispatch, cartState, wishlistState, productState, categoryState, brandState, userState, user]);

    // handle cart errors
    useEffect(() => {
        cartResponses.forEach(element => {
            if (element.message) {
                toastEmmitter(element.status, element.message, "main-layout-toast-container");
            }
        });
        if (cartResponses.length > 0) {
            dispatch(resetCartResponses());
        }
    }, [cartResponses]);


    // handle wishlist errors
    useEffect(() => {
        wishlistResponses.forEach(element => {
            if (element.message) {
                toastEmmitter(element.status, element.message, "main-layout-toast-container");
            }
        });
        if (wishlistResponses.length > 0) {
            dispatch(resetWishlistResponses());
        }
    }, [wishlistResponses]);

    // handle product errors
    useEffect(() => {
        productResponses.forEach(element => {
            if (element.message) {
                toastEmmitter(element.status, element.message, "main-layout-toast-container");
            }
        });
        if (productResponses.length > 0) {
            dispatch(resetProductResponses());
        }
    }, [productResponses]);

    // handle category errors
    useEffect(() => {
        categoryResponses.forEach(element => {
            if (element.message) {
                toastEmmitter(element.status, element.message, "main-layout-toast-container");
            }
        });
        if (categoryResponses.length > 0) {
            dispatch(resetCategoryResponses());
        }
    }, [categoryResponses]);

    // handle brand errors
    useEffect(() => {
        brandResponses.forEach(element => {
            if (element.message) {
                toastEmmitter(element.status, element.message, "main-layout-toast-container");
            }
        });
        if (brandResponses.length > 0) {
            dispatch(resetBrandResponses());
        }
    }, [brandResponses]);

    // handle user errors
    useEffect(() => {
        userResponses.forEach(element => {
            if (element.message) {
                toastEmmitter(element.status, element.message, "main-layout-toast-container");
            }
        });
        if (userResponses.length > 0) {
            dispatch(resetUserResponses());
        }
    }, [userResponses]);
    return (
        <>
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
                transition={Flip}
            />
            {children}
        </>
    )
}

export default DisplayMessages
