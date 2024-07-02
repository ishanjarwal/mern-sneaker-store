import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import { IoAddSharp, IoPencilSharp, IoTrashBinSharp } from 'react-icons/io5'
import { DOMAIN } from '../../app/constants';
import { useDispatch, useSelector } from 'react-redux';
import { createBrandAsync, fetchBrandsAsync, updateBrandAsync } from '../../slices/brandSlice';

const ManageBrands = () => {

    const dispatch = useDispatch();
    const [apiData, setApiData] = useState({
        type: null,
        id: null,
        name: ""
    });

    const brands = useSelector(state => state.brand.brands);
    const state = useSelector(state => state.brand.state);

    useEffect(() => {
        dispatch(fetchBrandsAsync());
    }, []);

    useEffect(() => {
        if (state === 'fulfilled') {
            dispatch(fetchBrandsAsync());
        }
    }, [state]);

    useEffect(() => {
        setApiData({
            type: null,
            id: null,
            name: ""
        })
    }, [state]);

    return (
        <div className='py-8 px-6'>
            <Modal apiData={apiData} setApiData={setApiData} />
            <h1 className='text-2xl font-bold uppercase mb-4'>manage brands</h1>
            <div className='my-12'>
                <button
                    className='flex justify-between items-center space-x-2 py-3 px-6 uppercase rounded-md bg-black text-white hover:scale-105 duration-150'
                    onClick={() => { setApiData(prev => ({ ...prev, type: 'create' })) }}
                >
                    <span>Create a New Brand</span>
                    <span className='text-lg'><IoAddSharp /></span>
                </button>
            </div>
            <div className='overflow-auto'>
                <table className='table-auto w-full border' style={{ minWidth: '768px' }}>
                    <thead className='bg-muted-bg'>
                        <tr>
                            <th className='text-start py-2 px-2 border border-muted-text'>S.no</th>
                            <th className='text-start py-2 px-2 border border-muted-text'>Brand Name</th>
                            <th className='text-start py-2 px-2 border border-muted-text'>Total Products</th>
                            <th className='text-start py-2 px-2 border border-muted-text'>Created At</th>
                            <th className='text-start py-2 px-2 border border-muted-text'>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Sample row */}
                        {brands && brands.map((brand, index) => (
                            <tr key={index}>
                                <td className='text-start py-2 px-2 border border-muted-text'>{index + 1}</td>
                                <td className='text-start text-sm py-2 px-2 border border-muted-text'>{brand.name}</td>
                                <td className='text-start text-sm py-2 px-2 border border-muted-text'>{brand.productCount}</td>
                                <td className='text-start text-sm py-2 px-2 border border-muted-text'>{brand.createdAt}</td>
                                <td className='text-start py-2 px-2 border border-muted-text'>
                                    <button
                                        className='py-2 px-3 rounded-md text-white text-sm bg-blue-500 hover:brightness-75 mx-auto flex justify-center items-center space-x-2'
                                        onClick={() => { setApiData({ id: brand._id, name: brand.name, type: 'update' }) }}>
                                        <span><IoPencilSharp /></span>
                                        <span>Edit</span>
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

export default ManageBrands

const Modal = ({ apiData, setApiData }) => {

    const dispatch = useDispatch();

    async function handleBrand() {
        if (apiData.type === 'update') {
            dispatch(updateBrandAsync({ id: apiData.id, name: apiData.name }))
        } else {
            dispatch(createBrandAsync(apiData.name))
        }
    }

    return (
        <Transition.Root show={apiData?.type ? true : false} as={Fragment}>
            <Dialog as="div" className="relative z-20" onClose={() => { setApiData(prev => ({ ...prev, type: null, id: null, name: "" })) }}>
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
                                    <h2 className='text-2xl font-bold uppercase'>{apiData.type === "update" ? "Update" : "Create a New"} Brand</h2>
                                    <form className='mt-8'>
                                        <label>
                                            Brand Name
                                        </label>
                                        <input
                                            className='py-2 px-4 rounded-md border-gray-300 border w-full'
                                            type="text"
                                            value={apiData.name}
                                            onChange={(e) => {
                                                setApiData(prev => ({ ...prev, name: e.target.value }))
                                            }}
                                        />
                                        <button
                                            className='py-2 px-4 rounded-md bg-black text-white uppercase mt-2 w-full'
                                            onClick={(e) => {
                                                e.preventDefault()
                                                handleBrand();
                                            }}
                                        >
                                            {apiData.type === 'update' ? "Update" : "Create"}
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
