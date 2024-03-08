import React, { useEffect, useRef, useState } from 'react'
import { IoHeartOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { register } from 'swiper/element/bundle';
register();

const ProductCard = ({ data }) => {

    const swiper_options = {
        'space-between': '0',
        'loop': true,
        'slides-per-view': '1',
        'free-mode': false,
        'autoplay-delay': '1000',
        'speed': 500,
    }
    const [startSlideshow, setStartSlideshow] = useState(false)
    return (
        <Link to="/product">
            <div className='bg-white relative group overflow-hidden'>

                {/* wishlist button */}
                <button className='absolute top-4 lg:-right-12 bg-white lg:w-10 w-8 lg:h-10 h-8 rounded-full flex justify-center items-center lg:text-xl text-lg hover:bg-muted-bg lg:group-hover:right-4 right-4 duration-150 z-10'>
                    <IoHeartOutline />
                </button>

                <div
                    className='w-full'
                    onMouseEnter={() => {
                        setStartSlideshow(true);
                    }}
                    onMouseLeave={() => {
                        setStartSlideshow(false);
                    }}
                >
                    {!startSlideshow ? (
                        <div className='w-full'>
                            <img
                                className='w-full object-cover object-center'
                                src={data.thumbnail}
                                alt=""
                            />
                        </div>
                    ) : (
                        <swiper-container {...swiper_options} >
                            {data.images.map((el, index) => (
                                <swiper-slide key={index}>
                                    <div className='w-full'>
                                        <img
                                            className='w-full object-cover object-center'
                                            src={data.thumbnail}
                                            alt=""
                                        />
                                    </div>
                                </swiper-slide>
                            ))}
                        </swiper-container>
                    )}
                </div>
                <div className='flex flex-col justify-start items-start p-2'>
                    <span className='text-muted-text text-xs uppercase'>{data.brand}</span>
                    <span className='text-pri text-sm font-bold uppercase'>{data.name}</span>
                    <div className='flex justify-start items-center space-x-1'>
                        <span className='text-muted-text text-xs line-through'>{'₹'}{data.mrp}</span>
                        <span className='text-pri text-sm font-bold'>{'₹'}{data.sp}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard
