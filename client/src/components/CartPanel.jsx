import { Dialog, Listbox, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react'
import { IoCloseOutline, IoTrashOutline } from 'react-icons/io5';
import { TbHeartUp } from "react-icons/tb";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { hideCart } from '../slices/cartSlice';
import CartItemsList from './CartItemsList';
import CartFooter from './CartFooter';


const CartPanel = () => {


    const dispatch = useDispatch()
    const cartShown = useSelector(state => state.cart.shown);
    const cartItems = useSelector(state => state.cart.items);
    const state = useSelector(state => state.cart.state)

    return (
        <div>
            <Transition.Root show={cartShown} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => { dispatch(hideCart()) }}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto relative w-screen max-w-lg">
                                        {/* preloader */}
                                        {state == 'pending' && (
                                            <div className='absolute z-50 bg-white/25 backdrop-blur-sm h-screen w-full top-0 left-0 flex justify-center items-center'>
                                                Loading
                                            </div>
                                        )}
                                        <div className="relative flex h-full max-h-screen  overflow-y-auto flex-col bg-white py-6 shadow-xl">
                                            <div className="relative px-4 sm:px-6">
                                                <button
                                                    onClick={() => { dispatch(hideCart()) }}
                                                    className='absolute top-0 right-4 text-text text-2xl'>
                                                    <IoCloseOutline />
                                                </button>
                                                <div>
                                                    <h1 className='lg:text-5xl text-3xl font-bold text-text uppercase'>Cart</h1>
                                                    {cartItems.length > 0 ? (
                                                        <div className='pt-8 flex flex-col'>
                                                            {/* cart items here */}
                                                            <CartItemsList />




                                                            {/* cart footer */}
                                                            <div>
                                                                <CartFooter />
                                                                <div>
                                                                    <div className="mt-6">
                                                                        <Link
                                                                            onClick={() => {
                                                                                dispatch(hideCart())
                                                                            }}
                                                                            to={'/checkout'}
                                                                            className="w-full flex items-center justify-center bg-black text-white py-3 hover:scale-105 duration-150"
                                                                        >
                                                                            Checkout
                                                                        </Link>
                                                                    </div>
                                                                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                                        <p>
                                                                            or{' '}
                                                                            <button
                                                                                type="button"
                                                                                className="font-medium text-muted-text underline"
                                                                                onClick={() => dispatch(hideCart())}
                                                                            >
                                                                                Continue Shopping
                                                                                <span aria-hidden="true"> &rarr;</span>
                                                                            </button>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    ) : (
                                                        <div className='mt-32'>
                                                            <h1 className='text-xl font-bold mx-auto text-center'>
                                                                😔 Your Bag is Empty. Fill it Quick.
                                                            </h1>
                                                            <button
                                                                className='mt-8 text-muted-text mx-auto text-center block hover:underline hover:text-text'
                                                                onClick={() => {
                                                                    dispatch(hideCart())
                                                                }}
                                                            >
                                                                Continue Shopping →
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    )
}

export default CartPanel
