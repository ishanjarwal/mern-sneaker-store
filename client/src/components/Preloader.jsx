import React from 'react'

const Preloader = () => {
    return (
        <div className='h-screen max-h-screen bg-black/50 backdrop-blur-sm w-full flex justify-center items-center'>
            <p className='text-white opacity-65 text-lg'>Loading . . .</p>
        </div>
    )
}

export default Preloader
