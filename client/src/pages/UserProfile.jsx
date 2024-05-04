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
import { checkAuthAsync, updateUserAddressAsync } from '../slices/userSlice'
import axios from 'axios'



const UserProfile = () => {

    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, control, watch, setValue, getValues } = useForm();
    const user = useSelector(state => state.user.currUser)
    const state = useSelector(state => state.user.state);
    const [formModal, setFormModal] = useState(false);

    useEffect(() => {
        dispatch(checkAuthAsync());
    }, []);
    useEffect(() => {
        if (state == 'rejected') {
            // navigate
        }
    }, [state]);

    return (
        <div>
            <FormModal formModal={formModal} setFormModal={setFormModal} />
            <h1 className='text-3xl font-semibold mb-12'>Your Profile</h1>
            {user && (
                <form>
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
                            <button className='rounded-lg bg-black text-white px-4 py-2 text-sm'>
                                Save Changes
                            </button>
                        </div>
                        <span className='col-span-2 mb-8 border-b-2 border-dashed border-gray-300'>

                        </span>
                        <div className="col-span-1 relative z-0 w-full mb-5 group">
                            <Controller
                                name="password"
                                control={control}
                                defaultValue={user.fullname} // Set initial value from state
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="password"
                                        className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 appearance-none  focus:outline-none focus:ring-0 border-gray-300 focus:border-black peer"
                                        placeholder=" "
                                        required=""
                                    />
                                )}
                            />
                            <label
                                className="peer-focus:font-medium absolute text-sm text-muted-text duration-300 transform -translate-y-8 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 start-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 cursor-text pointer-events-none"
                            >
                                Password
                            </label>
                            {errors?.password && (
                                <span className='text-red-400 text-xs'>{errors.password.message}</span>
                            )}
                        </div>
                        <div className="col-span-1 relative z-0 w-full mb-5 flex justify-start">
                            <button className='rounded-lg bg-black text-white px-4 py-2 text-sm'>
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
                                {user.addresses.map((address) => (
                                    <div className="flex w-full items-start justify-start bg-white px-4 py-2 rounded-md mb-4">
                                        <div className='flex-1'>
                                            <h2 className='text-lg font-semibold'>{address.name}</h2>
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
                                                type="button"
                                                title='Edit Address'
                                                className="p-2 bg-white rounded-md text-lg text-muted-text hover:bg-muted-bg border border-gray-300 duration-100"
                                            >
                                                <LuPencil />
                                            </button>
                                            <button
                                                type="button"
                                                title='Remove Address'
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
                                            setFormModal(true)
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

const FormModal = ({ formModal, setFormModal }) => {

    const userId = "661137f22a31832ceb92ddbc";
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, control, watch, setValue, getValues } = useForm();

    function sendData(data) {
        const sendable = { address: data, type: "add" }
        dispatch(updateUserAddressAsync({ user_id: userId, data: sendable }))
        console.log(data);
    }
    async function checkPincode(pincode) {
        setValue("city", "");
        setValue("state", "");
        const pincodeUrl = "https://api.postalpincode.in/pincode/" + pincode;
        const { data } = await axios.get(pincodeUrl);
        if (data[0].Status == "Success") {
            setValue("city", data[0].PostOffice[0].Block);
            setValue("state", data[0].PostOffice[0].State);
        }
    }
    useEffect(() => {
        const debounced = setTimeout(() => {
            checkPincode(watch("pincode"))
        }, 1000);
        return () => clearTimeout(debounced);
    }, [watch("pincode")]);

    return (
        <Transition.Root show={formModal} as={Fragment}>
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
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm bg-opacity-75 transition-opacity" />
                </Transition.Child>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center">
                        <Dialog.Panel className='relative'>
                            <div className='py-4 bg-white px-4 max-w-2xl mx-auto rounded-lg'>
                                <form onSubmit={handleSubmit(data => { sendData(data) })}>
                                    <h2 className='mb-1 text-text text-lg'>Add a New Address</h2>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div className='col-span-1'>
                                            <label className='text-sm mb-1 text-muted-text'>First Name</label>
                                            <Controller
                                                name="fname"
                                                control={control}
                                                defaultValue={""}
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
                                        </div>
                                        <div className='col-span-1'>
                                            <label className='text-sm mb-1 text-muted-text'>Last Name</label>
                                            <Controller
                                                name="lname"
                                                control={control}
                                                defaultValue={""} // Set initial value from state
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
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-2 gap-2 mt-6'>
                                        <div className='col-span-1'>
                                            <label className='text-sm mb-1 text-muted-text'>Phone</label>
                                            <Controller
                                                name="phone"
                                                control={control}
                                                defaultValue={""} // et initial value from state
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
                                        </div>
                                        <div className='col-span-1'>
                                            <label className='text-sm mb-1 text-muted-text'>E-mail</label>
                                            <Controller
                                                name="email"
                                                control={control}
                                                defaultValue={""} // Set initial value from state
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
                                        </div>
                                    </div>
                                    <div className='mt-6'>
                                        <div>
                                            <label className='text-sm mb-1 text-muted-text'>Flat/Plot No.</label>
                                            <Controller
                                                name="plot_no"
                                                control={control}
                                                defaultValue={""} // Set initial value from state
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
                                        </div>
                                    </div>
                                    <div className='mt-6'>
                                        <div>
                                            <label className='text-sm mb-1 text-muted-text'>Address Line 1</label>
                                            <Controller
                                                name="address_line_1"
                                                control={control}
                                                defaultValue={""} // Set initial value from state
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
                                        </div>
                                    </div>
                                    <div className='mt-6'>
                                        <div>
                                            <label className='text-sm mb-1 text-muted-text'>Address Line 2</label>
                                            <Controller
                                                name="address_line_2"
                                                control={control}
                                                defaultValue={""} // Set initial value from state
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
                                        </div>
                                    </div>
                                    <div className='mt-6'>
                                        <div>
                                            <label className='text-sm mb-1 text-muted-text'>Landmark</label>
                                            <Controller
                                                name="landmark"
                                                control={control}
                                                defaultValue={""}
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
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-3 gap-2 mt-6'>
                                        <div className='col-span-1'>
                                            <label className='text-sm mb-1 text-muted-text'>Postal Code</label>
                                            <Controller
                                                name="pincode"
                                                control={control}
                                                defaultValue={""} // Set initial value from state
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
                                        </div>
                                        <div className='col-span-1'>
                                            <label className='text-sm mb-1 text-muted-text'>City/District</label>
                                            <Controller
                                                name="city"
                                                control={control}
                                                defaultValue={""} // Set initial value from state
                                                render={({ field }) => (
                                                    <input
                                                        {...field}
                                                        disabled={true}
                                                        type="text"
                                                        className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 appearance-none  focus:outline-none focus:ring-0 border-gray-300 focus:border-black peer"
                                                        placeholder=" "
                                                        required=""
                                                    />
                                                )}
                                            />
                                        </div>
                                        <div className='col-span-1'>
                                            <label className='text-sm mb-1 text-muted-text'>State</label>
                                            <Controller
                                                name="state"
                                                control={control}
                                                defaultValue={""} // Set initial value from state
                                                render={({ field }) => (
                                                    <input
                                                        {...field}
                                                        disabled={true}
                                                        type="text"
                                                        className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 appearance-none  focus:outline-none focus:ring-0 border-gray-300 focus:border-black peer"
                                                        placeholder=" "
                                                        required=""
                                                    />
                                                )}
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
        </Transition.Root>
    )
}
