import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import { IoCheckbox, IoCheckboxOutline, IoCheckmark, IoCloseOutline } from 'react-icons/io5';
import { DOMAIN } from '../app/constants';

const FilterPanel = ({ setFilterMenu, filterMenu, filterOptions, setFilterOptions }) => {


    const [filters, setFilters] = useState({});
    useEffect(() => {
        (async function () {
            try {
                const categories = await axios.get(DOMAIN + '/api/category');
                setFilters(prev => ({ ...prev, category: categories.data.data }))
                const brands = await axios.get(DOMAIN + '/api/brand');
                setFilters(prev => ({ ...prev, brand: brands.data.data }))
            } catch (error) {
                console.log(error)
            }
        })();

    }, []);


    function handleFilters(key, option) {
        if (filterOptions[key] && filterOptions[key].includes(option)) {
            setFilterOptions(prev => {
                const newArr = prev[key].filter(el => el !== option);
                return { ...prev, [key]: newArr }
            })
        } else {
            setFilterOptions((prev => ({ ...prev, [key]: [...(prev[key] || []), option] })));
        }
    }
    return (
        <div>
            <Transition.Root show={filterMenu} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => { setFilterMenu(false) }}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-in-out duration-500"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in-out duration-500"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                                            </div>
                                        </Transition.Child>
                                        <div className="flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl">
                                            <div className="relative px-4 sm:px-6">
                                                <button
                                                    onClick={() => { setFilterMenu(false) }}
                                                    className='absolute top-0 right-4 text-text text-2xl'>
                                                    <IoCloseOutline />
                                                </button>
                                                <h1 className='text-2xl font-bold text-text'>Filters</h1>
                                                <div>
                                                    {/* filters here */}
                                                    {Object.keys(filters).map((filter, index) => (
                                                        <div className='mt-4' key={index}>
                                                            <h2 className='text-lg text font-semibold mb-2 capitalize'>{filter}</h2>
                                                            <ul>
                                                                {filters[filter]?.map((option, index) => (
                                                                    <li className='mb-2 flex justify-start' key={index}>
                                                                        <label className='flex justify-start space-x-2 items-center cursor-pointer'>
                                                                            <div className='relative w-5 h-5'>
                                                                                <input
                                                                                    onChange={() => {
                                                                                        const key = (filter).toLowerCase();
                                                                                        handleFilters(key, option._id)
                                                                                    }}
                                                                                    name='color'
                                                                                    type="checkbox"
                                                                                    className="peer relative appearance-none w-5 h-5 rounded-md border-blue-gray-200 cursor-pointer transition-allchecked:bg-gray-900 before:duration-150 ring ring-gray-300 ring-offset-1 checked:bg-black hover:ring-offset-2 duration-150"
                                                                                />
                                                                                <span
                                                                                    className="absolute text-white pointer-events-none top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
                                                                                >
                                                                                    <IoCheckmark />
                                                                                </span>
                                                                            </div>
                                                                            <span>{option.name}</span>
                                                                        </label>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}

                                                </div>
                                            </div>
                                            <div className="relative mt-6 flex-1 px-4 sm:px-6">{/* Your content */}</div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    )
}

export default FilterPanel
