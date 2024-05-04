import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect } from 'react'

export default function SortMenu({ sortOptions, setSortOptions }) {

    const sortValues = [
        {
            sort_by: 'created_at',
            order_by: 'asc',
            display: "Newest"
        },
        {
            sort_by: 'def_price',
            order_by: 'asc',
            display: "Price Low to High"
        },
        {
            sort_by: 'def_price',
            order_by: 'desc',
            display: "Price High to Low"
        },
        {
            sort_by: 'def_discountPercentage',
            order_by: 'desc',
            display: "Discount"
        }

    ]

    useEffect(() => {
        setSortOptions(sortValues[0])
    }, []);

    return (
        <div className='w-full border border-muted-text'>
            <Menu as="div" className="relative block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full whitespace-nowrap justify-center bg-white px-4 py-2 text-sm font-medium text-text hover:bg-muted-bg">
                        Sort By : {sortOptions.display}
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute z-20 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md overflow-hidden bg-white shadow-lg">
                        {sortValues.map((el, index) => (
                            <Menu.Item key={index}>
                                {({ active }) => (
                                    <button
                                        onClick={() => {
                                            setSortOptions(prev => ({ ...prev, sort_by: el.sort_by, order_by: el.order_by, display: el.display }))
                                        }}
                                        className='py-2 px-3 text-text text-sm bg-white hover:bg-muted-bg w-full text-start'
                                    >
                                        {el.display}
                                    </button>
                                )}
                            </Menu.Item>
                        ))}
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}