import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react'
import { IoCloseOutline, IoInformationCircleOutline, IoPencilSharp, IoTrashBinSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProductsAsync, fetchProductByIdAsync, resetCurrProduct } from '../../slices/productSlice.js'
import { DOMAIN } from '../../app/constants.js';
import { Link } from 'react-router-dom';
import { fetchUsersAsync, resetUser, setUser } from '../../slices/userSlice.js';

const ManageUsers = () => {

    const dispatch = useDispatch();
    const users = useSelector(state => state.user.users);
    const user = useSelector(state => state.user.user);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        dispatch(fetchUsersAsync())
    }, []);

    return (
        <div className='py-8 px-6'>
            <DeleteModal showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />
            {user &&
                <DetailsModal user={user} setShowDeleteModal={setShowDeleteModal} />
            }
            <h1 className='text-2xl font-bold uppercase mb-4'>Manage Users</h1>
            <div className='overflow-auto'>
                <table className='table-auto w-full border' style={{ minWidth: '768px' }}>
                    <thead className='bg-muted-bg'>
                        <tr>
                            <th className='text-start py-2 px-2 border border-muted-text'>S.no</th>
                            <th className='text-start py-2 px-2 border border-muted-text'>Name</th>
                            <th className='text-start py-2 px-2 border border-muted-text'>Email</th>
                            <th className='text-start py-2 px-2 border border-muted-text'>Profile</th>
                            <th className='text-start py-2 px-2 border border-muted-text'>Created At</th>
                            <th className='text-start py-2 px-2 border border-muted-text'>Updated At</th>
                            <th className='text-start py-2 px-2 border border-muted-text'>Cart</th>
                            <th className='text-start py-2 px-2 border border-muted-text'>Wishlist</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Sample row */}
                        {users && users.map((el, index) => (
                            <tr>
                                <td className='text-start py-2 px-2 border border-muted-text'>{index + 1}</td>
                                <td className='text-start text-sm py-2 px-2 border border-muted-text'>{el.fullname}</td>
                                <td className='text-start text-sm py-2 px-2 border border-muted-text'>{el.email}</td>
                                <td className='text-start py-2 px-2 border border-muted-text'>
                                    <img
                                        className='w-32 h-24 object-cover object-center mx-auto'
                                        src={`https://ui-avatars.com/api/?name=${el?.fullname}&background=random`}
                                    />
                                </td>
                                <td className='text-start text-sm py-2 px-2 border border-muted-text'>{el.createdAt}</td>
                                <td className='text-start text-sm py-2 px-2 border border-muted-text'>{el.updatedAt}</td>
                                <td className='text-start text-sm py-2 px-2 border border-muted-text'>
                                    <button
                                        className='py-2 px-3 rounded-md text-text text-sm bg-yellow-300 hover:brightness-75 mx-auto flex justify-center items-center space-x-2'
                                        onClick={() => { dispatch(setUser(el)) }}>
                                        <span><IoInformationCircleOutline /></span>
                                        <span>View</span>
                                    </button>
                                </td>
                                <td className='text-start py-2 px-2 border border-muted-text'>
                                    <button
                                        className='py-2 px-3 rounded-md text-text text-sm bg-yellow-300 hover:brightness-75 mx-auto flex justify-center items-center space-x-2'
                                        onClick={() => { dispatch(setUser(el)) }}>
                                        <span><IoInformationCircleOutline /></span>
                                        <span>View</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

const DetailsModal = ({ user, setShowDeleteModal }) => {

    const dispatch = useDispatch();

    return (
        <Transition.Root show={user ? true : false} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => { dispatch(resetUser()) }}>
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className='w-full' >
                                        <div className='flex justify-between items-center pb-2 border-b border-gray-300'>
                                            <h2 className='text-2xl font-bold'>Product Details</h2>
                                            <button
                                                className='p-2 text-2xl'
                                                onClick={() => { dispatch(resetUser()) }}
                                            >
                                                <span>
                                                    <IoCloseOutline />
                                                </span>
                                            </button>
                                        </div>
                                        <div className='overflow-x-auto'>
                                            <table className='table-auto w-full [&_td]:text-start [&_td]:border [&_td]:border-muted-text [&_td]:p-4 [&_th]:text-start [&_th]:bg-muted-bg [&_th]:border [&_th]:border-muted-text [&_th]:p-4'>
                                                <tr>
                                                    <th>Profile</th>
                                                    <td>
                                                        <img
                                                            src={`${DOMAIN}/uploads/user_profiles/${1}`}
                                                            alt=""
                                                            className='w-24 h-16 object-cover object-center'
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Fullname</th>
                                                    <td>{user.fullname}</td>
                                                </tr>
                                                <tr>
                                                    <th>Email</th>
                                                    <td>{user.email}</td>
                                                </tr>
                                                <tr>
                                                    <th>created At</th>
                                                    <td>{user.createdAt}</td>
                                                </tr>
                                                <tr>
                                                    <th>updated At</th>
                                                    <td>{user.updatedAt}</td>
                                                </tr>
                                                <tr>
                                                    <th>Cart</th>
                                                    <td>
                                                        <table>
                                                            <tr>
                                                                <th>Product name</th>
                                                                <th>Image</th>
                                                                <th>Size</th>
                                                                <th>Price</th>
                                                                <th>Discount</th>
                                                                <th>Qty</th>
                                                            </tr>
                                                            {user.cart.map((item, index) => (
                                                                <tr>
                                                                    <td className='text-sm'>{item.name}</td>
                                                                    <td>
                                                                        <img
                                                                            src={`${DOMAIN}/uploads/product_images/${item.img}`}
                                                                            className='w-64 h-24 object-cover object-center'
                                                                        />
                                                                    </td>
                                                                    <td>{item.size.label}</td>
                                                                    <td>{item.size.price}</td>
                                                                    <td>{item.size.discountPercentage}%</td>
                                                                    <td>{item.qty}</td>
                                                                </tr>
                                                            ))}
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Wishlist</th>
                                                    <td>
                                                        <table>
                                                            <tr>
                                                                <th>Product name</th>
                                                                <th>Image</th>
                                                            </tr>
                                                            {user.wishlist.map((item, index) => (
                                                                <tr>
                                                                    <td className='text-sm'>{item.name}</td>
                                                                    <td>
                                                                        <img
                                                                            src={`${DOMAIN}/uploads/product_images/${item.img}`}
                                                                            className='w-64 h-24 object-cover object-center'
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
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


const DeleteModal = ({ showDeleteModal, setShowDeleteModal }) => {
    return (
        <Transition.Root show={showDeleteModal} as={Fragment}>
            <Dialog as="div" className="relative z-20" onClose={setShowDeleteModal}>
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
                                                Delete This Product
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Are you sure you wan't to delete this product. It will remove all the data including images. This action cannot be undone.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                        onClick={() => setShowDeleteModal(false)}
                                    >
                                        Deactivate
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                        onClick={() => setShowDeleteModal(false)}
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

export default ManageUsers
