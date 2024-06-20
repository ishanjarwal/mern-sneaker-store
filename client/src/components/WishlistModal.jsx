import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react'
import { IoBagAddOutline, IoCloseOutline, IoTerminalSharp, IoTrashOutline } from 'react-icons/io5';
import { deleteFromWishlistAsync, hideWishlist } from '../slices/wishlistSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const WishlistModal = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.currUser);
    const wishlistShown = useSelector(state => state.wishlist.shown);
    const wishlistItems = useSelector(state => state.wishlist.items);


    return (
        <Transition.Root show={wishlistShown} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => { dispatch(hideWishlist()) }}>
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
                            <Dialog.Panel className="relative w-full max-w-2xl transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8">
                                <div className='py-4 bg-white px-4 mx-auto rounded-lg'>
                                    <div className='flex justify-between items-center pb-2 border-b border-gray-300'>
                                        <h2 className='text-2xl font-bold'>❤️ Your Wishlist</h2>
                                        <button
                                            className='p-2 text-2xl'
                                            onClick={() => { dispatch(hideWishlist()) }}
                                        >
                                            <span>
                                                <IoCloseOutline />
                                            </span>
                                        </button>
                                    </div>
                                    <div>
                                        {wishlistItems.length == 0 && (
                                            <h3 className='py-12 text-xl font-bold text-center'>
                                                😔Your wishlist is empty.
                                            </h3>
                                        )}
                                        {/* wishlist card */}
                                        <div className='grid grid-cols-2 gap-2 pt-4'>
                                            {wishlistItems.length > 0 && wishlistItems.map((item, index) => (
                                                <div key={index} className="md:col-span-1 col-span-2 flex p-4 border border-gray-300 rounded-lg">
                                                    <Link to={`/product/${item._id}`}>
                                                        <div className="h-24 w-24 flex-shrink-0 rounded-md overflow-hidden bg-muted-bg">
                                                            <img
                                                                src={`http://localhost:8080/uploads/product_images/${item.thumbnail}`}
                                                                alt={item.name}
                                                                className="w-full object-contain object-center"
                                                            />
                                                        </div>
                                                    </Link>

                                                    <div className="ml-4 flex flex-1 flex-col">
                                                        <div>
                                                            <div className="font-medium text-gray-900">
                                                                <h3>
                                                                    <Link to={`/product/${item._id}`}>{item.name.slice(0, 29).concat("...")}</Link>
                                                                </h3>
                                                                <div>
                                                                    <p>
                                                                        <span className='line-through text-xs text-muted-text'>
                                                                            {
                                                                                new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })
                                                                                    .format(item.mrp)
                                                                            }
                                                                        </span>
                                                                        {' '}
                                                                        <span className='text-xs text-red-400'>{item.discountPercentage}% off</span>
                                                                    </p>
                                                                    <p>
                                                                        {
                                                                            new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })
                                                                                .format(item.sp)
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-1 items-end justify-between text-sm">
                                                            <div className="flex justify-end w-full space-x-2">
                                                                {/* <button
                                                                    type="button"
                                                                    title='Add to Cart'
                                                                    className="p-2 bg-white rounded-md text-lg text-text hover:bg-muted-bg border border-gray-300 duration-100"
                                                                >
                                                                    <IoBagAddOutline />
                                                                </button> */}
                                                                <button
                                                                    onClick={() => {
                                                                        dispatch(deleteFromWishlistAsync({ user_id: user._id, product_id: item._id }))
                                                                    }}
                                                                    title='Remove from Wishlist'
                                                                    className="p-2 bg-white rounded-md text-lg text-red-400 hover:bg-muted-bg border border-gray-300 duration-100"
                                                                >
                                                                    <IoTrashOutline />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default WishlistModal
