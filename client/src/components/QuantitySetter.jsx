import React from 'react'
import { IoAdd, IoRemove } from 'react-icons/io5'

const QuantitySetter = ({ qty, setQty, max }) => {
    return (
        <div className='border border-text text-center rounded-full flex justify-between items-center  p-1'>
            {qty > 1 ? (
                <button
                    className='py-2 px-2 text-text hover:bg-gray-100 rounded-full'
                    onClick={() => {
                        setQty(prev => prev - 1)
                    }}
                >
                    <IoRemove />
                </button>
            ) : <span className='p-2 text-gray-300 pointer-events-none' ><IoRemove /></span>}
            <span>
                {qty}
            </span>
            {qty < max ? (
                <button
                    className='py-2 px-2 text-text hover:bg-gray-100 rounded-full'
                    onClick={() => {
                        setQty(prev => prev + 1)
                    }}
                >
                    <IoAdd />
                </button>
            ) : <span className='p-2 text-gray-300 pointer-events-none' ><IoAdd /></span>}
        </div>
    )
}

export default QuantitySetter
