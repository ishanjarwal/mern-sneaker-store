import React, { useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import { RiLoopLeftLine } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { DOMAIN, orderStates } from '../app/constants';
import { fetchOrdersAsync, resetCurrRazorpayOrder, verifyPaymentAsync } from '../slices/orderSlice';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { handleRazorpay } from '../utils/razorpayModalOpener';
import { FaCheck } from 'react-icons/fa6';

const UserOrders = () => {

    const dispatch = useDispatch();
    const orders = useSelector(state => state.order.orders);
    const orderState = useSelector(state => state.order.state);
    useEffect(() => {
        dispatch(fetchOrdersAsync());
    }, []);



    return (
        <div>
            <h1 className='text-3xl font-semibold mb-12'>Your Orders</h1>
            <div className='flex flex-col space-y-4'>
                {orders?.length > 0 && orders.map((order, idx) => (
                    <div key={idx} className='rounded-2xl shadow-lg p-8 bg-white'>
                        <div>
                            <h2>
                                <p className='font-bold'>Order {order.status}</p>
                            </h2>
                            <div className='mb-2 flex flex-col space-y-2'>
                                {/* order details */}
                                <p className='text-sm'>
                                    <span className='font-semibold'>Order ID :</span>
                                    {' '}
                                    <span>#{order._id}</span>
                                </p>
                                <p className='text-xs'>Created on :  {order.placed_at}</p>
                                {order.payment_status == 'due' && order.status == 'pending' && (
                                    <button
                                        onClick={() => {
                                            handleRazorpay(order, dispatch);
                                        }}
                                        className='w-min whitespace-nowrap py-2 px-3 bg-blue-500 text-white'>
                                        Complete Payment
                                    </button>
                                )}
                                <Link
                                    to={`/account/order/${order._id}`}
                                    className='w-min whitespace-nowrap py-2 px-3 bg-yellow-400 text-black'
                                >
                                    View Order
                                </Link>
                            </div>
                            <span className='border-b border-gray-300 block'></span>
                        </div>
                        {order.status != 'pending' && (
                            <div className='mt-6 mb-8'>
                                <div className='flex justify-between items-center mx-8'>
                                    {orderStates.map((state, index, arr) => (
                                        <>
                                            <span className={`${orderStates.indexOf(state) <= orderStates.indexOf(order.status) ? "bg-green-400" : "bg-gray-400"} w-6 h-6 relative rounded-full`}>
                                                <span className='absolute left-1/2 top-6 transform -translate-x-1/2 origin-center text-xs text-muted-text'>{state}</span>
                                                <FaCheck className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white' />
                                            </span>
                                            {index < arr.length - 1 && (
                                                <span className={`${orderStates.indexOf(state) < orderStates.indexOf(order.status) ? "bg-green-400" : "bg-gray-400"} h-1 flex-1 bg-gray-300`}></span>
                                            )}
                                        </>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div>
                            <h2 className='font-semibold'>Items in this Order</h2>
                            {/* items */}
                            {order.items.map(item => (
                                <>
                                    <div className='py-4 gap-y-4'>
                                        <div className='lg:col-span-3 col-span-8 flex justify-start items-start space-x-2'>
                                            <Link to={`/product/${item.id}`} className='h-24 w-24 bg-gray-100'>
                                                <img
                                                    src={item.thumbnail}
                                                    alt=""
                                                    className='h-full w-full object-center object-cover'
                                                />
                                            </Link>
                                            <div>
                                                <Link to={`/product/${item.id}`}>
                                                    <h2 className='text-md'>{item.name}</h2>
                                                </Link>
                                                <p>
                                                    <span className='text-lg font-semibold'>
                                                        ₹ {item.total_price}
                                                    </span>
                                                </p>
                                                <p>
                                                    <span className='text-sm'>
                                                        Quantity : <b>{item.quantity}</b>
                                                    </span>
                                                </p>
                                                <p>
                                                    <span className='text-sm'>
                                                        Price per article : <b>₹ {item.price}</b>
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <span className='border-b border-gray-300 block'></span>
                                </>
                            ))}

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserOrders
