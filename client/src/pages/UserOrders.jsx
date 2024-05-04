import React from 'react'
import { IoClose } from 'react-icons/io5'
import { RiLoopLeftLine } from "react-icons/ri";
const UserOrders = () => {
    return (
        <div>
            <h1 className='text-3xl font-semibold mb-12'>Your Orders</h1>
            <div>
                <div className='rounded-lg shadow-md p-4 bg-white'>
                    <h2>
                        <span className='font-semibold'>Order ID :</span>
                        {' '}
                        <span>2384751839123</span>
                    </h2>
                    <div className='flex justify-start items-center space-x-2 mb-2'>
                        {/* order details */}
                        <p className='text-xs'>Order Placed</p>
                        <button className='text-xs text-blue-500'>Cancel</button>
                    </div>
                    <span className='border-b border-gray-300 block'></span>
                    <div>
                        {/* items */}
                        <div className='grid grid-cols-8 py-4 gap-y-4 gap-x-6'>
                            <div className='lg:col-span-3 col-span-8 flex justify-start items-start space-x-2'>
                                <div className='h-24 w-24 bg-gray-100'>
                                    <img
                                        src="https://images.vegnonveg.com/resized/700X573/10681/athletics-los-angeles-clay-brown-65e1d8c002c70.jpg"
                                        alt=""
                                        className='h-full w-full object-center object-cover'
                                    />
                                </div>
                                <div>
                                    <h3 className='text-xs'>ADIDAS ORIGINALS</h3>
                                    <h2 className='text-md'>ATHLETICS LOS ANGELES 'CLAY'</h2>
                                    <p>
                                        <span className='text-lg font-semibold'>
                                            ₹2,599
                                        </span>
                                    </p>

                                </div>
                            </div>
                            <div className='lg:col-span-4 col-span-8'>
                                <div className='flex justify-between items-center mx-8'>
                                    <span className='w-4 h-4 relative rounded-full bg-green-400'>
                                        <span className='absolute left-1/2 top-4 transform -translate-x-1/2 origin-center text-xs text-muted-text'>Ordered</span>
                                    </span>
                                    <span className='h-1 flex-1  bg-gray-300'></span>
                                    <span className='w-4 h-4 relative rounded-full bg-gray-300'>
                                        <span className='absolute left-1/2 top-4 transform -translate-x-1/2 origin-center text-xs text-muted-text'>Dispatched</span>
                                    </span>
                                    <span className='h-1 flex-1  bg-gray-300'></span>
                                    <span className='w-4 h-4 relative rounded-full bg-gray-300'>
                                        <span className='absolute left-1/2 top-4 transform -translate-x-1/2 origin-center text-xs text-muted-text'>Shipped</span>
                                    </span>
                                    <span className='h-1 flex-1  bg-gray-300'></span>
                                    <span className='w-4 h-4 relative rounded-full bg-gray-300'>
                                        <span className='absolute left-1/2 top-4 transform -translate-x-1/2 origin-center text-xs text-muted-text whitespace-nowrap'>Out for Delivery</span>
                                    </span>
                                    <span className='h-1 flex-1  bg-gray-300'></span>
                                    <span className='w-4 h-4 relative rounded-full bg-gray-300'>
                                        <span className='absolute left-1/2 top-4 transform -translate-x-1/2 origin-center text-xs text-muted-text'>Delivered</span>
                                    </span>

                                </div>
                            </div>
                            <div className='lg:col-span-1 col-span-8'>
                                {/* <button className='text-xs text-white bg-blue-500 py-1 px-2 rounded-md flex items-center justify-center space-x-1'>
                                    <span>
                                        <IoClose />
                                    </span>
                                    <span>Cancel</span>
                                </button> */}
                                <button className='text-xs text-white bg-blue-500 py-1 px-2 rounded-md flex items-center justify-center space-x-1'>
                                    <span>
                                        <RiLoopLeftLine />
                                    </span>
                                    <span>Return</span>
                                </button>
                            </div>
                        </div>
                        <span className='border-b border-gray-300 block'></span>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserOrders
