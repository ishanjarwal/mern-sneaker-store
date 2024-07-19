import { Dialog, Listbox, RadioGroup, Transition } from '@headlessui/react'
import React, { Fragment, useEffect, useState } from 'react'
import { HiOutlineChevronUpDown } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa6"
import { MdCallMissedOutgoing, MdDeleteOutline } from "react-icons/md";
import { IoAddOutline, IoAddSharp, IoClose, IoTrashBinOutline } from "react-icons/io5";
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import ImagePreview from '../../components/ImagePreview';
import { createProductAsync } from '../../slices/productSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import { DOMAIN } from '../../app/constants';
import isValidJSON from '../../utils/isValidJSON.js';


const AddProducts = () => {

    // todo : cod availability

    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const state = useSelector(state => state.product.state)
    const validationErrors = useSelector(state => state.product.validationErrors);
    const categories = useSelector(state => state.category.categories)
    const brands = useSelector(state => state.brand.brands)
    const { register, handleSubmit, formState: { errors }, control, watch, setValue, getValues } = useForm({
        defaultValues: {
            name: "",
            short_desc: "",
            description: "",
            sizes: [], // Empty array
            category: {}, // Empty object
            brand: {}, // Empty object
            dimensions: {}, // Empty object
            shoe_materials: "",
            sole_materials: "",
            occasion: "",
            gender: "",
            tags: [], // Empty array
            color: {}, // Empty object
            weight: {}, // Empty object
            meta_info: {} // Empty object
        }
    });
    const { fields: imageFields, append: imageAppend, remove: imageRemove } = useFieldArray({ name: "images", control })
    const { fields: sizeFields, append: sizeAppend, remove: sizeRemove } = useFieldArray({
        name: "sizes", control
    })
    const { fields: tagsFields, append: tagsAppend, remove: tagsRemove } = useFieldArray({
        name: "tags", control
    })
    const { fields: customFields, append: customAppend, remove: customRemove } = useFieldArray({ name: "custom", control })


    const [tag, setTag] = useState('');
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
    const genders = ['men', 'women', 'kids', 'unisex'];

    const [showImportModal, setShowImportModal] = useState(false);
    const [importedProduct, setImportedProduct] = useState(null);
    function fillInputsWithImportedProduct() {
        setValue("name", importedProduct?.name)
        setValue("short_desc", importedProduct?.short_desc)
        setValue("category", importedProduct?.category)
        setValue("brand", importedProduct?.brand)
        setValue("description", importedProduct?.additional_details.description)
        setValue("shoe_materials", importedProduct?.additional_details.specifications.shoe_materials.join(', '))
        setValue("sole_materials", importedProduct?.additional_details.specifications.sole_materials.join(', '))
        setValue("color", importedProduct?.additional_details.specifications.color)
        setValue("dimensions", importedProduct?.additional_details.specifications.dimensions)
        setValue("weight", importedProduct?.additional_details.specifications.weight)
        setValue("meta_info", importedProduct?.meta_info)
        setValue("tags", importedProduct?.additional_details.specifications.tags)
        setValue("sizes", importedProduct?.sizes)
        setValue("gender", importedProduct?.additional_details.specifications.gender)
        setValue("occasion", importedProduct?.additional_details.specifications.occasion)
    }
    useEffect(() => {
        if (importedProduct) {
            fillInputsWithImportedProduct();
        }
    }, [importedProduct]);


    async function sendData(data) {
        dispatch(createProductAsync(data));
    }


    return (
        <div className='py-8 px-6'>
            <ImportModal
                showImportModal={showImportModal}
                setShowImportModal={setShowImportModal}
                setImportedProduct={setImportedProduct}
                importedProduct={importedProduct}
            />
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
                <form encType="multipart/mixed" onSubmit={handleSubmit(data => { sendData(data) })}>
                    <div className='max-w-3xl grid grid-cols-2 gap-x-2'>

                        {/* name */}
                        <div className="col-span-2 relative z-0 w-full mb-5 group">
                            <input
                                {...register("name")}
                                type="text"
                                className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 appearance-none  focus:outline-none focus:ring-0 border-gray-300 focus:border-black peer"
                                placeholder=" "
                            />
                            <label
                                className="peer-focus:font-medium absolute text-sm text-muted-text duration-300 transform -translate-y-8 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 start-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 cursor-text pointer-events-none"
                            >
                                Name/Title of the Product
                            </label>
                            {validationErrors?.['name'] && (
                                <span className='text-red-400 text-xs'>{validationErrors['name']}</span>
                            )}
                        </div>

                        {/* short Description */}
                        <div className="col-span-2 relative z-0 w-full mb-5 group">
                            <textarea
                                {...register("short_desc")}
                                type="text"
                                className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 appearance-none  focus:outline-none focus:ring-0 resize-y border-gray-300 focus:border-black peer"
                                style={{ minHeight: '45px', maxHeight: '100px' }}
                                placeholder=" "
                            />
                            <label
                                className="peer-focus:font-medium absolute text-sm text-muted-text duration-300 transform -translate-y-8 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 start-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 pointer-events-none cursor-text"
                            >
                                Short Description
                            </label>
                            {validationErrors?.['short_desc'] && (
                                <span className='text-red-400 text-xs'>{validationErrors['short_desc']}</span>
                            )}
                        </div>


                        {/* category */}
                        <div className='col-span-1'>
                            <Controller
                                name="category"
                                control={control}
                                defaultValue={importedProduct ? importedProduct.category : undefined}
                                render={({ field: { onChange, value } }) => (
                                    <Listbox value={value} onChange={onChange}>
                                        <div className="relative mt-1">
                                            <label
                                                className="block text-muted-text text-sm mb-2"
                                            >
                                                Select Category
                                            </label>
                                            {validationErrors?.['category'] && (
                                                <span className='text-red-400 text-xs'>{validationErrors['category']}</span>
                                            )}
                                            <Listbox.Button className="relative w-full cursor-pointer bg-gray-100 py-2 pl-3 pr-10 text-left sm:text-sm border-b-2 border-gray-300">
                                                {!value && <span>&nbsp;</span>}
                                                <span className="block truncate">{value?.name}</span>
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
                                                    {categories && categories.map((category, idx) => (
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
                                                                        {category.name}
                                                                    </span>
                                                                    {selected ? (
                                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-text">
                                                                            <FaCheck className="h-5 w-5" />
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
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Listbox value={value} onChange={onChange}>
                                        <div className="relative mt-1">
                                            <label
                                                className="block text-muted-text text-sm mb-2"
                                            >
                                                Select Brand
                                            </label>
                                            {validationErrors?.['brand'] && (
                                                <span className='text-red-400 text-xs'>{validationErrors['brand']}</span>
                                            )}
                                            <Listbox.Button className="relative w-full cursor-pointer bg-gray-100 py-2 pl-3 pr-10 text-left sm:text-sm border-b-2 border-gray-300">
                                                {!value && <span>&nbsp;</span>}
                                                <span className="block truncate">{value?.name}</span>
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
                                                    {brands && brands.map((brand, idx) => (
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
                                                                        {brand.name}
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
                                className="block text-muted-text text-sm"
                            >
                                Add Images
                            </span>
                            {validationErrors?.['images'] && (
                                <span className='text-red-400 text-xs'>{validationErrors['images']}</span>
                            )}

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
                                    className='group relative bg-white border border-gray-200 h-24 w-24 rounded-md me-2 overflow-hidden flex flex-col justify-center items-center cursor-pointer hover:brightness-95'>
                                    <span className='text-muted-text text-3xl'>
                                        <IoAddOutline />
                                    </span>
                                    <span className='text-muted-text text-xs mt-1'>Add</span>
                                    <input
                                        onChange={(e) => { imageAppend([...e.target.files]) }}
                                        type="file"
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
                            {validationErrors?.['sizes'] && !isValidJSON(validationErrors['sizes']) && (
                                <span className='text-red-400 text-xs'>{validationErrors['sizes']}</span>
                            )}
                            {sizeFields.length > 0 && (
                                <ul className='mt-8'>
                                    {sizeFields.map((size, idx) => (
                                        <li key={idx} className={'cursor-pointer mb-2 rounded-lg bg-gray-100 pt-6 pb-2 px-3'}>
                                            <div className='flex w-full space-x-4'>
                                                <div className="relative z-0 w-full group">
                                                    <input
                                                        {...register(`sizes.${idx}.label`)}
                                                        type="text"
                                                        className="block py-2.5 px-2 w-full text-sm text-text bg-white border border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black rounded-md peer"
                                                        placeholder=" "
                                                    />
                                                    <label
                                                        className="peer-focus:font-medium absolute text-sm text-muted-text duration-300 transform -translate-y-8 scale-75 top-3 z-10 pointer-events-none origin-[0] peer-placeholder-shown:start-2 peer-focus:start-0 start-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                                                    >
                                                        Size Label
                                                    </label>
                                                    {validationErrors?.['sizes'] && isValidJSON(validationErrors['sizes']) && (
                                                        <span className='text-red-400 text-xs'>{JSON.parse(validationErrors['sizes'])[idx]?.label}</span>
                                                    )}
                                                </div>
                                                <div className="relative z-0 w-full group">
                                                    <input
                                                        {...register(`sizes.${idx}.stock`)}
                                                        type="number"
                                                        className="block py-2.5 px-2 w-full text-sm text-text bg-white border border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black rounded-md peer"
                                                        placeholder=" "
                                                    />
                                                    <label
                                                        className="peer-focus:font-medium absolute text-sm text-muted-text duration-300 transform -translate-y-8 scale-75 top-3 z-10 pointer-events-none origin-[0] peer-placeholder-shown:start-2 peer-focus:start-0 start-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                                                    >
                                                        Stock
                                                    </label>
                                                    {validationErrors?.['sizes'] && isValidJSON(validationErrors['sizes']) && (
                                                        <span className='text-red-400 text-xs'>{JSON.parse(validationErrors['sizes'])[idx]?.stock}</span>
                                                    )}
                                                </div>
                                                <div className="relative z-0 w-full group">
                                                    <input
                                                        {...register(`sizes.${idx}.price`)}
                                                        type="number"
                                                        className="block py-2.5 px-2 w-full text-sm text-text bg-white border border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black rounded-md peer"
                                                        placeholder=" "
                                                    />
                                                    <label
                                                        className="peer-focus:font-medium absolute text-sm text-muted-text duration-300 transform -translate-y-8 scale-75 top-3 z-10 pointer-events-none origin-[0] peer-placeholder-shown:start-2 peer-focus:start-0 start-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                                                    >
                                                        Price
                                                    </label>
                                                    {validationErrors?.['sizes'] && isValidJSON(validationErrors['sizes']) && (
                                                        <span className='text-red-400 text-xs'>{JSON.parse(validationErrors['sizes'])[idx]?.price}</span>
                                                    )}
                                                </div>
                                                <div className="relative z-0 w-full group">
                                                    <input
                                                        {...register(`sizes.${idx}.discountPercentage`)}
                                                        type="number"
                                                        className="block py-2.5 px-2 w-full text-sm text-text bg-white border border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black rounded-md peer"
                                                        placeholder=" "
                                                    />
                                                    <label
                                                        className="peer-focus:font-medium absolute text-sm text-muted-text duration-300 transform -translate-y-8 scale-75 top-3 z-10 pointer-events-none origin-[0] peer-placeholder-shown:start-2 peer-focus:start-0 start-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
                                                    >
                                                        Discount(%)
                                                    </label>
                                                    {validationErrors?.['sizes'] && isValidJSON(validationErrors['sizes']) && (
                                                        <span className='text-red-400 text-xs'>{JSON.parse(validationErrors['sizes'])[idx]?.discountPercentage}</span>
                                                    )}
                                                </div>
                                                <button
                                                    className='py-3 px-3 rounded-md text-red-400 border-gray-300 border bg-white text-sm hover:brightness-90'
                                                    type="button"
                                                    onClick={() => sizeRemove(idx)}>
                                                    <IoTrashBinOutline />
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <button
                                type="button"
                                className='flex items-center justify-center space-x-2 mt-4 py-4 px-4 w-full text-center rounded-lg text-white border-text border bg-black text-sm hover:brightness-90'
                                onClick={() => sizeAppend({ label: "7", price: 0, stock: 1, discountPercentage: 0 })}
                            >
                                <span>
                                    {sizeFields.length > 0 ? "Add More" : "Add Sizes"}
                                </span>
                                <span className='text-lg'>
                                    <IoAddOutline />
                                </span>
                            </button>
                        </div>


                        {/* description */}
                        <div className="col-span-2 relative z-0 w-full mt-8 group">
                            <textarea
                                {...register("description")}
                                type="text"
                                className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black resize-y peer"
                                style={{ minHeight: '75px', maxHeight: '150px' }}
                                placeholder=" "
                            />
                            <label
                                className="peer-focus:font-medium absolute text-sm text-muted-text duration-300 transform -translate-y-8 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 start-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 pointer-events-none"
                            >
                                Detailed Description
                            </label>
                            {validationErrors?.['description'] && (
                                <span className='text-red-400 text-xs'>{validationErrors['description']}</span>
                            )}
                        </div>

                        {/* gender */}
                        <div className='col-span-2 mt-8'>
                            <Controller
                                name="gender"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Listbox value={value} onChange={onChange}>
                                        <div className="relative mt-1">
                                            <label
                                                className="block text-muted-text text-sm"
                                            >
                                                Select Gender
                                            </label>
                                            {validationErrors?.['gender'] && (
                                                <span className='text-red-400 text-xs'>{validationErrors['gender']}</span>
                                            )}
                                            <Listbox.Button className="relative w-full cursor-pointer bg-gray-100 py-2 pl-3 pr-10 text-left sm:text-sm border-b-2 border-gray-300">
                                                {!value && <span>&nbsp;</span>}
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
                                                    {genders.map((gender, idx) => (
                                                        <Listbox.Option
                                                            key={idx}
                                                            className={({ active }) =>
                                                                `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-gray-200 text-text' : 'text-muted-text'
                                                                }`
                                                            }
                                                            value={gender}
                                                        >
                                                            {({ selected }) => (
                                                                <>
                                                                    <span
                                                                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                            }`}
                                                                    >
                                                                        {gender}
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

                        {/* shoe materials */}
                        <div className="col-span-1 relative z-0 w-full mt-8 group">
                            <input
                                {...register("shoe_materials")}
                                type="text"
                                id="shoe_materials"
                                className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer"
                                placeholder=" "
                            />
                            <label
                                htmlFor="shoe_materials"
                                className="peer-focus:font-medium absolute text-sm text-muted-text duration-300 transform -translate-y-8 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 start-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 pointer-events-none cursor-text"
                            >
                                Shoe Materials (comma seperated)
                            </label>
                            {validationErrors?.['shoe_materials'] && (
                                <span className='text-red-400 text-xs'>{validationErrors['shoe_materials']}</span>
                            )}
                        </div>

                        {/* sole materials */}
                        <div className="col-span-1 relative z-0 w-full mt-8 group">
                            <input
                                {...register("sole_materials")}
                                type="text"
                                id="sole_materials"
                                className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer"
                                placeholder=" "
                            />
                            <label
                                htmlFor="sole_materials"
                                className="peer-focus:font-medium absolute text-sm text-muted-text duration-300 transform -translate-y-8 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 start-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 pointer-events-none cursor-text"
                            >
                                Sole Materials (comma seperated)
                            </label>
                            {validationErrors?.['sole_materials'] && (
                                <span className='text-red-400 text-xs'>{validationErrors['sole_materials']}</span>
                            )}
                        </div>

                        {/* colors */}
                        <div className='col-span-2 mt-8'>
                            <label className='text-sm text-muted-text'>Color</label>
                            {validationErrors?.['color'] && !isValidJSON(validationErrors['color']) && (
                                <span className='text-red-400 text-xs'>{validationErrors['color']}</span>
                            )}
                            <div className='col-span-2 flex justify-between items-start space-x-4 mt-6'>
                                <div className="relative z-0 w-full mb-5 group">
                                    <input
                                        {...register("color.name")}
                                        type="text"
                                        className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer"
                                        placeholder=" "
                                    />
                                    <label
                                        className="peer-focus:font-medium absolute text-sm text-muted-text duration-300 transform -translate-y-8 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 start-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 pointer-events-none cursor-text"
                                    >

                                        Color Name
                                    </label>
                                    {validationErrors?.['color'] && isValidJSON(validationErrors['color']) && (
                                        <span className='text-red-400 text-xs'>{JSON.parse(validationErrors['color'])?.['name']}</span>
                                    )}
                                </div>
                                <div className="col-span-2 relative z-0 w-full mb-5 group">
                                    <input
                                        {...register("color.hex")}
                                        defaultValue={getValues("color.hex")}
                                        type="color"
                                        className="block px-1 cursor-pointer w-full peer h-10"
                                        placeholder=" "
                                        required=""
                                    />
                                    <label
                                        className="absolute text-sm text-muted-text cursor-pointer -top-6"
                                    >

                                        Color Value
                                    </label>
                                    {validationErrors?.['color'] && isValidJSON(validationErrors['color']) && (
                                        <span className='text-red-400 text-xs'>{JSON.parse(validationErrors['color'])?.['hex']}</span>
                                    )}
                                </div>
                            </div>
                        </div>


                        {/* dimensions */}
                        <div className='mt-8 col-span-2'>
                            <label className='text-muted-text text-sm mb-6 block'>Package Dimensions</label>
                            {validationErrors?.['dimensions'] && !isValidJSON(validationErrors['dimensions']) && (
                                <span className='text-red-400 text-xs'>{validationErrors['dimensions']}</span>
                            )}
                            <div className='flex justify-start items-start space-x-4 w-full'>
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
                                        className="absolute text-sm text-muted-text scale-75 -top-5 left-0"
                                    >
                                        Unit
                                    </label>
                                    {validationErrors?.['dimensions'] && isValidJSON(validationErrors['dimensions']) && (
                                        <span className='text-red-400 text-xs'>{JSON.parse(validationErrors['dimensions'])?.['unit']}</span>
                                    )}
                                </div>
                                <div className="relative inline z-0 group w-full">
                                    <input
                                        {...register("dimensions.height")}
                                        type="number"
                                        className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer"
                                        placeholder=" "
                                        required=""
                                    />
                                    <label
                                        className="peer-focus:font-medium absolute text-sm text-muted-text duration-300 transform -translate-y-8 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 start-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 pointer-events-none"
                                    >
                                        Height
                                    </label>
                                    {validationErrors?.['dimensions'] && isValidJSON(validationErrors['dimensions']) && (
                                        <span className='text-red-400 text-xs'>{JSON.parse(validationErrors['dimensions'])?.['height']}</span>
                                    )}
                                </div>
                                <div className="relative inline-block w-full z-0 group">
                                    <input
                                        {...register("dimensions.width")}
                                        type="number"
                                        className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer"
                                        placeholder=" "
                                        required=""
                                    />
                                    <label
                                        className="peer-focus:font-medium absolute text-sm text-muted-text duration-300 transform -translate-y-8 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 start-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 pointer-events-none"
                                    >
                                        Width
                                    </label>
                                    {validationErrors?.['dimensions'] && isValidJSON(validationErrors['dimensions']) && (
                                        <span className='text-red-400 text-xs'>{JSON.parse(validationErrors['dimensions'])?.['width']}</span>
                                    )}
                                </div>
                                <div className="relative inline-block w-full z-0 group">
                                    <input
                                        {...register("dimensions.length")}
                                        type="number"
                                        className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer"
                                        placeholder=" "
                                        required=""
                                    />
                                    <label
                                        className="peer-focus:font-medium absolute text-sm text-muted-text duration-300 transform -translate-y-8 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 start-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 pointer-events-none"
                                    >
                                        Length
                                    </label>
                                    {validationErrors?.['dimensions'] && isValidJSON(validationErrors['dimensions']) && (
                                        <span className='text-red-400 text-xs'>{JSON.parse(validationErrors['dimensions'])?.['length']}</span>
                                    )}
                                </div>


                            </div>
                        </div>

                        {/* weight */}
                        <div className='mt-8 col-span-2'>
                            <label className='text-muted-text text-sm mb-6 block'>Package Weight</label>
                            {validationErrors?.['weight'] && !isValidJSON(validationErrors['weight']) && (
                                <span className='text-red-400 text-xs'>{validationErrors['weight']}</span>
                            )}
                            <div className='flex justify-start items-start space-x-4 w-full'>
                                <div className="relative inline group w-full">
                                    <select
                                        {...register("weight.unit")}
                                        className="py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-black peer"
                                    >
                                        <option value='kg'>KiloGrams</option>
                                        <option value='g'>grams</option>
                                    </select>
                                    <label
                                        className="absolute text-sm text-muted-text scale-75 -top-5 left-0"
                                    >
                                        Unit
                                    </label>
                                    {validationErrors?.['weight'] && isValidJSON(validationErrors['weight']) && (
                                        <span className='text-red-400 text-xs'>{JSON.parse(validationErrors['weight'])?.['unit']}</span>
                                    )}
                                </div>
                                <div className="relative inline z-0 group w-full">
                                    <input
                                        {...register("weight.value")}
                                        type="number"
                                        className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer"
                                        placeholder=" "
                                    />
                                    <label
                                        className="peer-focus:font-medium absolute text-sm text-muted-text duration-300 transform -translate-y-8 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 start-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 pointer-events-none"
                                    >
                                        Weight
                                    </label>
                                    {validationErrors?.['weight'] && isValidJSON(validationErrors['weight']) && (
                                        <span className='text-red-400 text-xs'>{JSON.parse(validationErrors['weight'])?.['value']}</span>
                                    )}
                                </div>

                            </div>
                        </div>

                        {/* Occassion */}
                        <div className='col-span-1 mt-8'>
                            <Controller
                                name="occasion"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Listbox value={value} onChange={onChange}>
                                        <div className="relative mt-1">
                                            <label
                                                className="block text-muted-text text-sm"
                                            >
                                                Select Occasion
                                            </label>
                                            <Listbox.Button className="relative w-full cursor-pointer bg-gray-100 py-2 pl-3 pr-10 text-left sm:text-sm border-b-2 border-gray-300">
                                                {!value && <span>&nbsp;</span>}
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
                                        {validationErrors?.['occasion'] && (
                                            <span className='text-red-400 text-xs'>{validationErrors['occasion']}</span>
                                        )}
                                    </Listbox>
                                )}
                            />
                        </div>


                        {/* tags */}
                        <div className='max-w-lg mt-8'>
                            <label className="block text-sm text-muted-text mb-1">
                                Tags (Make the Product Discoverable)
                            </label>
                            {validationErrors?.['tags'] && (
                                <span className='text-red-400 text-xs'>{validationErrors['tags']}</span>
                            )}
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


                        {/* custom fields */}
                        <div className='mt-8 col-span-2'>
                            <label className="block text-sm text-muted-text mb-4">
                                Add Custom Fields
                            </label>
                            <ul className='mb-4'>
                                {customFields.map((item, idx) => (
                                    <li key={item.id} className='flex items-start justify-start space-x-4 mt-6'>
                                        <div className="relative inline z-0 group w-full">
                                            <input
                                                type='text'
                                                placeholder=''
                                                className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer"
                                                {...register(`custom.${idx}.field`, { required: "Required" })} />
                                            <label
                                                className="peer-focus:font-medium absolute text-sm text-muted-text duration-300 transform -translate-y-8 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 start-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 pointer-events-none"
                                            >
                                                Field Name
                                            </label>
                                            {errors?.custom && errors?.custom[idx]?.field && (
                                                <span className='text-red-400 text-xs'>{errors.custom[idx].field.message}</span>
                                            )}
                                        </div>

                                        <div className="relative inline z-0 group w-full">
                                            <input
                                                type='text'
                                                placeholder=''
                                                className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer"
                                                {...register(`custom.${idx}.value`, { required: "Required" })} />
                                            <label
                                                className="peer-focus:font-medium absolute text-sm text-muted-text duration-300 transform -translate-y-8 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 start-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 pointer-events-none"
                                            >
                                                Field Value
                                            </label>
                                            {errors?.custom && errors?.custom[idx]?.value && (
                                                <span className='text-red-400 text-xs'>{errors.custom[idx].value.message}</span>
                                            )}
                                        </div>
                                        <button
                                            className='py-3 px-3 rounded-md text-red-400 border-gray-300 border bg-white text-sm hover:brightness-90'
                                            type="button"
                                            onClick={() => customRemove(idx)}>
                                            <IoTrashBinOutline />
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            <button
                                type="button"
                                className='py-2 px-4 rounded-md text-white border-text border bg-black text-sm hover:brightness-90'
                                onClick={() => customAppend({ field: "", value: "" })}
                            >
                                {customFields.length > 0 ? "Add More" : "Add Custom Fields"}
                            </button>
                        </div>

                        {/* Meta Description */}
                        <div className='mt-8 col-span-2'>
                            <label className="block text-sm text-muted-text mb-6">
                                Add SEO Details (See preview)
                            </label>
                            {validationErrors?.['meta_info'] && !isValidJSON(validationErrors['meta_info']) && (
                                <span className='text-red-400 text-xs'>{validationErrors['meta_info']}</span>
                            )}
                            <div className="col-span-2 relative z-0 w-full mb-6 group">
                                <input
                                    {...register("meta_info.title")}
                                    type="text"
                                    className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black peer"
                                    placeholder=" "
                                />
                                <label
                                    className="peer-focus:font-medium absolute text-sm text-muted-text duration-300 transform -translate-y-8 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 start-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 pointer-events-none cursor-text"
                                >
                                    Meta Title of the Product
                                </label>
                                {validationErrors?.['meta_info'] && isValidJSON(validationErrors['meta_info']) && (
                                    <span className='text-red-400 text-xs'>{JSON.parse(validationErrors['meta_info'])?.['title']}</span>
                                )}
                            </div>
                            <div className="col-span-2 relative z-0 w-full mb-6 group">
                                <textarea
                                    {...register("meta_info.description")}
                                    type="text"
                                    className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-black resize-y peer"
                                    style={{ minHeight: '45px', maxHeight: '100px' }}
                                    placeholder=" "
                                />
                                <label
                                    className="peer-focus:font-medium absolute text-sm text-muted-text duration-300 transform -translate-y-8 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 start-2 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 pointer-events-none cursor-text"
                                >
                                    Meta Description
                                </label>
                                {validationErrors?.['meta_info'] && isValidJSON(validationErrors['meta_info']) && (
                                    <span className='text-red-400 text-xs'>{JSON.parse(validationErrors['meta_info'])?.['description']}</span>
                                )}
                            </div>

                            {/* seo preview */}
                            {(watch("meta_info.title")?.length > 0 || watch("meta_info.description")?.length > 0) && (
                                <div className='bg-gray-100 p-4 rounded-md shadow-md'>
                                    <h2 className='text-lg text-blue-600'>{watch("meta_info.title")}</h2>
                                    <p className='text-sm text-gray-600 leading-tight'>{watch("meta_info.description")}</p>
                                    <p className='text-xs text-green-500 mt-0 leading-tight'>
                                        {"https://www.sneakers.com/" + watch("meta_info.title").replace(" ", "-").toLowerCase()}
                                    </p>
                                </div>
                            )}
                        </div>


                        {/* action buttons */}
                        <div className='col-span-2 flex justify-end items-center space-x-4 mt-8 py-4 border-t border-gray-300'>
                            <button
                                className='py-2 px-4 rounded-md text-text border-text border bg-white text-sm hover:brightness-90'
                            >
                                Save Draft
                            </button>
                            <button
                                type='submit'
                                className='py-2 px-4 rounded-md text-white border-text border bg-black text-sm hover:brightness-90'>
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


const ImportModal = ({ showImportModal, setShowImportModal, setImportedProduct, importedProduct }) => {
    const [products, setProducts] = useState([])
    async function getProducts() {
        try {
            const response = await axios.get(DOMAIN + '/api/product')
            setProducts(response.data.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getProducts()
    }, []);

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
                                            {products && products.map((product, idx) => (
                                                <div
                                                    key={idx}
                                                    className="md:col-span-1 col-span-2 bg-white cursor-pointer p-1"
                                                    onClick={() => {
                                                        setImportedProduct(product);
                                                        setShowImportModal(false);
                                                    }}
                                                >
                                                    <div className={`${importedProduct?.id === product.id ? 'border-2 border-gray-500' : 'border border-gray-300'} md:col-span-1 col-span-2 flex p-4 rounded-lg`}>
                                                        <div className="h-24 w-24 flex-shrink-0 rounded-md overflow-hidden bg-muted-bg border border-gray-300">
                                                            <img
                                                                src={DOMAIN + "/uploads/product_images/" + product.images[0]}
                                                                alt={product.name}
                                                                className="w-full object-contain object-center"
                                                            />
                                                        </div>

                                                        <div className="ml-4 flex flex-1 flex-col">
                                                            <div>
                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                    <h3>
                                                                        <span>{product.name}</span>
                                                                    </h3>
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
                </div >
            </Dialog >
        </Transition.Root >
    )
}