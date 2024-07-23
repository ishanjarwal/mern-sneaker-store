import React from 'react'
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Link, useSearchParams } from 'react-router-dom';

const OrderFailed = () => {
    return (
        <div className='w-full min-h-screen h-full bg-slate-50 flex justify-center items-center'>
            <div className='py-8 px-12 rounded-2xl bg-white shadow-lg'>
                <div className='flex justify-center items-center text-9xl mx-auto text-red-400'>
                    <FaTimesCircle />
                </div>
                <h2 className='text-black my-4 text-3xl font-bold text-center'>Order Failed</h2>
                <p className='text-gray-600 text-center mb-8'>Your Payment has been failed. If your account has been debited, contact us at message@sneakerstore.com</p>
                <Link
                    to={'/account/myorders'}
                    className='rounded-lg block text-center bg-black text-white shadow-lg py-2 px-4 mx-auto'>
                    Your Orders
                </Link>
            </div>
        </div>
    )
}

export default OrderFailed
