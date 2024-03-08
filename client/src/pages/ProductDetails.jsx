import React, { Fragment, useState } from 'react';
import { IoCheckmark, IoStar, IoStarOutline } from 'react-icons/io5';
import { register } from 'swiper/element/bundle';
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { Listbox, RadioGroup, Tab, Transition } from '@headlessui/react'
import { PiTruckLight } from "react-icons/pi";
import { RiLoopLeftFill } from "react-icons/ri";
import { MdMoneyOffCsred } from "react-icons/md";
import ImageSlideshowModal from '../components/ImageSlideshowModal';


register();

const ProductDetails = () => {

    const product_images = [
        "https://www.superkicks.in/cdn/shop/files/1-2023-12-21T164952.459.jpg?v=1703157691&width=1946",
        "https://www.superkicks.in/cdn/shop/files/2-2023-12-21T164954.585.jpg?v=1703157691&width=1946",
        "https://www.superkicks.in/cdn/shop/files/3-2023-12-21T164956.153.jpg?v=1703157691&width=1946",
        "https://www.superkicks.in/cdn/shop/files/5_74.jpg?v=1703157691&width=1946",
        "https://www.superkicks.in/cdn/shop/files/6_63.jpg?v=1703157691&width=1946",
        "https://www.superkicks.in/cdn/shop/files/4-2023-12-21T164942.134.jpg?v=1703157691&width=1946"
    ]

    const sizes = [
        {
            size: 'S'
        },
        {
            size: 'M'
        },
        {
            size: 'L'
        },
        {
            size: 'XL'
        },
        {
            size: '2XL'
        },
    ]

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

    const details = [
        {
            tab: "Description",
            data: "WE ARE F(AMI)LY. These Suede VTG sneakers from the second season of PUMA x AMI are guided by the creative vision of the Parisian label, finding the balance between relaxed and refined, amiable and edgy, streetwear and sportswear – just like every item from season one."
        },
        {
            tab: "Specifications",
            data: "manufacturer : Puma India Marketing Private Ltd. country_of_origin : Indonesia imported_by : Puma India Marketing Private Ltd. product_dimensions : weight : 0.95 KG generic_name : SHOE unit_of_measurement : 1 Pair marketed_by : Superkicks India Pvt. Ltd. article_code : 38667401"
        }
    ]

    const [selected, setSelected] = useState(sizes[0])

    return (

        // todo : description section just below image slideshow in desktop and at the bottom in mobile
        // todo : wishlist button on product images
        <div>
            <div className='md:py-2'>
                {/* breadcrumbs */}
            </div>
            <div className='grid grid-cols-9 md:gap-x-12'>
                <div className='lg:col-span-6 md:col-span-5 col-span-9'>
                    {/* <div className='product_images_wrapper sticky top-0 w-full overflow-hidden bg-white'>
                        <div className='bg-muted-bg cursor-grab active:cursor-grabbing'>
                            <swiper-container
                                style={{ '--swiper-navigation-color': 'var(--muted)', 'marginBottom': '1rem' }}
                                class="product_swiper_upper"
                                thumbs-swiper=".product_swiper_lower"
                                space-between="10"
                                loop='true'
                            >
                                {product_images.map(el => {
                                    return (
                                        <swiper-slide>
                                            <img src={el} className='mx-auto h-96' />
                                        </swiper-slide>
                                    )
                                })}
                            </swiper-container>
                        </div>
                        <div className='h-20'>
                            <swiper-container
                                class="product_swiper_lower"
                                className="product_swiper_lower"
                                space-between="8"
                                free-mode='true'
                                slides-per-view="auto"
                                watch-slides-progress="true"
                            >
                                {product_images.map(el => {
                                    return (
                                        <swiper-slide style={{ "height": '80px', "width": '80px', "overflow": "hidden" }}>
                                            <img src={el} className='object-cover h-full object-center scale-105 hover:scale-100 duration-150 cursor-pointer' />
                                        </swiper-slide>
                                    )
                                })}
                            </swiper-container>
                        </div>
                    </div> */}
                    <ImageSlideshowModal productImages={product_images} />
                </div>


                {/* left side */}
                <div className='lg:col-span-3 md:col-span-4 col-span-9 md:px-0 px-4'>
                    <div>
                        {/* brand */}
                        <span className='text-muted-text text-sm'>NIKE</span>

                        {/* title */}
                        <h1 className='text-3xl font-bold text-text uppercase'>AIR FORCE 1 '07 LV8 'DARK STUCCO/MEDIUM OLIVE-NEUTRAL OLIVE'</h1>

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
                            <span className='text-muted-text text-sm line-through'>{'₹'}11,299</span>
                            <span className='text-text text-xl font-bold ms-2'>{'₹'}6,099</span>
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
                            <RadioGroup>
                                <div className="flex flex-wrap">
                                    {sizes.map((item) => (
                                        <RadioGroup.Option
                                            key={item.size}
                                            value={item.size}
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
                                                                    {item.size}
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
                        </div>

                        {/* in stock */}
                        <div className='flex justify-start items-center mt-4'>
                            <span className='text-lg text-green-500'><FaRegCircleCheck /></span>
                            <span className='text-xs font-bold text-green-500 uppercase ms-1'>in stock</span>
                            {/* <span className='text-lg text-red-500'><IoIosInformationCircleOutline /></span>
                            <span className='text-xs font-bold text-red-500 uppercase ms-1'>only 2 left</span> */}
                        </div>


                        {/* action buttons */}
                        <div className='grid grid-cols-4 gap-2 mt-8'>

                            <div className='col-span-1 border border-text text-center'>
                                <Listbox>
                                    <div className="relative">
                                        <Listbox.Button className="relative py-4 w-full cursor-pointer bg-white text-center sm:text-sm">
                                            <span className="block truncate">{'Qty'}</span>
                                        </Listbox.Button>
                                        <Transition
                                            as={Fragment}
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Listbox.Options className="absolute mt-2 border border-black max-h-60 min-w-12 w-full overflow-auto shadow-lg bg-white py-1 text-base sm:text-sm">
                                                {[1, 2, 3, 4, 5].map((person, personIdx) => (
                                                    <Listbox.Option
                                                        key={personIdx}
                                                        className={({ active, selected }) =>
                                                            `relative cursor-pointer py-2 ${active ? 'bg-muted-bg text-text' : 'text-gray-900'
                                                            } ${selected ? 'bg-muted-bg text-text' : ''}`
                                                        }
                                                        value={person}
                                                    >
                                                        {({ selected }) => (
                                                            <>
                                                                <span
                                                                    className={`block truncate ${selected ? 'font-medium bg-muted-bg' : 'font-normal'
                                                                        }`}
                                                                >
                                                                    {person}
                                                                </span>
                                                                {/* {selected ? (
                                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                    </span>
                                                                ) : null} */}
                                                            </>
                                                        )}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </Transition>
                                    </div>
                                </Listbox>
                            </div>


                            <div className='col-span-3'>
                                <button className='w-full py-4 text-center text-white bg-black'>
                                    ADD TO CART
                                </button>
                            </div>
                            <div className='col-span-4'>
                                <button className='w-full border border-text py-4 text-center text-text bg-white'>
                                    BUY NOW
                                </button>
                            </div>
                        </div>

                        {/* additional info like shipping details, returns  */}
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
                </div>
                <div className='lg:col-span-6 md:col-span-5 col-span-9 mt-16 outline-none xl:px-0 px-4'>
                    {/* details tabs */}
                    <Tab.Group>
                        <Tab.List className="flex space-x-0 w-full bg-white">
                            {details.map((el) => (
                                <Tab
                                    key={el.tab}
                                    className={({ selected }) =>
                                    (
                                        `py-4 px-6 text-sm outline-none uppercase duration-150 ${selected
                                            ? 'bg-white text-text border-b-2 border-text bg-muted-bg font-bold'
                                            : 'text-muted-text'}`
                                    )
                                    }
                                >
                                    {el.tab}
                                </Tab>
                            ))}
                        </Tab.List>
                        <Tab.Panels className="mt-2">
                            {details.map((el, idx) => (
                                <Tab.Panel
                                    key={idx}
                                    className='bg-white p-3'
                                >
                                    <p>
                                        {el.data}
                                    </p>
                                </Tab.Panel>
                            ))}
                        </Tab.Panels>
                    </Tab.Group>

                </div>
            </div>
        </div >
    )
}

export default ProductDetails
