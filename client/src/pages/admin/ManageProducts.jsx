import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react'
import { IoCloseOutline, IoInformationCircleOutline, IoPencilSharp, IoTrashBinSharp, } from 'react-icons/io5';
import { IoMdCloudUpload } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProductsAsync, fetchProductByIdAsync, resetCurrProduct, toggleDraftAsync } from '../../slices/productSlice.js'
import { DOMAIN } from '../../app/constants.js';
import { Link } from 'react-router-dom';
import { FaRegSave } from "react-icons/fa";

const ManageProducts = () => {

    const dispatch = useDispatch();
    const products = useSelector(state => state.product.products);
    const currProduct = useSelector(state => state.product.currProduct);


    useEffect(() => {
        dispatch(fetchAllProductsAsync())
    }, [products]);

    return (
        <div className='py-8 px-6'>
            {currProduct &&
                <DetailsModal product={currProduct} />
            }
            <h1 className='text-2xl font-bold uppercase mb-4'>Manage Products</h1>
            <div className='overflow-auto'>
                <table className='table-auto w-full border' style={{ minWidth: '768px' }}>
                    <thead className='bg-muted-bg'>
                        <tr>
                            <th className='text-start py-2 px-2 border border-muted-text'>S.no</th>
                            <th className='text-start py-2 px-2 border border-muted-text'>Thumbnail</th>
                            <th className='text-start py-2 px-2 border border-muted-text'>Title</th>
                            <th className='text-start py-2 px-2 border border-muted-text'>Created At</th>
                            <th className='text-start py-2 px-2 border border-muted-text'>Updated At</th>
                            <th className='text-start py-2 px-2 border border-muted-text'>Category</th>
                            <th className='text-start py-2 px-2 border border-muted-text'>Brand</th>
                            <th className='text-start py-2 px-2 border border-muted-text'>Stock</th>
                            <th className='text-start py-2 px-2 border border-muted-text'>Details</th>
                            <th className='text-start py-2 px-2 border border-muted-text'>Edit</th>
                            <th className='text-start py-2 px-2 border border-muted-text'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Sample row */}
                        {products && products.map((el, index) => (
                            <tr>
                                <td className='text-start py-2 px-2 border border-muted-text'>{index + 1}</td>
                                <td className='text-start py-2 px-2 border border-muted-text'>
                                    <img
                                        className='w-32 h-24 object-cover object-center mx-auto'
                                        src={el.images[0]} />
                                </td>
                                <td className='text-start text-sm py-2 px-2 border border-muted-text'>{el.name}</td>
                                <td className='text-start text-sm py-2 px-2 border border-muted-text'>{el.createdAt}</td>
                                <td className='text-start text-sm py-2 px-2 border border-muted-text'>{el.updatedAt}</td>
                                <td className='text-start text-sm py-2 px-2 border border-muted-text'>{el.category.name}</td>
                                <td className='text-start text-sm py-2 px-2 border border-muted-text'>{el.brand.name}</td>
                                <td className='text-start text-sm py-2 px-2 border border-muted-text'>{el.sizes.reduce((acc, curr) => acc + curr.stock, 0)}</td>
                                <td className='text-start text-sm py-2 px-2 border border-muted-text'>
                                    <button
                                        className='py-2 px-3 rounded-md text-text text-sm bg-yellow-300 hover:brightness-75 mx-auto flex justify-center items-center space-x-2'
                                        onClick={() => { dispatch(fetchProductByIdAsync({ product_id: el._id, size: null })) }}>
                                        <span><IoInformationCircleOutline /></span>
                                        <span>Details</span>
                                    </button>
                                </td>
                                <td className='text-start py-2 px-2 border border-muted-text'>
                                    <Link
                                        to={`/admin/update-product/${el._id}`}
                                        className='py-2 px-3 rounded-md text-white text-sm bg-blue-500 hover:brightness-75 mx-auto flex justify-center items-center space-x-2'
                                    >
                                        <span><IoPencilSharp /></span>
                                        <span>Edit</span>
                                    </Link>
                                </td>
                                <td className='text-start py-2 px-2 border border-muted-text'>
                                    <button
                                        className={`${el?.isDraft === true ? 'bg-blue-500' : 'bg-red-500'} py-2 px-3 rounded-md text-white text-sm  hover:brightness-75 mx-auto flex justify-center items-center space-x-2`}
                                        onClick={() => dispatch(toggleDraftAsync(el?._id))}>
                                        <span>
                                            {el?.isDraft === true ? <IoMdCloudUpload /> : <FaRegSave />}
                                        </span>
                                        <span>{el?.isDraft === true ? "Publish" : "Draft"}</span>
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

const DetailsModal = ({ product }) => {

    const dispatch = useDispatch();

    return (
        <Transition.Root show={product ? true : false} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => { }}>
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
                                                onClick={() => { dispatch(resetCurrProduct()) }}
                                            >
                                                <span>
                                                    <IoCloseOutline />
                                                </span>
                                            </button>
                                        </div>
                                        <div className='overflow-x-auto'>
                                            <table className='table-auto w-full [&_td]:text-start [&_td]:border [&_td]:border-muted-text [&_td]:p-4 [&_th]:text-start [&_th]:bg-muted-bg [&_th]:border [&_th]:border-muted-text [&_th]:p-4'>
                                                <tr>
                                                    <th>Thumbnail</th>
                                                    <td>
                                                        <img
                                                            src={product.images[0]}
                                                            alt=""
                                                            className='w-24 h-16 object-cover object-center'
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Images</th>
                                                    <td>
                                                        {product.images.map((image, index) => (
                                                            <img
                                                                src={image}
                                                                alt=""
                                                                className='w-20 h-16 me-2 object-cover object-center inline'
                                                            />
                                                        ))}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Title</th>
                                                    <td>{product.name}</td>
                                                </tr>
                                                {/* <tr>
                                                    <th>Short Description</th>
                                                    <td>{product.short_description}</td>
                                                </tr> */}
                                                <tr>
                                                    <th>Long Description</th>
                                                    <td>{product.additional_details.description}</td>
                                                </tr>
                                                <tr>
                                                    <th>Brand</th>
                                                    <td>{product.brand.name}</td>
                                                </tr>
                                                <tr>
                                                    <th>Category</th>
                                                    <td>{product.category.name}</td>
                                                </tr>
                                                <tr>
                                                    <th>Total Stock</th>
                                                    <td>{product.sizes.reduce((acc, size) => acc + size.stock, 0)}</td>
                                                </tr>
                                                <tr>
                                                    <th>Sizes</th>
                                                    <td>
                                                        <table>
                                                            <tr>
                                                                <th>Size</th>
                                                                <th>Stock</th>
                                                                <th>Price</th>
                                                                <th>Discout(%)</th>
                                                            </tr>
                                                            {product.sizes.map((item, index) => (
                                                                <tr>
                                                                    <td>{item.label}</td>
                                                                    <td>{item.stock}</td>
                                                                    <td>{item.price}</td>
                                                                    <td>{item.discountPercentage}</td>
                                                                </tr>
                                                            ))}
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Created At</th>
                                                    <td>{product?.createdAt}</td>
                                                </tr>
                                                <tr>
                                                    <th>Last Updated</th>
                                                    <td>{product?.updatedAt}</td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div className='flex justify-end pt-4 mt-8 space-x-2 border-t border-gray-300'>
                                            <Link
                                                to={`/admin/update-product/${product._id}`}
                                                className='py-2 px-3 rounded-md text-white text-sm bg-blue-500 hover:brightness-75 flex justify-center items-center space-x-2'
                                            >
                                                <span><IoPencilSharp /></span>
                                                <span>Edit</span>
                                            </Link>
                                            <button
                                                className={`${product?.isDraft === true ? 'bg-blue-500' : 'bg-red-500'} py-2 px-3 rounded-md text-white text-sm  hover:brightness-75 mx-auto flex justify-center items-center space-x-2`}
                                                onClick={() => dispatch(toggleDraftAsync(product?._id))}>
                                                <span>
                                                    {product?.isDraft === true ? <IoMdCloudUpload /> : <FaRegSave />}
                                                </span>
                                                <span>{product?.isDraft === true ? "Publish" : "Draft"}</span>
                                            </button>
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


export default ManageProducts
