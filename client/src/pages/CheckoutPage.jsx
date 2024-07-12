import React, { useEffect } from 'react'
import Checkout from '../components/Checkout'
import { useDispatch } from 'react-redux';
import { filterCartAsync } from '../slices/cartSlice';

const CheckoutPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(filterCartAsync())
    }, []);

    return (
        <div>
            <Checkout />
        </div>
    )
}

export default CheckoutPage
