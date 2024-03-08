import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react'
import { IoAddSharp, IoTrashOutline } from 'react-icons/io5'

const variantItems = [
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
        title: "AIR JORDAN 1 LOW 'WHITE/BLACK-GREEN GLOW'",
        href: '#',
        color: 'Salmon',
        sp: '$90.00',
        quantity: 1,
        thumbnail: 'https://images.vegnonveg.com/resized/400X328/10792/air-jordan-1-low-whiteblack-green-glow-white-65e5bb6851306.jpg',
        imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    },
    {
        id: 3,
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

const ManageVariants = () => {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);


    return (
        <div className='py-8 px-6'>
            <DeleteModal showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />
            <AddVariant showAddModal={showAddModal} setShowAddModal={setShowAddModal} />
            <CreateVariant showCreateModal={showCreateModal} setShowCreateModal={setShowCreateModal} />
            <h1 className='text-2xl font-bold uppercase mb-4'>manage variants</h1>
            <div className='my-8'>
                <button
                    className='flex justify-between items-center space-x-2 py-3 px-6 uppercase rounded-md bg-black text-white hover:scale-105 duration-150'
                    onClick={() => { setShowCreateModal(true) }}
                >
                    <span>Create a New Variant</span>
                    <span className='text-lg'><IoAddSharp /></span>
                </button>
            </div>
            <div className='my-8'>
                <div className='grid grid-cols-1 gap-8'>
                    {[1, 1, 1].map((variant, idx) => (
                        <div className='col-span-1 border-gray-300 border rounded-md bg-gray-100 py-3 px-4'>
                            <h2 className='text-lg font-bold mb-2'>Variant ID : 192834123</h2>
                            <div className='grid grid-cols-2 gap-4'>
                                {variantItems.map((product, idx) => (
                                    <div className='bg-white'>
                                        <div key={idx} className="md:col-span-1 col-span-2 flex p-4 border border-gray-300 rounded-lg">
                                            <div className="h-24 w-24 flex-shrink-0 rounded-md overflow-hidden bg-muted-bg border border-gray-300">
                                                <img
                                                    src={product.thumbnail}
                                                    alt={product.title}
                                                    className="w-full object-contain object-center"
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
                                                </div>
                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                    <div className="flex justify-end w-full space-x-2">
                                                        <button
                                                            onClick={() => { setShowDeleteModal(true) }}
                                                            type="button"
                                                            title='Remove from this Variant'
                                                            className="p-2 bg-white rounded-md text-lg text-red-400 hover:bg-muted-bg border border-gray-300 duration-100"
                                                        >
                                                            <IoTrashOutline />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='mt-8 pt-4 border-t border-gray-300 flex justify-end items-center'>
                                <button
                                    onClick={() => { setShowAddModal(true) }}
                                    type="button"
                                    title='Add More Items to this Variant'
                                    className="p-2 bg-black rounded-md text-white hover:scale-105 duration-100"
                                >
                                    Add More Items
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ManageVariants


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
                                                Are you Sure ?
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Remove this item from this variant list.
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
                                        Remove
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

const AddVariant = ({ showAddModal, setShowAddModal }) => {
    return (
        <Transition.Root show={showAddModal} as={Fragment}>
            <Dialog as="div" className="relative z-20" onClose={setShowAddModal}>
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl">
                                <div className='py-6 px-6'>
                                    <h2 className='text-2xl font-bold uppercase'>Add Product to this Variant</h2>
                                    <form className='mt-8'>
                                        <label>
                                            Select Products
                                        </label>
                                        <div className='grid grid-cols-2 gap-2 mt-2 max-h-96 overflow-y-auto'>
                                            {variantItems.map((product, idx) => (
                                                <div className='md:col-span-1 col-span-2 bg-white'>
                                                    <div key={idx} className="md:col-span-1 col-span-2 flex p-4 border border-gray-300 rounded-lg">
                                                        <div className="h-24 w-24 flex-shrink-0 rounded-md overflow-hidden bg-muted-bg border border-gray-300">
                                                            <img
                                                                src={product.thumbnail}
                                                                alt={product.title}
                                                                className="w-full object-contain object-center"
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
                                                            </div>
                                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                                <div className="flex justify-end w-full space-x-2">
                                                                    <button
                                                                        type="button"
                                                                        title='Remove from this Variant'
                                                                        className="p-2 bg-black rounded-md text-white hover:scale-105 border border-gray-300 duration-100"
                                                                    >
                                                                        Select
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <button className='py-2 px-4 rounded-md bg-black text-white uppercase mt-2 w-full hover:brightness-75'>
                                            Add
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

const CreateVariant = ({ showCreateModal, setShowCreateModal }) => {
    return (
        <Transition.Root show={showCreateModal} as={Fragment}>
            <Dialog as="div" className="relative z-20" onClose={setShowCreateModal}>
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl">
                                <div className='py-6 px-6'>
                                    <h2 className='text-2xl font-bold uppercase'>Create a New Variant</h2>
                                    <form className='mt-8'>
                                        <label>
                                            Select Products
                                        </label>
                                        <div className='grid grid-cols-2 gap-2 mt-2 max-h-96 overflow-y-auto'>
                                            {variantItems.map((product, idx) => (
                                                <div className='md:col-span-1 col-span-2 bg-white'>
                                                    <div key={idx} className="md:col-span-1 col-span-2 flex p-4 border border-gray-300 rounded-lg">
                                                        <div className="h-24 w-24 flex-shrink-0 rounded-md overflow-hidden bg-muted-bg border border-gray-300">
                                                            <img
                                                                src={product.thumbnail}
                                                                alt={product.title}
                                                                className="w-full object-contain object-center"
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
                                                            </div>
                                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                                <div className="flex justify-end w-full space-x-2">
                                                                    <button
                                                                        type="button"
                                                                        title='Remove from this Variant'
                                                                        className="p-2 bg-black rounded-md text-white hover:scale-105 border border-gray-300 duration-100"
                                                                    >
                                                                        ADD
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <button className='py-2 px-4 rounded-md bg-black text-white uppercase mt-2 w-full hover:brightness-75'>
                                            Add
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