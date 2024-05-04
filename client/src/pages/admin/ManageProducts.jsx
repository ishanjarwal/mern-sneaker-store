import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react'
import { IoCloseOutline, IoInformationCircleOutline, IoPencilSharp, IoTrashBinSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProductsAsync } from '../../slices/productSlice.js'

const ManageProducts = () => {

    const dispatch = useDispatch();
    const products = useSelector(state => state.product.products);

    const [showDetails, setShowDetails] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        dispatch(fetchAllProductsAsync())
    }, []);

    const sampleProduct = {
        id: 1,
        thumbnail: 'https://example.com/image.jpg',
        title: 'Sample Product ',
        category: 'Sample Category',
        brand: 'Sample Brand',
        stock: 10
    };

    return (
        <div className='py-8 px-6'>
            <DeleteModal showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} />
            <DetailsModal product={sampleProduct} showDetails={showDetails} setShowDetails={setShowDetails} setShowDeleteModal={setShowDeleteModal} />
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
                                        src={`http://localhost:8080/uploads/product_images/${el.images[0]}`} />
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
                                        onClick={() => { setShowDetails(true) }}>
                                        <span><IoInformationCircleOutline /></span>
                                        <span>Details</span>
                                    </button>
                                </td>
                                <td className='text-start py-2 px-2 border border-muted-text'>
                                    <button
                                        className='py-2 px-3 rounded-md text-white text-sm bg-blue-500 hover:brightness-75 mx-auto flex justify-center items-center space-x-2'
                                        onClick={() => handleEdit(sampleProduct.id)}>
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

const DetailsModal = ({ showDetails, setShowDetails, setShowDeleteModal }) => {

    const product = {
        "id": 1,
        "title": "Classic Sneaker Shoe",
        "short_description": "The Classic Sneaker Shoe is designed for comfort and style.",
        "brand": "CoolKicks",
        "category": "Sneakers",
        "images": [
            "https://example.com/sneaker_image1.jpg",
            "https://example.com/sneaker_image2.jpg"
        ],
        "sizes": [
            {
                "size": 7,
                "stock": 20,
                "price": 79.99,
                "discountPercentage": 0,
                "def_currency": "usd"
            },
            {
                "size": 8,
                "stock": 15,
                "price": 79.99,
                "discountPercentage": 0,
                "def_currency": "usd"
            },
            {
                "size": 9,
                "stock": 10,
                "price": 79.99,
                "discountPercentage": 0,
                "def_currency": "usd"
            }
        ],
        "total_stock": 45,
        "created_at": 1646366400,
        "variant_id": 98765,
        "additional_details": {
            "description": "The Classic Sneaker Shoe features a timeless design with durable construction. It's perfect for everyday wear and pairs well with any casual outfit.",
            "specifications": {
                "materials": ["Canvas", "Rubber"],
                "fabrics": ["Cotton", "Polyester"],
                "dimensions": {
                    "unit": "inch",
                    "width": 4.5,
                    "depth": 11,
                    "height": 5
                },
                "weight": {
                    "unit": "kg",
                    "value": 0.5
                },
                "custom": {
                    "feature1": "Breathable design",
                    "feature2": "Non-slip sole",
                    "feature3": "Padded insole for comfort"
                }
            }
        }
    }

    return (
        <Transition.Root show={showDetails} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setShowDetails}>
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
                                                onClick={() => { setShowDetails(false) }}
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
                                                    <td>{product.title}</td>
                                                </tr>
                                                <tr>
                                                    <th>Short Description</th>
                                                    <td>{product.short_description}</td>
                                                </tr>
                                                <tr>
                                                    <th>Long Description</th>
                                                    <td>{product.additional_details.description}</td>
                                                </tr>
                                                <tr>
                                                    <th>Brand</th>
                                                    <td>{product.brand}</td>
                                                </tr>
                                                <tr>
                                                    <th>Category</th>
                                                    <td>{product.category}</td>
                                                </tr>
                                                <tr>
                                                    <th>Total Stock</th>
                                                    <td>{product.total_stock}</td>
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
                                                                    <td>{item.size}</td>
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
                                                    <td>{product.created_at}</td>
                                                </tr>
                                                <tr>
                                                    <th>Last Updated</th>
                                                    <td>{product.created_at}</td>
                                                </tr>
                                                <tr>
                                                    <th></th>
                                                    <td></td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div className='flex justify-end pt-4 mt-8 space-x-2 border-t border-gray-300'>
                                            <button
                                                className='py-2 px-3 rounded-md text-white text-sm bg-blue-500 hover:brightness-75 flex justify-center items-center space-x-2'
                                                onClick={() => handleEdit(sampleProduct.id)}>
                                                <span><IoPencilSharp /></span>
                                                <span>Edit</span>
                                            </button>
                                            <button
                                                className='py-2 px-3 rounded-md text-white text-sm bg-red-500 hover:brightness-75 flex justify-center items-center space-x-2'
                                                onClick={() => { setShowDeleteModal(true) }}>
                                                <span><IoTrashBinSharp /></span>
                                                <span>Delete</span>
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

export default ManageProducts
