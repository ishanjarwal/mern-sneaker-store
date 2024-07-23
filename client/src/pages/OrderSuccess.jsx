import React from 'react'
import { FaCheckCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

const OrderSuccess = () => {

    return (
        <div className='w-full min-h-screen h-full bg-slate-50 flex justify-center items-center'>
            <div className='py-8 px-12 rounded-2xl bg-white shadow-lg'>
                <div className='flex justify-center items-center text-9xl mx-auto text-green-400'>
                    <FaCheckCircle />
                </div>
                <h2 className='text-black my-4 text-3xl font-bold text-center'>Order Placed</h2>
                <p className='text-gray-600 text-center mb-8'>Thank You for choosing us. Keep shopping for more products</p>
                <Link
                    to={'/account/myorders'}
                    className='rounded-lg block text-center bg-black text-white shadow-lg py-2 px-4 mx-auto'>
                    Track your Order
                </Link>
            </div>
        </div>
    )
}

export default OrderSuccess
