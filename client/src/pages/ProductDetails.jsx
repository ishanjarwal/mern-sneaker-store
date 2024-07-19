import React, { Fragment, useEffect, useState } from 'react';
import { IoAdd, IoCheckmark, IoHeartCircle, IoHeartOutline, IoHeartSharp, IoRemove, IoStar, IoStarOutline } from 'react-icons/io5';
import { register } from 'swiper/element/bundle';
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { RadioGroup, Tab } from '@headlessui/react'
import { PiTruckLight } from "react-icons/pi";
import { RiLoopLeftFill } from "react-icons/ri";
import { MdMoneyOffCsred } from "react-icons/md";
import ImageSlideshowModal from '../components/ImageSlideshowModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductByIdAsync } from '../slices/productSlice';
import { useParams } from 'react-router-dom';
import { addToCartAsync, showCart } from '../slices/cartSlice';
import { addToWishlistAsync, deleteFromWishlistAsync } from '../slices/wishlistSlice';
import QuantitySetter from '../components/QuantitySetter';


register();

const ProductDetails = () => {

    // todo : toggle in stock and out of stock


    const { id: pid } = useParams();
    const product = useSelector(state => state.product.currProduct);
    const dispatch = useDispatch();
    const wishlistItems = useSelector(state => state.wishlist.items);
    const wishlistState = useSelector(state => state.wishlist.state);
    const cartItems = useSelector(state => state.cart.items);
    const user = useSelector(state => state.user.currUser);

    const [maxQty, setMaxQty] = useState(0);

    const [qty, setQty] = useState(1);
    const [size, setSize] = useState(null);
    function addToCart() {
        const data = {
            product_id: product._id,
            size: size || product.currSize._id,
            qty: qty
        }
        dispatch(addToCartAsync(data))
    }

    useEffect(() => {
        dispatch(fetchProductByIdAsync({ product_id: pid, size: size }))
        setQty(1);
        // document.documentElement.scrollTop = 0;
    }, [pid, size]);

    useEffect(() => {
        setQty(1);
    }, [cartItems]);

    useEffect(() => {
        const foundItem = cartItems.find(item => {
            return ((item.product._id == product?._id) && (item.size._id == product?.currSize._id))
        })
        const stock = foundItem?.availableStock !== null && foundItem?.availableStock !== undefined ? foundItem.availableStock : product?.currSize.stock
        setMaxQty(stock);
    }, [cartItems, product]);

    const variants = [
        {
            id: 1,
            thumbnail: "https://www.superkicks.in/cdn/shop/files/1_ae69bcc9-3245-4c00-bf24-5507ed4caee0.jpg?v=1701435941&width=1946",
        },
        {
            id: 2,
            thumbnail: "https://www.superkicks.in/cdn/shop/files/2_b1418517-bed6-4da9-8d44-bc760f7dd04d.jpg?v=1698738108&width=1946",
        },
        {
            id: 3,
            thumbnail: "https://www.superkicks.in/cdn/shop/products/1-36_f543dbe4-989b-4933-8d52-691931db30a9.jpg?v=1675975222&width=1946",
        },
    ]


    return (
        <div>
            {product && (
                <div>
                    <div className='md:py-2'>
                        {/* breadcrumbs */}
                    </div>
                    <div className='grid grid-cols-9 md:gap-x-12'>

                        {/* image slideshow */}
                        <div className='lg:col-span-5 col-span-9'>
                            <div className='md:sticky top-0'>
                                {/* image slideshow */}
                                {product && <ImageSlideshowModal key={product._id} productImages={product.images} />}
                                {/* wishlist button */}
                                {wishlistState == 'pending' ? (
                                    <span
                                        className='absolute md:top-4 top-16 bg-white lg:w-12 lg:h-12 w-10 h-10 rounded-full flex justify-center items-center lg:text-2xl text-xl hover:bg-muted-bg right-4 duration-150' style={{ "zIndex": 1 }}
                                        title={`${wishlistItems.find(el => el._id == product._id) ? "Remove from Wishlist" : "Add to Wishlist"}`}
                                    >
                                        <IoHeartOutline />
                                    </span>
                                ) : (
                                    <button
                                        className='absolute md:top-4 top-16 bg-white lg:w-12 lg:h-12 w-10 h-10 rounded-full flex justify-center items-center lg:text-2xl text-xl hover:bg-muted-bg right-4 duration-150' style={{ "zIndex": 1 }}
                                        onClick={() => {
                                            if (wishlistItems.find(el => el._id == product._id)) {
                                                dispatch(deleteFromWishlistAsync(product._id))
                                            } else {
                                                dispatch(addToWishlistAsync(product._id))
                                            }
                                        }}
                                        title={`${wishlistItems.find(el => el._id == product._id) ? "Remove from Wishlist" : "Add to Wishlist"}`}
                                    >
                                        {wishlistItems.find(el => el._id == product._id) ?
                                            <IoHeartSharp className='text-red-500' />
                                            :
                                            <IoHeartOutline />}
                                    </button>
                                )}
                            </div>

                        </div>

                        {/* left side */}
                        <div className='lg:col-span-4 col-span-9 lg:px-0 px-4'>

                            {/* general */}
                            <div>
                                {/* brand */}
                                <span className='text-muted-text text-sm'>{product.brand.name}</span>

                                {/* title */}
                                <h1 className='text-3xl font-bold text-text uppercase'>{product.name}</h1>

                                {/* reviews  */}
                                <div className='flex justify-start items-center mt-4'>
                                    {/* create an array of length = no. of rating after truncating */}
                                    <div className='flex justify-start items-center'>
                                        {[1, 1, 1, 1].map((el, index) => (
                                            <span key={index} className='text-orange-300 text-sm'>
                                                <IoStar />
                                            </span>
                                        ))}
                                        <span className='text-orange-300 text-sm'>
                                            <IoStarOutline />
                                        </span>
                                    </div>
                                    <span className='text-xs text-muted-text ms-1'>(21 Reviews)</span>
                                </div>

                                {/* price */}
                                <div className='flex items-center justify-start mt-4'>
                                    <span className='text-muted-text text-sm line-through'>
                                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, })
                                            .format(product.currSize.mrp)}
                                    </span>
                                    <span className='text-text text-xl font-bold ms-2'>
                                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, })
                                            .format(product.currSize.sp)}
                                    </span>
                                </div>

                                {/* variants if any */}
                                <div className='mt-4'>
                                    <span className='text-text font-bold text-sm mb-2'>VARIANTS</span>
                                    <RadioGroup>
                                        <div className="flex flex-wrap">
                                            {variants.map((item, index) => (
                                                <RadioGroup.Option
                                                    key={index}
                                                    value={item.id}
                                                    className={({ active, checked }) =>
                                                        `${checked ? 'border-black border-2 scale-105' : 'border-gray-300'}
                                                relative flex cursor-pointer rounded-lg p-2 border border-text me-2 mb-2 bg-muted-bg`
                                                    }
                                                >
                                                    <div className="flex w-full items-center justify-center">
                                                        <img src={item.thumbnail} className='h-8' alt="" />
                                                    </div>
                                                </RadioGroup.Option>
                                            ))}
                                        </div>
                                    </RadioGroup>
                                </div>

                                {/* size */}
                                <div className='mt-2'>
                                    <span className='text-text font-bold text-sm mb-2'>SIZE</span>
                                    {product && (

                                        <RadioGroup value={product.currSize._id} onChange={setSize}>
                                            <div className="flex flex-wrap">
                                                {product.sizes.map((size, idx) => (
                                                    <RadioGroup.Option
                                                        key={idx}
                                                        value={size._id}
                                                        className={({ active, checked }) =>
                                                            `${checked ? 'bg-black text-white hover:bg-black' : 'bg-white text-text hover:bg-muted-bg'}
                                                relative flex cursor-pointer rounded-lg px-6 py-4 border border-text me-2 mb-2  duration-150`
                                                        }
                                                    >
                                                        {({ active, checked }) => (
                                                            <>
                                                                <div className="flex w-full items-center justify-center">
                                                                    <div className="flex items-center">
                                                                        <div className="text-sm">
                                                                            <RadioGroup.Label
                                                                                as="p"
                                                                                className={`font-medium  ${checked ? 'text-white' : 'text-text'
                                                                                    }`}
                                                                            >
                                                                                {size.label}
                                                                            </RadioGroup.Label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )}
                                                    </RadioGroup.Option>
                                                ))}
                                            </div>
                                        </RadioGroup>
                                    )}
                                </div>

                                {/* in stock */}
                                <div className='flex justify-start items-center mt-4'>
                                    {product.currSize.stock > 0 ? (
                                        <>
                                            <span className='text-lg text-green-500'><FaRegCircleCheck /></span>
                                            <span className='text-xs font-bold text-green-500 uppercase ms-1'>in stock</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className='text-lg text-red-500'><IoIosInformationCircleOutline /></span>
                                            <span className='text-xs font-bold text-red-500 uppercase ms-1'>Out of Stock</span>
                                        </>
                                    )}

                                </div>


                                {/* action buttons */}
                                <div className='grid grid-cols-4 gap-2 mt-8'>
                                    {/* qty */}
                                    {(maxQty != 0 && product?.currSize.stock != 0) &&
                                        <QuantitySetter qty={qty} setQty={setQty} max={maxQty} />
                                    }
                                    {cartItems.find(item => {
                                        return ((item.product._id == product._id) && (item.size._id == product.currSize._id))
                                    })?.availableStock == 0 &&
                                        <div className='py-4 col-span-4'>
                                            <p className='text-center text-lg font-bold'>
                                                All Stock of this product is already in your&nbsp;
                                                <button
                                                    onClick={() => {
                                                        dispatch(showCart())
                                                    }}
                                                    className='underline'>
                                                    Cart
                                                </button>
                                            </p>
                                        </div>
                                    }
                                    <div className='col-span-4'>
                                        <button
                                            className={`${maxQty > 0 ? "cursor-pointer bg-black" : "cursor-not-allowed bg-zinc-700"} w-full py-4 text-center text-white rounded-full`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (maxQty > 0) {
                                                    addToCart();
                                                }
                                            }}
                                            disabled={maxQty <= 0}
                                        >
                                            ADD TO CART
                                        </button>
                                    </div>
                                    <div className='col-span-4'>
                                        <button
                                            className={`${maxQty > 0 ? "cursor-pointer" : "cursor-not-allowed"} w-full py-4 text-center text-black rounded-full border-black border`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (maxQty > 0) {
                                                    addToCart();
                                                    dispatch(showCart())
                                                }
                                            }}
                                            disabled={maxQty <= 0}
                                        >
                                            BUY NOW
                                        </button>
                                    </div>
                                </div>

                                {/* additional info like shipping details, returns from delivery api */}
                                <div className='mt-4 flex flex-col space-y-2'>
                                    <span className='flex justify-start items-center py-4 px-4 rounded-md bg-muted-bg'>
                                        <span className='me-4 text-green-500 text-2xl'><PiTruckLight /></span>
                                        <span className='text-text text-sm'>7 Day Delivery</span>
                                    </span>
                                    <span className='flex justify-start items-center py-4 px-4 rounded-md bg-muted-bg'>
                                        <span className='me-4 text-green-500 text-2xl'><RiLoopLeftFill /></span>
                                        <span className='text-text text-sm'>30 Days Hazzlefree Returns</span>
                                    </span>
                                    <span className='flex justify-start items-center py-4 px-4 rounded-md bg-muted-bg'>
                                        <span className='me-4 text-green-500 text-2xl'><MdMoneyOffCsred /></span>
                                        <span className='text-text text-sm'>Free Shipping</span>
                                    </span>
                                </div>

                            </div>

                            {/* tabs */}
                            <div className='md:mt-12 mt-6 outline-none lg:px-0 px-2'>
                                <Tab.Group>
                                    <Tab.List className="flex space-x-0 w-full bg-white">

                                        {/* description tab */}
                                        <Tab
                                            className={({ selected }) =>
                                            (
                                                `py-4 px-6 text-sm outline-none uppercase duration-150 ${selected
                                                    ? 'bg-white text-text border-b-2 border-text bg-muted-bg font-bold'
                                                    : 'text-muted-text border-b-2 border-gray-100'}`
                                            )
                                            }
                                        >
                                            Product Description
                                        </Tab>

                                        {/* specs tab */}
                                        <Tab
                                            className={({ selected }) =>
                                            (
                                                `py-4 px-6 text-sm outline-none uppercase duration-150 ${selected
                                                    ? 'bg-white text-text border-b-2 border-text bg-muted-bg font-bold'
                                                    : 'text-muted-text border-b-2 border-gray-100'}`
                                            )
                                            }
                                        >
                                            Specifications
                                        </Tab>

                                    </Tab.List>
                                    <Tab.Panels className="mt-2">

                                        {/* description */}
                                        <Tab.Panel
                                            className='bg-white p-3'
                                        >
                                            <p className='text-sm text-muted-text'>
                                                {/* {product.additional_details.description.map((line, index) => (
                                                <span className='block' key={index}>{line}<br /></span>
                                            ))} */}
                                                {product.additional_details.description}
                                            </p>
                                        </Tab.Panel>

                                        {/* specs */}
                                        {product && (
                                            <Tab.Panel
                                                className='bg-white p-3'
                                            >
                                                <div className='grid sm:grid-cols-2 gap-4'>


                                                    {/* shoe material */}
                                                    <div className='px-4 py-2 rounded-md bg-muted-bg'>
                                                        <span className='text-xs text-muted-text uppercase'>Shoe Materials</span>
                                                        <p className='text-xs font-bold capitalize'>{product.additional_details.specifications.shoe_materials.join(", ")}</p>
                                                    </div>

                                                    {/* sole material */}
                                                    <div className='px-4 py-2 rounded-md bg-muted-bg'>
                                                        <span className='text-xs text-muted-text uppercase'>Sole Materials</span>
                                                        <p className='text-xs font-bold capitalize'>{product.additional_details.specifications.sole_materials.join(", ")}</p>
                                                    </div>

                                                    {/* occasion */}
                                                    <div className='px-4 py-2 rounded-md bg-muted-bg'>
                                                        <span className='text-xs text-muted-text uppercase'>Occasion</span>
                                                        <p className='text-xs font-bold capitalize'>{product.additional_details.specifications.occasion}</p>
                                                    </div>

                                                    {/* color */}
                                                    <div className='px-4 py-2 rounded-md bg-muted-bg'>
                                                        <span className='text-xs text-muted-text uppercase'>Color</span>
                                                        <div className='flex justify-start space-x-2 items-center'>
                                                            <span className='w-4 h-4 block rounded-full' style={{ backgroundColor: product.additional_details.specifications.color.hex }}></span>
                                                            <p className='text-xs font-bold capitalize'>{product.additional_details.specifications.color.name}</p>
                                                        </div>
                                                    </div>

                                                    {/* dimensions */}
                                                    <div className='px-4 py-2 rounded-md bg-muted-bg'>
                                                        <span className='text-xs text-muted-text uppercase'>Dimensions</span>
                                                        <p className='text-xs font-bold'>width : {product.additional_details.specifications.dimensions.width}{" "}{product.additional_details.specifications.dimensions.unit}</p>
                                                        <p className='text-xs font-bold'>length : {product.additional_details.specifications.dimensions.length}{" "}{product.additional_details.specifications.dimensions.unit}</p>
                                                        <p className='text-xs font-bold'>height : {product.additional_details.specifications.dimensions.height}{" "}{product.additional_details.specifications.dimensions.unit}</p>
                                                    </div>

                                                    {/* weight */}
                                                    <div className='px-4 py-2 rounded-md bg-muted-bg'>
                                                        <span className='text-xs text-muted-text uppercase'>Weight</span>
                                                        <p className='text-xs font-bold capitalize'>{product.additional_details.specifications.weight.value}{" "}{product.additional_details.specifications.weight.unit}</p>
                                                    </div>
                                                </div>
                                            </Tab.Panel>
                                        )}

                                    </Tab.Panels>
                                </Tab.Group>

                            </div>
                        </div>

                        {/* details tabs */}

                    </div>

                    {/* related products */}
                </div >
            )
            }
        </div >
    )


}

export default ProductDetails
