import React, { useEffect, useState } from 'react'
import { Combobox } from '@headlessui/react'
import { LuChevronsUpDown } from "react-icons/lu";
import useDeepComparisonEffect from '../hooks/useDeepComparisonEffect';
const CitySelector = ({ value, onChange, options, setValue }) => {
    const [query, setQuery] = useState('');
    const [filtered, setFiltered] = useState(null);
    useEffect(() => {
        if (query === '') {
            setFiltered(options);
        } else {
            setFiltered(options.filter((state) => {
                return state?.name.toLowerCase()?.includes(query.toLowerCase());
            }));
        }
    }, [options, query]);

    useDeepComparisonEffect(() => {
        setValue("city", options[0] || "");
    }, [options]);


    return (
        <div className='relative w-full'>
            <Combobox value={value} onChange={onChange}>
                <div className="relative">
                    <Combobox.Button className="group relative w-full">
                        <Combobox.Input
                            className='block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 appearance-none  focus:outline-none focus:ring-0 border-gray-300 focus:border-black peer'
                            displayValue={city => city.name}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <LuChevronsUpDown className='absolute right-2 top-1/2 -translate-y-1/2' />
                    </Combobox.Button>
                </div>

                <Combobox.Options
                    anchor="bottom"
                    transition
                    className="absolute mt-1 max-h-48 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                >
                    {filtered?.map((city) => (
                        <Combobox.Option
                            key={city.name}
                            value={city}
                            className="group flex cursor-pointer items-center gap-2 py-1.5 px-3 select-none hover:bg-gray-100"
                        >
                            <div className="text-sm/6">{city.name}</div>
                        </Combobox.Option>
                    ))}
                </Combobox.Options>
            </Combobox>
        </div>
    )
}

export default CitySelector
