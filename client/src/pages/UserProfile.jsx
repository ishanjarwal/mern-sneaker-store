import React, { Fragment, useEffect, useState } from 'react'
import { Form, Link, useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { showCart } from "../slices/cartSlice"
import { showWishlist } from "../slices/wishlistSlice"
import { IoBagOutline, IoHeartOutline, IoPersonOutline, IoTrashBinOutline, IoTrashOutline } from "react-icons/io5";
import { LiaShippingFastSolid } from "react-icons/lia";
import { LuPencil } from "react-icons/lu";
import { Controller, useForm } from 'react-hook-form'
import { Dialog, Transition } from '@headlessui/react'
import { checkAuthAsync, deleteUserAddressAsync, setCurrAddress, setPasswordResetTokenAsync, updateUserAddressAsync, updateUserAsync } from '../slices/userSlice'
import axios from 'axios'
import AddressFormModal from '../components/AddressFormModal'



const UserProfile = () => {


    const dispatch = useDispatch();
    const user = useSelector(state => state.user.currUser);
    const { register, handleSubmit, formState: { errors }, control, watch, setValue, getValues } = useForm();

    const [formActionType, setFormActionType] = useState(null);
    function sendData(data) {
        dispatch(updateUserAsync({ user_id: user._id, data }))
    }

    return (
        <div>
            <AddressFormModal formActionType={formActionType} setFormActionType={setFormActionType} />
            <h1 className='text-3xl font-semibold mb-12'>Your Profile</h1>
            {user && (
                <form onSubmit={handleSubmit(data => { sendData(data) })}>
                    <div className='max-w-xl grid grid-cols-2 gap-4'>
                        <div className="col-span-1 relative z-0 w-full mb-5 group">
                            <Controller
                                name="fname"
                                control={control}
                                defaultValue={user.fullname.split(" ")[0]} // Set initial value from state
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 appearance-none  focus:outline-none focus:ring-0 border-gray-300 focus:border-black peer"
                                        placeholder=" "
                                        required=""
                                    />
                                )}
                            />
                            <label
                                className="peer-focus:font-medium absolute text-sm text-muted-text duration-300 transform -translate-y-8 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 start-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 cursor-text pointer-events-none"
                            >
                                First Name
                            </label>
                            {errors?.fname && (
                                <span className='text-red-400 text-xs'>{errors.fname.message}</span>
                            )}
                        </div>
                        <div className="col-span-1 relative z-0 w-full mb-5 group">
                            <Controller
                                name="lname"
                                control={control}
                                defaultValue={user.fullname.split(" ")[1]} // Set initial value from state
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 appearance-none  focus:outline-none focus:ring-0 border-gray-300 focus:border-black peer"
                                        placeholder=" "
                                        required=""
                                    />
                                )}
                            />
                            <label
                                className="peer-focus:font-medium absolute text-sm text-muted-text duration-300 transform -translate-y-8 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 start-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 cursor-text pointer-events-none"
                            >
                                Last Name
                            </label>
                            {errors?.lname && (
                                <span className='text-red-400 text-xs'>{errors.lname.message}</span>
                            )}
                        </div>
                        <div className="col-span-2 relative z-0 w-full mb-2 group">
                            <Controller
                                name="email"
                                control={control}
                                defaultValue={user.email} // Set initial value from state
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="email"
                                        className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 appearance-none  focus:outline-none focus:ring-0 border-gray-300 focus:border-black peer"
                                        placeholder=" "
                                        required=""
                                    />
                                )}
                            />
                            <label
                                className="peer-focus:font-medium absolute text-sm text-muted-text duration-300 transform -translate-y-8 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 start-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 cursor-text pointer-events-none"
                            >
                                Email
                            </label>
                            {errors?.email && (
                                <span className='text-red-400 text-xs'>{errors.email.message}</span>
                            )}
                        </div>
                        <div className="col-span-2 relative z-0 w-full mb-5 flex justify-end">
                            <button
                                onClick={() => {
                                    // e.preventDefault();
                                    // update user details
                                }}
                                className='rounded-lg bg-black text-white px-4 py-2 text-sm'>
                                Save Changes
                            </button>
                        </div>
                        <span className='col-span-2 mb-8 border-b-2 border-dashed border-gray-300'>

                        </span>
                        <div className="col-span-1 relative z-0 w-full mb-5 group">

                            <input
                                type="password"
                                disabled
                                className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 appearance-none  focus:outline-none focus:ring-0 border-gray-300 focus:border-black peer"
                                placeholder="********"
                            />

                            <label
                                className="absolute text-sm text-muted-text duration-300 transform -translate-y-8 scale-75 top-3 z-10 origin-[0] pointer-events-none"
                            >
                                Password
                            </label>
                            {errors?.password && (
                                <span className='text-red-400 text-xs'>{errors.password.message}</span>
                            )}
                        </div>
                        <div className="col-span-1 relative z-0 w-full mb-5 flex justify-start">
                            <button
                                onClick={(e) => {
                                    e.preventDefault()
                                    dispatch(setPasswordResetTokenAsync());
                                }}
                                className='rounded-lg bg-black text-white px-4 py-2 text-sm'
                            >
                                Change
                            </button>
                        </div>

                        <span className='col-span-2 mb-8 mt-8 border-b-2 border-dashed border-gray-300'> </span>

                        {/* addresses */}
                        <div className='col-span-2'>
                            <h1 className='text-2xl mb-8'>Saved Addresses</h1>
                            <div className=''>
                                {/* <div className="flex w-full items-start justify-start bg-white px-4 py-8 rounded-md mb-4">
                                <h2 className='text-lg text-center mx-auto'>You don't have any saved addresses</h2>
                            </div> */}
                                {user.addresses.map((address, index) => (
                                    <div key={index} className="flex w-full items-start justify-start bg-white px-4 py-2 rounded-md mb-4">
                                        <div className='flex-1'>
                                            <h2 className='text-lg font-semibold'>{address.first_name}{" "}{address.last_name}</h2>
                                            <h3 className='text-sm font-semibold'>{'+91 '}{address.phone}</h3>
                                            <div>
                                                <span>{address.plot_no}</span>
                                                {' '}
                                                <span>{address.address_line_1}</span>
                                                {', '}
                                                <span>{address.address_line_2}</span>
                                            </div>
                                            <div>
                                                <span>{address.city}</span>
                                                {', '}
                                                <span>{address.state}</span>
                                            </div>
                                            <div>{address.pincode}</div>
                                        </div>
                                        <div className='flex justify-end space-x-2'>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setFormActionType("update");
                                                    dispatch(setCurrAddress(address));
                                                }}
                                                type="button"
                                                title='Edit Address'
                                                className="p-2 bg-white rounded-md text-lg text-muted-text hover:bg-muted-bg border border-gray-300 duration-100"
                                            >
                                                <LuPencil />
                                            </button>
                                            <button
                                                type="button"
                                                title='Remove Address'
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    dispatch(deleteUserAddressAsync(address._id))
                                                }}
                                                className="p-2 bg-white rounded-md text-lg text-red-400 hover:bg-muted-bg border border-gray-300 duration-100"
                                            >
                                                <IoTrashBinOutline />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <div className='flex justify-end'>
                                    <button
                                        className='rounded-lg bg-black text-white px-4 py-2 text-sm'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            dispatch(setCurrAddress(null))
                                            setFormActionType("add");
                                        }}
                                    >
                                        Add New
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            )}
        </div>
    )
}

export default UserProfile
