import React, { useEffect, useRef, useState } from 'react'
import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { register } from 'swiper/element/bundle';
import { addToWishlistAsync, deleteFromWishlistAsync } from '../slices/wishlistSlice';
import { useDispatch, useSelector } from 'react-redux';
import { DOMAIN } from '../app/constants';
register();

const ProductCard = ({ data }) => {

    const dispatch = useDispatch();
    const wishlistItems = useSelector(state => state.wishlist.items);
    const wishlistState = useSelector(state => state.wishlist.state);
    const user = useSelector(state => state.user.currUser);


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
        <div className='relative group overflow-hidden'>
            {/* wishlist button */}
            {wishlistState == 'pending' ? (
                <span
                    className='absolute top-4 lg:-right-12 bg-white lg:w-10 w-8 lg:h-10 h-8 rounded-full flex justify-center items-center lg:text-xl text-lg hover:bg-muted-bg lg:group-hover:right-4 right-4 duration-150 z-10'
                >
                    <IoHeartOutline />
                </span>
            ) : (
                <button
                    className='absolute top-4 lg:-right-12 bg-white lg:w-10 w-8 lg:h-10 h-8 rounded-full flex justify-center items-center lg:text-xl text-lg hover:bg-muted-bg lg:group-hover:right-4 right-4 duration-150 z-10'
                    onClick={
                        () => {
                            if (wishlistItems.find(el => el.product_id == data.id)) {
                                dispatch(deleteFromWishlistAsync(wishlistItems.find(el => el.product_id == data.id)._id))
                            } else {
                                dispatch(addToWishlistAsync(data.id))
                            }
                        }}
                >
                    {wishlistItems.find(el => el.product_id == data.id) ?
                        <IoHeartSharp className='text-red-500' />
                        :
                        <IoHeartOutline />}
                </button>
            )
            }
            <Link to={`/product/${data.id}`}>
                <div className='bg-white'>
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
                                    src={`${DOMAIN}/uploads/product_images/${data.thumbnail}`}
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
                                                src={`${DOMAIN}/uploads/product_images/${el}`}
                                                alt={data.name}
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
                        <div className='flex justify-start'>
                            <span className='text-xs text-red-400'>{data.discountPercentage}% OFF</span>
                        </div>
                        <div className='flex justify-start items-center space-x-1'>
                            <span className='text-muted-text text-xs line-through'>
                                {
                                    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })
                                        .format(data.mrp)
                                }
                            </span>
                            <span className='text-pri text-sm font-bold'>
                                {
                                    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })
                                        .format(data.sp)
                                }
                            </span>
                        </div>
                    </div>
                </div>
            </Link>
        </div >
    )
}

export default ProductCard
