import { Dialog, Listbox, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react'
import { IoCloseOutline, IoTrashOutline } from 'react-icons/io5';
import { TbHeartUp } from "react-icons/tb";
import { Link } from 'react-router-dom';

const CartPanel = ({ setCartPanel, cartPanel }) => {

    const cartItems = [
        {
            id: 1,
            title: "AIR JORDAN 1 LOW 'WHITE/BLACK-GREEN GLOW'",
            href: '#',
            color: 'Salmon',
            sp: '$90.00',
            quantity: 1,
            thumbnail: 'https://images.vegnonveg.com/resized/400X328/10792/air-jordan-1-low-whiteblack-green-glow-white-65e5bb6851306.jpg',
            imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
        },
        {
            id: 2,
            title: "OZGAIA 'CLOUD WHITEOFF WHITEALMOST PINK",
            href: '#',
            color: 'Blue',
            sp: '$32.00',
            quantity: 1,
            thumbnail: 'https://images.vegnonveg.com/resized/400X328/10724/ozgaia-cloud-whiteoff-whitealmost-pink-white-65e06b61cb340.jpg',
            imageAlt:
                'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
        },
    ]

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
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
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
                                        <div className="flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl">
                                            <div className="relative px-4 sm:px-6">
                                                <button
                                                    onClick={() => { setCartPanel(false) }}
                                                    className='absolute top-0 right-4 text-text text-2xl'>
                                                    <IoCloseOutline />
                                                </button>
                                                <h1 className='lg:text-5xl text-3xl font-bold text-text uppercase'>Cart</h1>
                                                <div className='pt-8'>
                                                    {/* cart items here */}
                                                    <ul>
                                                        {/* list item */}
                                                        {cartItems.map((product, index) => (
                                                            <li key={product.id} className="flex py-4 border-b px-4 mb-4 rounded-md">
                                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-muted-bg">
                                                                    <img
                                                                        src={product.thumbnail}
                                                                        className="h-full w-full object-contain object-center"
                                                                    />
                                                                </div>

                                                                <div className="ml-4 flex flex-1 flex-col">
                                                                    <div>
                                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                                            <h3>
                                                                                <a href={product.href}>{product.title}</a>
                                                                            </h3>
                                                                            <p className="ml-4">{product.sp}</p>
                                                                        </div>
                                                                        <p className="mt-1 text-sm text-gray-500">SIZE : 7</p>
                                                                        <div className='flex justify-between'>
                                                                            <div className='border border-gray-300 text-center inline-block mt-2'>
                                                                                <Listbox>
                                                                                    <div className="relative">
                                                                                        <Listbox.Button className="relative py-2 px-4 w-full cursor-pointer bg-white text-center text-sm sm:text-xs">
                                                                                            <span className="block truncate">{'Qty'}</span>
                                                                                        </Listbox.Button>
                                                                                        <Transition
                                                                                            as={Fragment}
                                                                                            leave="transition ease-in duration-100"
                                                                                            leaveFrom="opacity-100"
                                                                                            leaveTo="opacity-0"
                                                                                        >
                                                                                            <Listbox.Options className="absolute mt-2 border border-gray-300 max-h-60 min-w-12 w-full overflow-auto shadow-lg bg-white text-base sm:text-sm z-10">
                                                                                                {[1, 2, 3, 4, 5].map((person, personIdx) => (
                                                                                                    <Listbox.Option
                                                                                                        key={personIdx}
                                                                                                        className={({ active, selected }) =>
                                                                                                            `relative cursor-pointer py-2 ${active ? 'bg-muted-bg text-text' : 'text-gray-900'
                                                                                                            } ${selected ? 'bg-muted-bg text-text' : ''}`
                                                                                                        }
                                                                                                        value={person}
                                                                                                    >
                                                                                                        {({ selected }) => (
                                                                                                            <>
                                                                                                                <span
                                                                                                                    className={`block truncate ${selected ? 'font-medium bg-muted-bg' : 'font-normal'
                                                                                                                        }`}
                                                                                                                >
                                                                                                                    {person}
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
                                                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                                                <div className="flex justify-end w-full space-x-2">
                                                                                    <button
                                                                                        type="button"
                                                                                        title='Move to Wishlist'
                                                                                        className="p-2 bg-white rounded-md text-lg text-text hover:bg-muted-bg border border-gray-300 duration-100"
                                                                                    >
                                                                                        <TbHeartUp />
                                                                                    </button>
                                                                                    <button
                                                                                        type="button"
                                                                                        title='Remove from Cart'
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
                                                    <div className="px-4 py-4">
                                                        <div className="flex justify-between text-base font-medium text-text mb-1">
                                                            <p>Total Items</p>
                                                            <p>2</p>
                                                        </div>
                                                        <div className="flex justify-between text-base font-medium text-text">
                                                            <p>Subtotal</p>
                                                            <p className='font-bold'>$262.00</p>
                                                        </div>
                                                        <div className="mt-6">
                                                            <Link
                                                                onClick={() => { setCartPanel(false) }}
                                                                to={'/checkout'}
                                                                className="flex items-center justify-center bg-black text-white py-3 hover:scale-105 duration-150"
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
                                                                    onClick={() => setCartPanel(false)}
                                                                >
                                                                    Continue Shopping
                                                                    <span aria-hidden="true"> &rarr;</span>
                                                                </button>
                                                            </p>
                                                        </div>
                                                    </div>

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
