import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideCart } from '../slices/cartSlice';

const CartFooter = () => {

    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.cart.items);
    

    return (
        <div>
            <div className="flex-1 px-4 py-4 w-full bg-white">
                <div className="flex justify-between text-base font-medium text-text mb-1">
                    <p>Total Items</p>
                    <p>
                        {cartItems.reduce((acc, curr) => { return (acc + curr.qty) }, 0)}
                    </p>
                </div>
                <div className="flex justify-between text-base font-medium text-text mb-1">
                    <p>Shipping Charges</p>
                    <p className='text-xs font-normal text-muted-text text-end whitespace-nowrap'>
                        (Calculated at Checkout)
                    </p>
                </div>
                <div className="flex justify-between text-base font-medium text-text mb-4">
                    <p>GST</p>
                    <p className='text-xs font-normal text-muted-text'>
                        (Inclusive)
                    </p>
                </div>
                <div className="flex justify-between text-xl font-bold text-text">
                    <p>Subtotal</p>
                    <p className='font-bold'>
                        {
                            new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })
                                .format(cartItems.reduce((acc, curr) => (acc + (curr.qty * curr.product.sp)), 0))
                        }
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CartFooter
