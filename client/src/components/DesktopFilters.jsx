import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoCheckmark } from 'react-icons/io5';
import { DOMAIN } from '../app/constants';

const DesktopFilters = ({ filterOptions, setFilterOptions }) => {
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

    // const filters = [
    //     {
    //         name: "Brand",
    //         options: ["Nike", "Adidas", "Jordan", "Puma", "Reebok", "New Balance", "Under Armour", "Converse", "Vans"]
    //     },
    //     {
    //         name: "Color",
    //         options: ["Black", "White", "Red", "Blue", "Green", "Yellow", "Orange", "Purple", "Pink", "Gray", "Brown", "Multicolor"]
    //     },
    //     {
    //         name: "Size",
    //         options: ["5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"]
    //     },
    //     {
    //         name: "Gender",
    //         options: ["Men", "Women", "Kids", "Unisex"]
    //     },
    //     {
    //         name: "Style",
    //         options: ["Running", "Basketball", "Casual", "Skateboarding", "Athletic", "Fashion", "Training", "Walking"]
    //     }
    // ];

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
        <div className='p-4 '>
            {/* filters */}
            <h2 className='text-xl font-bold text-muted-text uppercase mb-4'>Filters</h2>
            <div>
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
    )
}

export default DesktopFilters
