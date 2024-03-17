import { Dialog, Listbox, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react'
import { IoCloseOutline, IoTrashOutline } from 'react-icons/io5';
import { TbHeartUp } from "react-icons/tb";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { fetchCartAsync, updateCartAsync } from '../slices/cartSlice';
import { MAX_CART_PRODUCT_QTY } from '../app/constants';
import { Controller, useForm } from 'react-hook-form';

const CartPanel = ({ setCartPanel, cartPanel }) => {

    const { handleSubmit, formState: { errors }, control, watch, setValue } = useForm();

    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.cart.items);
    const state = useSelector(state => state.cart.state)
    const userId = 1;
    const [userCart, setUserCart] = useState([]);

    useEffect(() => {
        dispatch(fetchCartAsync(userId));
    }, [state]);

    useEffect(() => {
        setUserCart(cartItems);
    }, [cartItems]);


    function goToCheckout(data) {
        console.log(data)
    }

    function updateCart(data) {
        const sendable = data.map((el, index) => (
            {
                pid: el.product.id,
                qty: el.qty,
                size: el.size
            }
        ))
        dispatch(updateCartAsync({ uid: userId, data: sendable }));
    }

    return (
        <div>
            <Transition.Root show={cartPanel} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => { setCartPanel(false) }}>
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
                                    <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                                        <div className="flex h-full max-h-screen  overflow-y-auto flex-col bg-white py-6 shadow-xl">
                                            <div className="relative px-4 sm:px-6">
                                                <button
                                                    onClick={() => { setCartPanel(false) }}
                                                    className='absolute top-0 right-4 text-text text-2xl'>
                                                    <IoCloseOutline />
                                                </button>
                                                <div>
                                                    <h1 className='lg:text-5xl text-3xl font-bold text-text uppercase'>Cart</h1>
                                                    {cartItems.length > 0 ? (
                                                        <div className='pt-8 flex flex-col overflow-y-auto'>
                                                            {/* cart items here */}
                                                            <ul className='overflow-y-auto'>
                                                                {/* list item */}
                                                                {cartItems.map((item, index) => (
                                                                    <li key={index} className="flex py-4 border-b px-4 mb-4 rounded-md">
                                                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-muted-bg">
                                                                            <img
                                                                                src={item.product.images[0]}
                                                                                className="h-full w-full object-contain object-center"
                                                                            />
                                                                        </div>

                                                                        <div className="ml-4 flex flex-1 flex-col">
                                                                            <div>
                                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                                    <h3>
                                                                                        <span>{item.product.name}</span>
                                                                                    </h3>
                                                                                    <p className="ml-4">
                                                                                        {
                                                                                            new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })
                                                                                                .format(item.sp)
                                                                                        }
                                                                                    </p>
                                                                                </div>
                                                                                <div className='flex justify-between flex-wrap space-y-2'>
                                                                                    <div className='flex justify-start items-center space-x-2 me-2'>

                                                                                        {/* SIZE */}
                                                                                        <div className='border border-gray-300 text-center inline-block mt-2'>
                                                                                            <Listbox value={item?.size} onChange={(value) => {
                                                                                                const modifiedData = [...cartItems.toSpliced(index, 1, { ...cartItems[index], size: value })];
                                                                                                updateCart(modifiedData);
                                                                                            }}>
                                                                                                <div className="relative">
                                                                                                    <Listbox.Button className="relative py-2 px-4 w-full cursor-pointer bg-white text-center text-sm sm:text-xs">
                                                                                                        <span className="block truncate">{'Size : '}{item?.size}</span>
                                                                                                    </Listbox.Button>
                                                                                                    <Transition
                                                                                                        as={Fragment}
                                                                                                        leave="transition ease-in duration-100"
                                                                                                        leaveFrom="opacity-100"
                                                                                                        leaveTo="opacity-0"
                                                                                                    >
                                                                                                        <Listbox.Options className="absolute mt-2 border border-gray-300 max-h-60 min-w-12 w-full overflow-auto shadow-lg bg-white text-base sm:text-sm z-10">
                                                                                                            {item.product.sizes.map((size, idx) => (
                                                                                                                <Listbox.Option
                                                                                                                    key={idx}
                                                                                                                    className={({ active, selected }) =>
                                                                                                                        `relative cursor-pointer py-2 ${active ? 'bg-muted-bg text-text' : 'text-gray-900'
                                                                                                                        } ${selected ? 'bg-muted-bg text-text' : ''}`
                                                                                                                    }
                                                                                                                    value={size.size}
                                                                                                                >
                                                                                                                    {({ selected }) => (
                                                                                                                        <>
                                                                                                                            <span
                                                                                                                                className={`block truncate ${selected ? 'font-medium bg-muted-bg' : 'font-normal'
                                                                                                                                    }`}
                                                                                                                            >
                                                                                                                                {size.size}
                                                                                                                            </span>
                                                                                                                        </>
                                                                                                                    )}
                                                                                                                </Listbox.Option>
                                                                                                            ))}
                                                                                                        </Listbox.Options>
                                                                                                    </Transition>
                                                                                                </div>
                                                                                            </Listbox>
                                                                                        </div>

                                                                                        {/* QUANTITY */}
                                                                                        <div className='border border-gray-300 text-center inline-block mt-2'>
                                                                                            <Listbox value={item?.qty} onChange={(value) => {
                                                                                                const modifiedData = [...cartItems.toSpliced(index, 1, { ...cartItems[index], qty: value })];
                                                                                                updateCart(modifiedData);
                                                                                            }}>
                                                                                                <div className="relative">
                                                                                                    <Listbox.Button className="relative py-2 px-4 w-full cursor-pointer bg-white text-center text-sm sm:text-xs">
                                                                                                        <span className="block truncate">{'Qty : '}{userCart[index]?.qty}</span>
                                                                                                    </Listbox.Button>
                                                                                                    <Transition
                                                                                                        as={Fragment}
                                                                                                        leave="transition ease-in duration-100"
                                                                                                        leaveFrom="opacity-100"
                                                                                                        leaveTo="opacity-0"
                                                                                                    >
                                                                                                        <Listbox.Options className="absolute mt-2 border border-gray-300 max-h-60 min-w-12 w-full overflow-auto shadow-lg bg-white text-base sm:text-sm z-10">
                                                                                                            {Array.from({ length: MAX_CART_PRODUCT_QTY }).map((_, idx) => (
                                                                                                                <Listbox.Option
                                                                                                                    key={idx}
                                                                                                                    className={({ active, selected }) =>
                                                                                                                        `relative cursor-pointer py-2 ${active ? 'bg-muted-bg text-text' : 'text-gray-900'
                                                                                                                        } ${selected ? 'bg-muted-bg text-text' : ''}`
                                                                                                                    }
                                                                                                                    value={idx + 1}
                                                                                                                >
                                                                                                                    {({ selected }) => (
                                                                                                                        <>
                                                                                                                            <span
                                                                                                                                className={`block truncate ${selected ? 'font-medium bg-muted-bg' : 'font-normal'
                                                                                                                                    }`}
                                                                                                                            >
                                                                                                                                {idx + 1}
                                                                                                                            </span>
                                                                                                                        </>
                                                                                                                    )}
                                                                                                                </Listbox.Option>
                                                                                                            ))}
                                                                                                        </Listbox.Options>
                                                                                                    </Transition>
                                                                                                </div>
                                                                                            </Listbox>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="flex items-end text-sm">
                                                                                        <div className="flex space-x-2">
                                                                                            <button
                                                                                                type="button"
                                                                                                title='Move to Wishlist'
                                                                                                className="p-2 bg-white rounded-md text-lg text-text hover:bg-muted-bg border border-gray-300 duration-100"
                                                                                            >
                                                                                                <TbHeartUp />
                                                                                            </button>
                                                                                            <button
                                                                                                title='Remove from Cart'
                                                                                                onClick={() => {
                                                                                                    const modifiedData = [...cartItems.toSpliced(index, 1)];
                                                                                                    updateCart(modifiedData);
                                                                                                }}
                                                                                                className="p-2 bg-white rounded-md text-lg text-red-400 hover:bg-muted-bg border border-gray-300 duration-100"
                                                                                            >
                                                                                                <IoTrashOutline />
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                ))}
                                                            </ul>

                                                            {/* cart footer */}
                                                            <div className="flex-1 px-4 py-4 w-full bg-white">
                                                                <div className="flex justify-between text-base font-medium text-text mb-1">
                                                                    <p>Total Items</p>
                                                                    <p>
                                                                        {cartItems.reduce((acc, curr) => { return (acc + curr.qty) }, 0)}
                                                                    </p>
                                                                </div>
                                                                <div className="flex justify-between text-base font-medium text-text mb-1">
                                                                    <p>Shipping Charges</p>
                                                                    <p className='text-sm font-normal text-muted-text'>
                                                                        (Calculated at Checkout)
                                                                    </p>
                                                                </div>
                                                                <div className="flex justify-between text-base font-medium text-text mb-4">
                                                                    <p>GST</p>
                                                                    <p className='text-sm font-normal text-muted-text'>
                                                                        (Inclusive)
                                                                    </p>
                                                                </div>
                                                                <div className="flex justify-between text-xl font-bold text-text">
                                                                    <p>Subtotal</p>
                                                                    <p className='font-bold'>
                                                                        {
                                                                            new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })
                                                                                .format(cartItems.reduce((acc, curr) => (acc + (curr.qty * curr.sp)), 0))
                                                                        }
                                                                    </p>
                                                                </div>
                                                                <div className="mt-6">
                                                                    <button
                                                                        type='submit'
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            setCartPanel(false)
                                                                            console.log(userCart)
                                                                        }}
                                                                        // to={'/checkout'}
                                                                        className="w-full flex items-center justify-center bg-black text-white py-3 hover:scale-105 duration-150"
                                                                    >
                                                                        Checkout
                                                                    </button>
                                                                </div>
                                                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                                    <p>
                                                                        or{' '}
                                                                        <button
                                                                            type="button"
                                                                            className="font-medium text-muted-text underline"
                                                                            onClick={() => setCartPanel(false)}
                                                                        >
                                                                            Continue Shopping
                                                                            <span aria-hidden="true"> &rarr;</span>
                                                                        </button>
                                                                    </p>
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
                                                                    setCartPanel(false)
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
