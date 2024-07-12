import { Dialog, Listbox, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react'
import { IoCloseOutline, IoTrashOutline } from 'react-icons/io5';
import { TbHeartUp } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { filterCartAsync, hideCart } from '../slices/cartSlice';
import CartItemsList from './CartItemsList';
import CartFooter from './CartFooter';


const CartPanel = () => {


    const dispatch = useDispatch()
    const cartShown = useSelector(state => state.cart.shown);
    const cartItems = useSelector(state => state.cart.items);
    const state = useSelector(state => state.cart.state);
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

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
                                        <FilterCartModal isOpen={isOpen} setIsOpen={setIsOpen} />
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
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                if (cartItems.some(el => el.product.stock < 1)) {
                                                                                    setIsOpen(true)
                                                                                } else {
                                                                                    navigate('/checkout');
                                                                                    dispatch(hideCart())
                                                                                }
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

const FilterCartModal = ({ isOpen, setIsOpen }) => {
    const dispatch = useDispatch();
    return (
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-20" onClose={setIsOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                        </div> */}
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                Remove Out of Stock Items
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Your cart contains some items that are currently out of stock, remove them before moving to the checkout page.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                        onClick={() => {
                                            dispatch(filterCartAsync());
                                            setIsOpen(false);
                                        }}
                                    >
                                        Remove
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}