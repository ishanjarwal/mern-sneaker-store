import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import { IoAddSharp, IoPencilSharp, IoTrashBinSharp } from 'react-icons/io5'
import { fetchCategories } from '../../../../api/controllers/categoryController';
import { DOMAIN } from '../../app/constants';

const ManageCategories = () => {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [data, setData] = useState(null);

    async function fetchCategories() {
        try {
            const response = await axios.get(DOMAIN + '/api/category')
            setData(response.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className='py-8 px-6'>
            <DeleteModal showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />
            <CreateBrand showCreateForm={showCreateForm} setShowCreateForm={setShowCreateForm} />
            <h1 className='text-2xl font-bold uppercase mb-4'>manage brands</h1>
            <div className='my-12'>
                <button
                    className='flex justify-between items-center space-x-2 py-3 px-6 uppercase rounded-md bg-black text-white hover:scale-105 duration-150'
                    onClick={() => { setShowCreateForm(true) }}
                >
                    <span>Create a New Category</span>
                    <span className='text-lg'><IoAddSharp /></span>
                </button>
            </div>
            <div className='overflow-auto'>
                <table className='table-auto w-full border' style={{ minWidth: '768px' }}>
                    <thead className='bg-muted-bg'>
                        <tr>
                            <th className='text-start py-2 px-2 border border-muted-text'>S.no</th>
                            <th className='text-start py-2 px-2 border border-muted-text'>Category Name</th>
                            <th className='text-start py-2 px-2 border border-muted-text'>Total Products</th>
                            <th className='text-start py-2 px-2 border border-muted-text'>Created At</th>
                            <th className='text-start py-2 px-2 border border-muted-text'>Update</th>
                            <th className='text-start py-2 px-2 border border-muted-text'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Sample row */}
                        {data && data.map((category, index) => (
                            <tr key={index}>
                                <td className='text-start py-2 px-2 border border-muted-text'>{index + 1}</td>
                                <td className='text-start text-sm py-2 px-2 border border-muted-text uppercase'>{category.name}</td>
                                <td className='text-start text-sm py-2 px-2 border border-muted-text'>25</td>
                                <td className='text-start text-sm py-2 px-2 border border-muted-text'>{category.createdAt}</td>
                                <td className='text-start py-2 px-2 border border-muted-text'>
                                    <button
                                        className='py-2 px-3 rounded-md text-white text-sm bg-blue-500 hover:brightness-75 mx-auto flex justify-center items-center space-x-2'
                                        onClick={() => { }}>
                                        <span><IoPencilSharp /></span>
                                        <span>Edit</span>
                                    </button>
                                </td>
                                <td className='text-start py-2 px-2 border border-muted-text'>
                                    <button
                                        className='py-2 px-3 rounded-md text-white text-sm bg-red-500 hover:brightness-75 mx-auto flex justify-center items-center space-x-2'
                                        onClick={() => setShowDeleteModal(true)}>
                                        <span><IoTrashBinSharp /></span>
                                        <span>Delete</span>
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

export default ManageCategories

const CreateBrand = ({ showCreateForm, setShowCreateForm }) => {

    const [value, setValue] = useState('');
    async function createCategory() {
        const url = DOMAIN + '/api/category'
        try {
            const response = await axios.post(url, { name: value });
            console.log(response)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Transition.Root show={showCreateForm} as={Fragment}>
            <Dialog as="div" className="relative z-20" onClose={setShowCreateForm}>
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
                                <div className='py-6 px-6'>
                                    <h2 className='text-2xl font-bold uppercase'>Create a New Category</h2>
                                    <form className='mt-8'>
                                        <label>
                                            Category Name
                                        </label>
                                        <input
                                            className='py-2 px-4 rounded-md border-gray-300 border w-full'
                                            type="text"
                                            onChange={(e) => {
                                                setValue(e.target.value)
                                            }}
                                        />
                                        <button
                                            className='py-2 px-4 rounded-md bg-black text-white uppercase mt-2 w-full'
                                            onClick={(e) => {
                                                e.preventDefault();
                                                createCategory();
                                            }}
                                        >
                                            Create
                                        </button>
                                    </form>
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
                                                Alert
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Deleting this Category will also delete all the products belonging to this Category. The Action can't be undone.
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
                                        Delete
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

