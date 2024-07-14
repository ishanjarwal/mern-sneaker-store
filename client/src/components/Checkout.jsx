import { Dialog, Listbox, RadioGroup, Transition } from '@headlessui/react'
import React, { Fragment, useEffect, useState } from 'react'
import { IoAddOutline, IoTrashOutline } from 'react-icons/io5'
import { FaCheck } from "react-icons/fa6";
import { LuPencil } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartAsync, updateCartAsync } from '../slices/cartSlice';
import CartItemsList from './CartItemsList';
import CartFooter from './CartFooter';
import AddressFormModal from './AddressFormModal';
import { deleteUserAddressAsync, setCurrAddress } from '../slices/userSlice';
import { Navigate } from 'react-router-dom'

const Checkout = () => {

    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const cartShown = useSelector(state => state.cart.shown);
    const state = useSelector(state => state.cart.state)
    const [formActionType, setFormActionType] = useState(null);
    const user = useSelector(state => state.user.currUser);

    function updateCart(data) {
        dispatch(updateCartAsync({ user_id: user._id, data: data }));
    }
    useEffect(() => {
        if (user) {
            dispatch(fetchCartAsync());
        }
    }, [dispatch, cartShown]);
    useEffect(() => {
        if (state == 'fulfilled' && user) {
            dispatch(fetchCartAsync());
        }
    }, [dispatch, state]);

    return (
        <div className='py-12'>
            <div className='grid grid-cols-8 bg-muted-bg px-8 pt-12 pb-8 gap-4'>
                <div className='col-span-5'>
                    <div>
                        {/* saved addresses */}
                        <h1 className='text-2xl font-bold text-text mb-2'>Your Addresses</h1>
                        <div>
                            <RadioGroup>
                                <div className="flex flex-wrap">
                                    {user.addresses.map((address) => (
                                        <RadioGroup.Option
                                            key={address._id}
                                            value={address._id}
                                            className={({ active, checked }) =>
                                                `${checked ? 'bg-white ring-2 ring-offset-1 ring-blue-500' : 'bg-white text-texts'}
                                                relative flex cursor-pointer rounded-lg px-6 py-4 me-2 mb-4 w-full`
                                            }
                                        >
                                            {({ active, checked }) => (
                                                <>
                                                    <div className="flex w-full items-start justify-start">
                                                        <div>
                                                            {checked &&
                                                                (<span className='block text-gray-400 pt-2 pe-2'>
                                                                    <FaCheck />
                                                                </span>)
                                                            }
                                                        </div>
                                                        <div className='flex-1'>
                                                            <h2 className='text-lg font-bold'>{address.fullname}</h2>
                                                            <h3 className='text-sm font-bold'>{'+91 '}{address.phone}</h3>
                                                            <div>
                                                                <span>{address.flat}</span>
                                                                {' '}
                                                                <span>{address.street}</span>
                                                            </div>
                                                            <div>
                                                                <span>{address.city}</span>
                                                                {' '}
                                                                <span>{address.state}</span>
                                                            </div>
                                                            <div>{address.postal}</div>
                                                        </div>
                                                        <div className='flex justify-end space-x-2'>
                                                            <button
                                                                onClick={() => {
                                                                    dispatch(setCurrAddress(address))
                                                                    setFormActionType("update");
                                                                }}
                                                                className="p-2 bg-white rounded-md text-lg text-muted-text hover:bg-muted-bg border border-gray-300 duration-100"
                                                            >
                                                                <LuPencil />
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    dispatch(deleteUserAddressAsync(address._id))
                                                                }}
                                                                className="p-2 bg-white rounded-md text-lg text-red-400 hover:bg-muted-bg border border-gray-300 duration-100"
                                                            >
                                                                <IoTrashOutline />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </RadioGroup.Option>
                                    ))}
                                </div>
                            </RadioGroup>
                        </div>
                    </div>
                    <div className='max-w-xl'>
                        {/* new addresses */}
                        <button
                            onClick={() => {
                                dispatch(setCurrAddress(null))
                                setFormActionType("add")
                            }}
                            className='text-white bg-black py-2 rounded-lg px-8 flex justify-center items-center space-x-1 duration-150 hover:scale-105' >
                            <span>Add Address</span>
                            <span className='text-lg'><IoAddOutline /></span>
                        </button>

                    </div>
                </div>
                <div className='col-span-3 bg-white pt-4'>
                    {/* cart mockup */}
                    <div className='sticky top-0'>
                        <h1 className='text-text font-bold text-3xl mb-2 px-4'>Order Summary</h1>
                        <div className='px-4 py-4'>
                            <div>
                                <CartItemsList />
                            </div>

                            {/* cart footer */}
                            <div>
                                <CartFooter />
                                <div>
                                    <div className="mt-6">
                                        <button
                                            type='submit'
                                            onClick={(e) => {
                                                e.preventDefault();
                                            }}
                                            // to={'/checkout'}
                                            className="w-full flex items-center justify-center bg-black text-white py-4 group rounded-full"
                                        >
                                            <span className='group-hover:scale-110 duration-150'>
                                                Place Order
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >


            {/* form modal */}
            <AddressFormModal formActionType={formActionType} setFormActionType={setFormActionType} />
            {/* <Transition.Root show={formModal} as={Fragment}>
                <Dialog as="div" className="relative z-20" onClose={setFormModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/75 backdrop-blur-md bg-opacity-75 transition-opacity" />
                    </Transition.Child>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center">
                            <Dialog.Panel className='relative'>
                                <div className='py-4 bg-white px-4 max-w-2xl mx-auto rounded-lg'>
                                    <form>
                                        <h2 className='mb-1 text-text text-lg'>Add a New Address</h2>
                                        <div className='grid grid-cols-2 gap-2'>
                                            <div className='col-span-1'>
                                                <label htmlFor="fname" className='text-sm mb-1 text-muted-text'>First Name</label>
                                                <input
                                                    className='w-full py-2 text-sm px-3 rounded-md border border-gray-500 focus:ring-2 focus:ring-offset-1 focus:ring-muted-text'
                                                    type="text"
                                                    id='fname'
                                                    name='fname'
                                                />
                                            </div>
                                            <div className='col-span-1'>
                                                <label htmlFor="lname" className='text-sm mb-1 text-muted-text'>Last Name</label>
                                                <input
                                                    className='w-full py-2 text-sm px-3 rounded-md border border-gray-500 focus:ring-2 focus:ring-offset-1 focus:ring-muted-text'
                                                    type="text"
                                                    id='lname'
                                                    name='lname'
                                                />
                                            </div>
                                        </div>
                                        <div className='grid grid-cols-2 gap-2 mt-6'>
                                            <div className='col-span-1'>
                                                <label htmlFor="mobile" className='text-sm mb-1 text-muted-text'>Phone</label>
                                                <input
                                                    className='w-full py-2 text-sm px-3 rounded-md border border-gray-500 focus:ring-2 focus:ring-offset-1 focus:ring-muted-text [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                                    type="number"
                                                    id='mobile'
                                                    name='mobile'
                                                />
                                            </div>
                                            <div className='col-span-1'>
                                                <label htmlFor="email" className='text-sm mb-1 text-muted-text'>E-mail</label>
                                                <input
                                                    className='w-full py-2 text-sm px-3 rounded-md border border-gray-500 focus:ring-2 focus:ring-offset-1 focus:ring-muted-text'
                                                    type="email"
                                                    id='email'
                                                    name='email'
                                                />
                                            </div>
                                        </div>
                                        <div className='mt-6'>
                                            <div>
                                                <label htmlFor="flat_plot_no" className='text-sm mb-1 text-muted-text'>Flat/Plot No.</label>
                                                <input
                                                    className='w-full py-2 text-sm px-3 rounded-md border border-gray-500 focus:ring-2 focus:ring-offset-1 focus:ring-muted-text [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                                    type="number"
                                                    id='flat_plot_no'
                                                    name='flat_plot_no'
                                                />
                                            </div>
                                        </div>
                                        <div className='mt-6'>
                                            <div>
                                                <label htmlFor="street" className='text-sm mb-1 text-muted-text'>Street/Locality</label>
                                                <input
                                                    className='w-full py-2 text-sm px-3 rounded-md border border-gray-500 focus:ring-2 focus:ring-offset-1 focus:ring-muted-text [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                                    type="number"
                                                    id='street'
                                                    name='street'
                                                />
                                            </div>
                                        </div>
                                        <div className='grid grid-cols-3 gap-2 mt-6'>
                                            <div className='col-span-1'>
                                                <label htmlFor="city" className='text-sm mb-1 text-muted-text'>City/District</label>
                                                <input
                                                    className='w-full py-2 text-sm px-3 rounded-md border border-gray-500 focus:ring-2 focus:ring-offset-1 focus:ring-muted-text [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                                    type="number"
                                                    id='city'
                                                    name='city'
                                                />
                                            </div>
                                            <div className='col-span-1'>
                                                <label htmlFor="state" className='text-sm mb-1 text-muted-text'>State</label>
                                                <input
                                                    className='w-full py-2 text-sm px-3 rounded-md border border-gray-500 focus:ring-2 focus:ring-offset-1 focus:ring-muted-text'
                                                    type="text"
                                                    id='state'
                                                    name='state'
                                                />
                                            </div>
                                            <div className='col-span-1'>
                                                <label htmlFor="postal_code" className='text-sm mb-1 text-muted-text'>Postal Code</label>
                                                <input
                                                    className='w-full py-2 text-sm px-3 rounded-md border border-gray-500 focus:ring-2 focus:ring-offset-1 focus:ring-muted-text [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                                    type="number"
                                                    id='postal_code'
                                                    name='postal_code'
                                                />
                                            </div>
                                        </div>
                                        <div className='flex justify-end space-x-2 mt-8 pt-4 border-t border-gray-300'>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setFormModal(false)
                                                }}
                                                className='py-2 px-3 text-text rounded-md border border-text text-sm hover:bg-muted-bg '
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className='py-2 px-3 text-white rounded-md bg-black text-sm hover:bg-zinc-800'
                                            >
                                                Save Address
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root> */}


        </div >
    )
}

export default Checkout
