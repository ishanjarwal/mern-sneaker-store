import React, { Fragment } from 'react'
import { deleteFromCartAsync, updateCartAsync } from '../slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux'
import { Listbox, Transition } from '@headlessui/react';
import { TbHeartUp } from 'react-icons/tb';
import { IoTrashOutline } from 'react-icons/io5';
import { addToWishlistAsync } from '../slices/wishlistSlice';
import { DOMAIN } from '../app/constants';




const CartItemsList = () => {
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.cart.items);
    const user = useSelector(state => state.user.currUser);


    function updateCart({ item_id, data }) {
        dispatch(updateCartAsync({ item_id, data }));
    }
    return (
        <ul>
            {/* list item */}
            {cartItems && cartItems.map((item, index) => (
                <li key={index} className={`${item.product.stock < 1 ? "border border-red-600 bg-red-50" : ""}  rounded-lg py-4 px-4 mb-4`}>
                    <div className="flex">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-muted-bg">
                            <img
                                src={`${DOMAIN}/uploads/product_images/${item.product.thumbnail}`}
                                className="h-full w-full object-contain object-center"
                            />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                            <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3 className='lg:text-md text-sm '>
                                        <span>{item.product.name.slice(0, 28).concat(" ...")}</span>
                                    </h3>
                                    <p className="ml-4">
                                        {
                                            new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })
                                                .format(item.product.sp)
                                        }
                                    </p>
                                </div>
                                <div className='flex justify-between flex-wrap space-y-2'>
                                    <div className='flex justify-start items-center space-x-2 me-2'>

                                        {/* SIZE */}
                                        <div className='border border-gray-300 text-center inline-block mt-2'>
                                            <Listbox value={item.size._id}
                                                onChange={(value) => {
                                                    const modifiedData = {
                                                        product_id: item.product._id,
                                                        oldSize: item.size._id,
                                                        oldQty: item.qty,
                                                        size: value,
                                                        qty: item.qty
                                                    }
                                                    updateCart({ item_id: item.id, data: modifiedData });
                                                }}>
                                                <div className="relative">
                                                    <Listbox.Button className="relative py-2 px-4 w-full cursor-pointer bg-white text-center text-sm sm:text-xs">
                                                        <span className="block truncate">{'Size : '}{item.size.label}</span>
                                                    </Listbox.Button>
                                                    <Transition
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options className="absolute z-10 mt-2 border border-gray-300 max-h-60 min-w-12 w-full overflow-auto shadow-lg bg-white text-base sm:text-sm">
                                                            {item.product.sizes.map((size, idx) => (
                                                                <Listbox.Option
                                                                    key={idx}
                                                                    className={({ active, selected }) =>
                                                                        `relative cursor-pointer py-2 ${active ? 'bg-muted-bg text-text' : 'text-gray-900'
                                                                        } ${selected ? 'bg-muted-bg text-text' : ''}`
                                                                    }
                                                                    value={size._id}
                                                                >
                                                                    {({ selected }) => (
                                                                        <>
                                                                            <span
                                                                                className={`block truncate ${selected ? 'font-medium bg-muted-bg' : 'font-normal'
                                                                                    }`}
                                                                            >
                                                                                {size.label}
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
                                            <Listbox value={item.qty} onChange={(value) => {
                                                const modifiedData = {
                                                    product_id: item.product._id,
                                                    oldSize: item.size._id,
                                                    oldQty: item.qty,
                                                    size: item.size._id,
                                                    qty: value
                                                }
                                                updateCart({ item_id: item.id, data: modifiedData });
                                            }}>
                                                <div className="relative">
                                                    <Listbox.Button className="relative py-2 px-4 w-full cursor-pointer bg-white text-center text-sm sm:text-xs">
                                                        <span className="block truncate">{'Qty : '}{item.qty}</span>
                                                    </Listbox.Button>
                                                    <Transition
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options className="absolute mt-2 border border-gray-300 max-h-60 min-w-12 w-full overflow-auto shadow-lg bg-white text-base sm:text-sm z-10">
                                                            {Array.from({ length: item.product.stock }).map((_, idx) => (
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
                                                title='Move to Wishlist'
                                                className="p-2 bg-white rounded-md text-lg text-text hover:bg-muted-bg border border-gray-300 duration-100"
                                                onClick={() => {
                                                    dispatch(deleteFromCartAsync({ user_id: user._id, product_id: item.product._id, size: item.size._id }))
                                                    dispatch(addToWishlistAsync({ user_id: user._id, product_id: item.product._id }))
                                                }}
                                            >
                                                <TbHeartUp />
                                            </button>
                                            <button
                                                title='Remove from Cart'
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    dispatch(deleteFromCartAsync(item.id))
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
                    </div>
                    {item.product.stock < 1 && <p className='text-xs mt-2 text-end text-red-500'>Out of Stock</p>}
                </li>
            ))}
        </ul>
    )
}

export default CartItemsList
