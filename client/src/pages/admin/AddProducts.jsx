import { Dialog, Listbox, RadioGroup, Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import { HiOutlineChevronUpDown } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa6"
import { CiImageOn } from "react-icons/ci";
import { MdDeleteOutline, MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { IoAddOutline, IoAddSharp, IoClose } from "react-icons/io5";

import { Controller, useFieldArray, useForm } from 'react-hook-form';
import ImagePreview from '../../components/ImagePreview';


const importProducts = [
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

const AddProducts = () => {

    const { register, unregister, handleSubmit, formState: { errors }, control, watch, setValue } = useForm();
    const { fields: imageFields, append: imageAppend, remove: imageRemove } = useFieldArray({ name: "images", control })
    const { fields: sizeFields, append: sizeAppend, remove: sizeRemove } = useFieldArray({ name: "sizes", control })
    const { fields: tagsFields, append: tagsAppend, remove: tagsRemove } = useFieldArray({ name: "tags", control })

    const [tag, setTag] = useState('');
    // const [value, setValue] = useState({ tags: [] })
    const categories = ["Running", "Basketball", "Casual", "Athletic", "Training", "Skateboarding"];
    const brands = ["Nike", "Adidas", "Jordan", "Reebok", "Puma", "New Balance", "Vans", "Converse", "Under Armour"];
    const sizes = ['7', "8", "9", "10", "11"];
    const occasions = [
        "Casual Outing",
        "Running Errands",
        "Weekend Brunch",
        "Outdoor Adventure",
        "Gym Workout",
        "Traveling",
        "Walking the Dog",
        "Beach Day",
        "Picnic in the Park",
        "Date Night",
        "Music Festival",
        "Sporting Event",
        "Backyard BBQ",
        "Family Gathering",
        "Night Out with Friends",
        "Movie Night",
        "Outdoor Concert",
        "Fitness Class",
        "Shopping Trip",
        "City Exploration"
        // Add more occasions as needed
    ];
    const colors = [
        { name: "Red", hex: "#FF0000" },
        { name: "Green", hex: "#00FF00" },
        { name: "Blue", hex: "#0000FF" },
        { name: "Yellow", hex: "#FFFF00" },
        { name: "Orange", hex: "#FFA500" },
        { name: "Purple", hex: "#800080" },
        { name: "Pink", hex: "#FFC0CB" },
        { name: "Cyan", hex: "#00FFFF" },
        { name: "Magenta", hex: "#FF00FF" },
        { name: "Lime", hex: "#00FF00" }
    ];
    const [catValue, setCatValue] = useState(categories[0]);
    const [brandValue, setBrandValue] = useState(brands[0]);

    const [showImportModal, setShowImportModal] = useState(false);

    // const initialState = {
    //     title: "",
    //     short_desc: "",
    //     category: "",
    //     brand: "",
    //     images: [],
    //     sizes: [
    //         { size: null, stock: 0, price: 0, discountPercentage: 0, def_currency: "inr" }
    //     ],
    //     long_description: "",
    //     materials: [],
    //     dimensions: {
    //         unit: "inch",
    //         length: 0,
    //         width: 0,
    //         height: 0
    //     },
    //     weight: {
    //         unit: "kg",
    //         value: 0
    //     }
    // }


    return (
        <div className='py-8 px-6'>
            <ImportModal showImportModal={showImportModal} setShowImportModal={setShowImportModal} />
            <h1 className='text-2xl font-bold uppercase mb-4'>Add a New Product</h1>
            <div className='my-8'>
                <button
                    className='flex justify-between items-center space-x-2 py-3 px-6 uppercase rounded-md bg-black text-white hover:scale-105 duration-150'
                    onClick={() => { setShowImportModal(true) }}
                >
                    <span>Import from Existing</span>
                    <span className='text-lg'><IoAddSharp /></span>
                </button>
            </div>
            <div>
                <form onSubmit={handleSubmit(data => { console.log(data) })}>
                    <div className='max-w-3xl grid grid-cols-2 gap-x-2'>

                        {/* title */}
                        <div className="col-span-2 relative z-0 w-full mb-5 group">
                            <input
                                {...register("title")}
                                type="text"
                                id="title"
                                className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer"
                                placeholder=" "
                                required=""
                            />
                            <label
                                htmlFor="title"
                                className="peer-focus:font-medium absolute text-sm text-muted-text duration-300 transform -translate-y-8 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 start-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 cursor-text"
                            >
                                Title of the Product
                            </label>
                        </div>

                        {/* short Description */}
                        <div className="col-span-2 relative z-0 w-full mb-5 group">
                            <textarea
                                {...register("short_desc")}
                                type="text"
                                id="short_desc"
                                className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black resize-y peer"
                                style={{ minHeight: '45px', maxHeight: '100px' }}
                                placeholder=" "
                                required=""
                            />
                            <label
                                htmlFor="short_desc"
                                className="peer-focus:font-medium absolute text-sm text-muted-text duration-300 transform -translate-y-8 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 start-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 cursor-text"
                            >
                                Short Description
                            </label>
                        </div>


                        {/* category */}
                        <div className='col-span-1'>
                            <Controller
                                name="category"
                                control={control}
                                defaultValue={categories[0]}
                                render={({ field: { onChange, value } }) => (
                                    <Listbox value={value} onChange={onChange}>
                                        <div className="relative mt-1">
                                            <label
                                                className="text-muted-text text-sm mb-2"
                                            >
                                                Select Category
                                            </label>
                                            <Listbox.Button className="relative w-full cursor-pointer bg-white py-2 pl-3 pr-10 text-left sm:text-sm border-b-2 border-gray-300">
                                                <span className="block truncate">{value}</span>
                                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                    <HiOutlineChevronUpDown
                                                        className="h-5 w-5 text-gray-400"
                                                    />
                                                </span>
                                            </Listbox.Button>
                                            <Transition
                                                as={Fragment}
                                                leave="transition ease-in duration-100"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <Listbox.Options className="absolute z-10 mt-2 max-h-60 w-full overflow-auto  bg-white py-1 text-base  sm:text-sm border border-muted-text">
                                                    {categories.map((category, idx) => (
                                                        <Listbox.Option
                                                            key={idx}
                                                            className={({ active }) =>
                                                                `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-gray-200 text-text' : 'text-muted-text'
                                                                }`
                                                            }
                                                            value={category}
                                                        >
                                                            {({ selected }) => (
                                                                <>
                                                                    <span
                                                                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                            }`}
                                                                    >
                                                                        {category}
                                                                    </span>
                                                                    {selected ? (
                                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-text">
                                                                            <FaCheck className="h-5 w-5" aria-hidden="true" />
                                                                        </span>
                                                                    ) : null}
                                                                </>
                                                            )}
                                                        </Listbox.Option>
                                                    ))}
                                                </Listbox.Options>
                                            </Transition>
                                        </div>
                                    </Listbox>
                                )}
                            />
                        </div>

                        {/* brand */}
                        <div className='col-span-1'>
                            <Controller
                                name="brand"
                                defaultValue={brands[0]}
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Listbox value={value} onChange={onChange}>
                                        <div className="relative mt-1">
                                            <label
                                                htmlFor="category"
                                                className="text-muted-text text-sm mb-2"
                                            >
                                                Select Brand
                                            </label>
                                            <Listbox.Button className="relative w-full cursor-pointer bg-white py-2 pl-3 pr-10 text-left sm:text-sm border-b-2 border-gray-300">
                                                <span className="block truncate">{value}</span>
                                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                    <HiOutlineChevronUpDown
                                                        className="h-5 w-5 text-gray-400"
                                                    />
                                                </span>
                                            </Listbox.Button>
                                            <Transition
                                                as={Fragment}
                                                leave="transition ease-in duration-100"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <Listbox.Options className="absolute z-10 mt-2 max-h-60 w-full overflow-auto  bg-white py-1 text-base  sm:text-sm border border-muted-text">
                                                    {brands.map((brand, idx) => (
                                                        <Listbox.Option
                                                            key={idx}
                                                            className={({ active }) =>
                                                                `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-gray-200 text-text' : 'text-muted-text'
                                                                }`
                                                            }
                                                            value={brand}
                                                        >
                                                            {({ selected }) => (
                                                                <>
                                                                    <span
                                                                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                            }`}
                                                                    >
                                                                        {brand}
                                                                    </span>
                                                                    {selected ? (
                                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-text">
                                                                            <FaCheck className="h-5 w-5" aria-hidden="true" />
                                                                        </span>
                                                                    ) : null}
                                                                </>
                                                            )}
                                                        </Listbox.Option>
                                                    ))}
                                                </Listbox.Options>
                                            </Transition>
                                        </div>
                                    </Listbox>
                                )}
                            />
                        </div>


                        {/* images */}
                        <div className='col-span-2 mt-4'>
                            <span
                                className="text-muted-text text-sm mb-2"
                            >
                                Add Images
                            </span>

                            <div
                                className='mt-2 bg-gray-100 rounded-lg shadow-sm border-dashed border border-gray-300 p-4 flex justify-start items-start flex-wrap'>
                                {imageFields.length > 0 && watch("images").map((card, idx) => (
                                    <div key={idx} className='group relative bg-white border border-gray-200 h-24 w-24 rounded-md me-2 overflow-hidden'>
                                        <div
                                            onClick={() => {
                                                imageRemove(idx);
                                            }}
                                            className='absolute top-0 left-0 w-full h-full bg-black/75 hidden flex-col items-center justify-center cursor-pointer duration-150 group-hover:flex'>
                                            <span className='text-white text-3xl'>
                                                <MdDeleteOutline />
                                            </span>
                                            <span className='text-white text-xs mt-1'>Remove</span>
                                        </div>
                                        <ImagePreview key={idx} file={card} />
                                    </div>
                                ))}
                                <label
                                    htmlFor='images'
                                    className='group relative bg-white border border-gray-200 h-24 w-24 rounded-md me-2 overflow-hidden flex flex-col justify-center items-center cursor-pointer hover:brightness-95'>
                                    <span className='text-muted-text text-3xl'>
                                        <IoAddOutline />
                                    </span>
                                    <span className='text-muted-text text-xs mt-1'>Add</span>
                                    <input
                                        onChange={(e) => { imageAppend([...e.target.files]) }}
                                        type="file"
                                        id='images'
                                        className='hidden invisible opacity-0 appearance-none'
                                        multiple={true}
                                    />
                                </label>
                            </div>
                        </div>

                        {/* sizes and stock */}
                        <div className='col-span-2 mt-4'>
                            <label className='block text-sm text-muted-text'>Fill in the Available Sizes and their Stock</label>
                            <span className='block text-xs text-muted-text'>(First Option you choose will be the default)</span>
                            {sizes.map((size, idx) => (
                                <div key={idx} value="startup" className={'cursor-pointer mb-2'}>
                                    <label htmlFor={'size' + idx} className={`has-[input:checked]:bg-gray-100 cursor-pointer flex justify-start items-center space-x-8 rounded-md p-4`}>
                                        <input
                                            onChange={(e) => {
                                                if (!e.target.checked) {
                                                    const index = sizeFields.findIndex(el => el.size === size)
                                                    sizeRemove(index);
                                                } else {
                                                    sizeAppend({
                                                        size: size,
                                                        stock: 0,
                                                        price: 0,
                                                        discountPercentage: 0,
                                                        def_currency: 'inr'
                                                    })
                                                }
                                            }}
                                            type="checkbox"
                                            id={"size" + idx}
                                            className='peer accent-black' />
                                        <div className='peer-checked:ring-2 ring-gray-400 py-2 px-4 rounded-md shadow-md'>
                                            {size}
                                        </div>
                                        {sizeFields.findIndex(el => el.size === size) >= 0 && (
                                            <div className='flex w-full space-x-4'>
                                                <div className="relative z-0 w-full group">
                                                    <input
                                                        onChange={(e) => {
                                                            const index = sizeFields.findIndex((el) => el.size === size)
                                                            if (index >= 0) {
                                                                setValue(`sizes.${index}.stock`, e.target.value)
                                                            }
                                                        }}
                                                        type="number"
                                                        className="block py-2.5 px-2 w-full text-sm text-text bg-white border border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black rounded-md peer"
                                                        placeholder=" "
                                                    />
                                                    <label
                                                        className="peer-focus:font-medium absolute text-sm text-muted-text duration-300 transform -translate-y-8 scale-75 top-3 z-10 pointer-events-none origin-[0] peer-placeholder-shown:start-2 peer-focus:start-0 start-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                                                    >
                                                        Stock
                                                    </label>
                                                </div>
                                                <div className="relative z-0 w-full group">
                                                    <input
                                                        onChange={(e) => {
                                                            const index = sizeFields.findIndex((el) => el.size === size)
                                                            if (index >= 0) {
                                                                setValue(`sizes.${index}.price`, e.target.value)
                                                            }
                                                        }}
                                                        type="number"
                                                        className="block py-2.5 px-2 w-full text-sm text-text bg-white border border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black rounded-md peer"
                                                        placeholder=" "
                                                    />
                                                    <label
                                                        className="peer-focus:font-medium absolute text-sm text-muted-text duration-300 transform -translate-y-8 scale-75 top-3 z-10 pointer-events-none origin-[0] peer-placeholder-shown:start-2 peer-focus:start-0 start-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                                                    >
                                                        Price
                                                    </label>
                                                </div>
                                                <div className="relative z-0 w-full group">
                                                    <input
                                                        onChange={(e) => {
                                                            const index = sizeFields.findIndex((el) => el.size === size)
                                                            if (index >= 0) {
                                                                setValue(`sizes.${index}.discountPercentage`, e.target.value)
                                                            }
                                                        }}
                                                        type="number"
                                                        className="block py-2.5 px-2 w-full text-sm text-text bg-white border border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black rounded-md peer"
                                                        placeholder=" "
                                                    />
                                                    <label
                                                        className="peer-focus:font-medium absolute text-sm text-muted-text duration-300 transform -translate-y-8 scale-75 top-3 z-10 pointer-events-none origin-[0] peer-placeholder-shown:start-2 peer-focus:start-0 start-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                                                    >
                                                        Discount(%)
                                                    </label>
                                                </div>
                                            </div>
                                        )}
                                    </label>
                                </div>
                            ))}
                        </div>


                        {/* description */}
                        <div className="col-span-2 relative z-0 w-full mt-4 group">
                            <textarea
                                {...register("long_desc")}
                                type="text"
                                id="long_desc"
                                className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black resize-y peer"
                                style={{ minHeight: '75px', maxHeight: '150px' }}
                                placeholder=" "
                            />
                            <label
                                htmlFor="long_desc"
                                className="peer-focus:font-medium absolute text-sm text-muted-text duration-300 transform -translate-y-8 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 start-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                            >
                                Detailed Description
                            </label>
                        </div>

                        {/* shoe materials */}
                        <div className="col-span-1 relative z-0 w-full mt-8 group">
                            <input
                                {...register("shoe_materials")}
                                type="text"
                                id="shoe_materials"
                                className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer"
                                placeholder=" "
                                required=""
                            />
                            <label
                                htmlFor="shoe_materials"
                                className="peer-focus:font-medium absolute text-sm text-muted-text duration-300 transform -translate-y-8 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 start-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 cursor-text"
                            >
                                Shoe Materials (comma seperated)
                            </label>
                        </div>

                        {/* sole materials */}
                        <div className="col-span-1 relative z-0 w-full mt-8 group">
                            <input
                                {...register("sole_materials")}
                                type="text"
                                id="sole_materials"
                                className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer"
                                placeholder=" "
                                required=""
                            />
                            <label
                                htmlFor="sole_materials"
                                className="peer-focus:font-medium absolute text-sm text-muted-text duration-300 transform -translate-y-8 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 start-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 cursor-text"
                            >
                                Sole Materials (comma seperated)
                            </label>
                        </div>

                        {/* colors */}
                        <div className='col-span-2 mt-8'>
                            <label className='text-sm text-muted-text'>Color</label>
                            <div className='col-span-2 flex justify-between items-center space-x-4 mt-6'>
                                <div className="relative z-0 w-full mb-5 group">
                                    <input
                                        {...register("colors.name")}
                                        type="text"
                                        id="color_name"
                                        className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer"
                                        placeholder=" "
                                        required=""
                                    />
                                    <label
                                        htmlFor="color_name"
                                        className="peer-focus:font-medium absolute text-sm text-muted-text duration-300 transform -translate-y-8 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 start-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 cursor-text"
                                    >

                                        Color Name
                                    </label>
                                </div>
                                <div className="col-span-2 relative z-0 w-full mb-5 group">
                                    <input
                                        {...register("colors.value")}
                                        type="color"
                                        id="color_value"
                                        className="block px-1 cursor-pointer w-full peer h-10"
                                        placeholder=" "
                                        required=""
                                    />
                                    <label
                                        htmlFor="color_value"
                                        className="absolute text-sm text-muted-text cursor-pointer -top-6"
                                    >

                                        Color Value
                                    </label>
                                </div>
                            </div>
                        </div>


                        {/* dimensions */}
                        <div className='mt-8 col-span-2'>
                            <label className='text-muted-text text-sm mb-6 block'>Package Dimensions</label>
                            <div className='flex justify-start items-center space-x-4 w-full'>
                                <div className="relative inline group w-full">
                                    <select
                                        {...register("dimensions.unit")}
                                        className="py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-black peer"
                                    >
                                        <option value='inch'>inch</option>
                                        <option value='feet'>feet</option>
                                        <option value='cm'>centimeters(cm)</option>
                                        <option value='m'>meters(m)</option>
                                    </select>
                                    <label
                                        htmlFor="unit"
                                        className="absolute text-sm text-muted-text scale-75 -top-5 left-0"
                                    >
                                        Unit
                                    </label>
                                </div>
                                <div className="relative inline z-0 group w-full">
                                    <input
                                        {...register("dimensions.height")}
                                        type="number"
                                        id="height"
                                        className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer"
                                        placeholder=" "
                                        required=""
                                    />
                                    <label
                                        htmlFor="height"
                                        className="peer-focus:font-medium absolute text-sm text-muted-text duration-300 transform -translate-y-8 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 start-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                                    >
                                        Height
                                    </label>
                                </div>
                                <div className="relative inline-block w-full z-0 group">
                                    <input
                                        {...register("dimensions.width")}
                                        type="number"
                                        id="width"
                                        className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer"
                                        placeholder=" "
                                        required=""
                                    />
                                    <label
                                        htmlFor="width"
                                        className="peer-focus:font-medium absolute text-sm text-muted-text duration-300 transform -translate-y-8 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 start-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                                    >
                                        Width
                                    </label>
                                </div>
                                <div className="relative inline-block w-full z-0 group">
                                    <input
                                        {...register("dimensions.length")}
                                        type="number"
                                        id="length"
                                        className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer"
                                        placeholder=" "
                                        required=""
                                    />
                                    <label
                                        htmlFor="length"
                                        className="peer-focus:font-medium absolute text-sm text-muted-text duration-300 transform -translate-y-8 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 start-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                                    >
                                        Length
                                    </label>
                                </div>


                            </div>
                        </div>

                        {/* weight */}
                        <div className='mt-8 col-span-2'>
                            <label className='text-muted-text text-sm mb-6 block'>Package Weight</label>
                            <div className='flex justify-start items-center space-x-4 w-full'>
                                <div className="relative inline group w-full">
                                    <select
                                        className="py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-black peer"
                                    >
                                        <option value='kg'>KiloGrams</option>
                                        <option value='g'>grams</option>
                                    </select>
                                    <label
                                        htmlFor="unit"
                                        className="absolute text-sm text-muted-text scale-75 -top-5 left-0"
                                    >
                                        Unit
                                    </label>
                                </div>
                                <div className="relative inline z-0 group w-full">
                                    <input
                                        type="number"
                                        name="weight"
                                        id="weight"
                                        className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer"
                                        placeholder=" "
                                        required=""
                                    />
                                    <label
                                        htmlFor="weight"
                                        className="peer-focus:font-medium absolute text-sm text-muted-text duration-300 transform -translate-y-8 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 start-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                                    >
                                        Weight
                                    </label>
                                </div>

                            </div>
                        </div>

                        {/* Occassion */}
                        <div className='col-span-1 mt-8'>
                            <Controller
                                name="occasion"
                                control={control}
                                defaultValue={occasions[0]}
                                render={({ field: { onChange, value } }) => (
                                    <Listbox value={value} onChange={onChange}>
                                        <div className="relative mt-1">
                                            <label
                                                className="text-muted-text text-sm mb-2"
                                            >
                                                Select Occasion
                                            </label>
                                            <Listbox.Button className="relative w-full cursor-pointer bg-gray-100 py-2 pl-3 pr-10 text-left sm:text-sm border-b-2 border-gray-300">
                                                <span className="block truncate">{value}</span>
                                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                    <HiOutlineChevronUpDown
                                                        className="h-5 w-5 text-gray-400"
                                                    />
                                                </span>
                                            </Listbox.Button>
                                            <Transition
                                                as={Fragment}
                                                leave="transition ease-in duration-100"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <Listbox.Options className="absolute z-10 mt-2 max-h-60 w-full overflow-auto  bg-white py-1 text-base  sm:text-sm border border-muted-text">
                                                    {occasions.map((occasion, idx) => (
                                                        <Listbox.Option
                                                            key={idx}
                                                            className={({ active }) =>
                                                                `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-gray-200 text-text' : 'text-muted-text'
                                                                }`
                                                            }
                                                            value={occasion}
                                                        >
                                                            {({ selected }) => (
                                                                <>
                                                                    <span
                                                                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                            }`}
                                                                    >
                                                                        {occasion}
                                                                    </span>
                                                                    {selected ? (
                                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-text">
                                                                            <FaCheck className="h-5 w-5" aria-hidden="true" />
                                                                        </span>
                                                                    ) : null}
                                                                </>
                                                            )}
                                                        </Listbox.Option>
                                                    ))}
                                                </Listbox.Options>
                                            </Transition>
                                        </div>
                                    </Listbox>
                                )}
                            />
                        </div>


                        {/* tags */}
                        <div className='max-w-lg mt-8'>
                            <label className="block text-sm text-muted-text mb-1">
                                Tags (Make the Product Discoverable)
                            </label>
                            {/* {errors.filter(el => el.path === "tags").map((el, index) => {
                                return (
                                    <span key={index} className='block my-1 ms-1 text-red-400 text-xs'>
                                        {el.msg}
                                    </span>
                                )
                            })} */}
                            <div className='flex justify-between items-center bg-gray-100 border-b-2 border-gray-300 p-2'>
                                <input
                                    value={tag}
                                    onChange={(e) => {
                                        const newTag = e.target.value.trim();
                                        setTag(newTag);
                                    }}
                                    type="text" className='w-full bg-transparent' />
                                {tag.length > 0 && (
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (tag != "") {
                                                tagsAppend(tag);
                                                setTag('');
                                            }
                                        }}
                                        className='px-4 py-2 text-sm rounded-md bg-black text-white'>Add</button>
                                )}
                            </div>
                            {tagsFields.length > 0 && (
                                <div className='shadow-sm ring-1 ring-inset ring-gray-300 flex flex-wrap rounded-md bg-white p-2 mt-2'>
                                    {watch("tags").map((el, index) => (
                                        <span key={index} className='flex items-center justify-between bg-black text-white text-xs p-1 me-1 mb-1 rounded-md'>
                                            <span>{el}</span>
                                            <button onClick={(e) => {
                                                e.preventDefault();
                                                tagsRemove(index);
                                            }} >
                                                <IoClose />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>



                        {/* action buttons */}
                        <div className='col-span-2 flex justify-end items-center space-x-4 mt-8 py-4 border-t border-gray-300'>
                            <button className='py-2 px-4 rounded-md text-text border-text border bg-white text-sm hover:brightness-90'>
                                Save Draft
                            </button>
                            <button className='py-2 px-4 rounded-md text-white border-text border bg-black text-sm hover:brightness-90'>
                                Publish Product
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProducts


const ImportModal = ({ showImportModal, setShowImportModal }) => {
    return (
        <Transition.Root show={showImportModal} as={Fragment}>
            <Dialog as="div" className="relative z-20" onClose={setShowImportModal}>
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
                                    <h2 className='text-2xl font-bold uppercase'>Import From Existing Product</h2>
                                    <form className='mt-8'>
                                        <label>
                                            Select Product
                                        </label>
                                        <div className='grid grid-cols-2 gap-2 mt-2 max-h-96 overflow-y-auto'>
                                            {importProducts.map((product, idx) => (
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