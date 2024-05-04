import React from 'react'
import { Link, Outlet } from "react-router-dom"
import { useDispatch } from "react-redux"
import { showCart } from "../slices/cartSlice"
import { showWishlist } from "../slices/wishlistSlice"
import { IoBagOutline, IoHeartOutline, IoPersonOutline } from "react-icons/io5";
import { LiaShippingFastSolid } from "react-icons/lia";
import { CiLogout } from "react-icons/ci";


const AccountLayout = () => {

    const dispatch = useDispatch();

    return (
        <div>
            <section className='grid grid-cols-4 md:py-12'>
                <div className='col-span-1 bg-gray-50 md:block hidden'>
                    <div className='flex justify-start items-center space-x-4 px-4 py-6 '>
                        <span className='overflow-hidden flex justify-center items-center w-16  h-16 rounded-full bg-gray-400'>
                            <img
                                src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600"
                                alt=""
                                className='object-cover object-center w-full h-full'
                            />
                        </span>
                        <div>
                            <p>
                                <span className='text-lg text-text'>
                                    Jane Doe
                                </span>
                            </p>
                            <Link to={'/logout'}>
                                <span className='text-sm'>Logout</span>
                            </Link>
                        </div>
                    </div>
                    <div className='py-6 '>
                        <ul >
                            <li className="duration-150 hover:bg-gray-200">
                                <Link to={''} className="flex justify-start space-x-2 items-center px-4 py-3 cursor-pointer">
                                    <span className='text-lg'>
                                        <IoPersonOutline />
                                    </span>
                                    <span>Profile</span>
                                </Link>
                            </li>
                            <li className="duration-150 hover:bg-gray-200">
                                <Link to={'myorders'} className="flex justify-start space-x-2 items-center px-4 py-3 cursor-pointer">
                                    <span className='text-lg'>
                                        <LiaShippingFastSolid />
                                    </span>
                                    <span>My Orders</span>
                                </Link>
                            </li>
                            <li className="duration-150 hover:bg-gray-200">
                                <span onClick={() => { dispatch(showCart()) }} className="flex justify-start space-x-2 items-center px-4 py-3 cursor-pointer">
                                    <span className='text-lg'>
                                        <IoBagOutline />
                                    </span>
                                    <span>My cart</span>
                                </span>
                            </li>
                            <li className="duration-150 hover:bg-gray-200">
                                <span onClick={() => { dispatch(showWishlist()) }} className="flex justify-start space-x-2 items-center px-4 py-3 cursor-pointer">
                                    <span className='text-lg'>
                                        <IoHeartOutline />
                                    </span>
                                    <span>My Wishlist</span>
                                </span>
                            </li>
                            <li className="duration-150 hover:bg-gray-200">
                                <Link to={'/logout'} className="flex justify-start space-x-2 items-center px-4 py-3 cursor-pointer">
                                    <span className='text-lg'>
                                        <CiLogout />
                                    </span>
                                    <span>Logout</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='md:col-span-3 col-span-4  bg-gray-100 py-8 px-8'>
                    <Outlet />
                </div>
            </section>
        </div>
    )
}

export default AccountLayout
