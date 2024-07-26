import React from 'react'
import { IoBagOutline, IoHeartOutline, IoMenuOutline, IoPersonOutline, IoSearchOutline } from "react-icons/io5";
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { navLinks } from '../app/constants';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { showCart } from '../slices/cartSlice';
import { showWishlist } from '../slices/wishlistSlice';

const Navbar = ({ setMobileNav }) => {

    const dispatch = useDispatch();
    const cartShown = useSelector(state => state.cart.shown);
    const user = useSelector(state => state.user.currUser);
    const profileMenu = [
        {
            name: 'Your Profile',
            link: '/account'
        },
        {
            name: 'Your Orders',
            link: '/account/myorders'
        },
        {
            name: 'Logout',
            link: '/logout'
        },
    ]

    const cartItems = useSelector(state => state.cart.items);
    const wishlistItems = useSelector(state => state.wishlist.items)

    return (
        <header className='bg-muted-bg'>
            <div className='mx-auto max-w-7xl'>
                <div className='flex justify-between items-center py-4 xl:px-0 px-4 space-x-2'>
                    <div className='lg:hidden flex items-center md:flex-1 '>
                        <button
                            onClick={() => { setMobileNav(true) }}
                            className='text-text md:text-4xl text-2xl'>
                            <IoMenuOutline />
                        </button>
                    </div>
                    <nav className='flex-1 lg:flex hidden justify-start items-center space-x-2'>
                        {navLinks.map((el, index) => (
                            !(el.submenu)
                                ?
                                (
                                    <span key={index} className='text-text uppercase px-4 py-2 whitespace-nowrap'>
                                        <a href={el.link}>{el.name}</a>
                                    </span>
                                )
                                :
                                (
                                    <span key={index} className='group inline relative text-text uppercase px-4 py-2 whitespace-nowrap cursor-pointer'>
                                        <span>{el.name}</span>
                                        {/* submenu */}
                                        <div className='absolute opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto top-full left-0 flex flex-col shadow-md min-w-48 duration-150 overflow-hidden rounded-md z-10 bg-white'>
                                            {el.submenu.map((el, index) => (
                                                <a key={index} href={el.link} className='text-sm py-2 px-4 w-full text-start uppercase hover:bg-muted-bg duration-150'>
                                                    {el.name}
                                                </a>
                                            ))}
                                        </div>
                                    </span>
                                )
                        ))}
                    </nav>
                    <div className='flex-1 flex md:justify-center items-center'>
                        <a href="/" className='md:text-3xl text-xl font-bold uppercase'>
                            sneakers
                        </a>
                    </div>
                    <div className='flex-1 flex space-x-3 justify-end items-center'>
                        {/* action buttons search, cart wishlist profile */}
                        <button className='text-2xl'>
                            <IoSearchOutline />
                        </button>
                        {user
                            ?
                            <div
                                className='relative cursor-pointer'
                                title='Your Wishlist'
                                onClick={() => { dispatch(showWishlist()) }}
                            >
                                {wishlistItems?.length > 0 && (
                                    <span className='absolute -right-2 -top-2 text-xs min-w-4 px-1 py-1 h-4 flex justify-center items-center rounded-full bg-black text-white'>
                                        {wishlistItems?.length}
                                    </span>
                                )}
                                <span className='text-black text-2xl'>
                                    <span>
                                        <IoHeartOutline />
                                    </span>
                                </span>
                            </div>
                            :
                            <Link to={'/login'}>
                                <span className='text-black text-2xl'>
                                    <span>
                                        <IoHeartOutline />
                                    </span>
                                </span>
                            </Link>
                        }
                        {user
                            ?
                            <div
                                className='relative cursor-pointer'
                                title='Your Cart'
                                onClick={() => { dispatch(showCart()) }}
                            >
                                {cartItems.length > 0 && (
                                    <span className='absolute -right-2 -top-2 text-xs min-w-4 px-1 py-1 h-4 flex justify-center items-center rounded-full bg-black text-white'>
                                        {cartItems.reduce((acc, curr) => { return (acc + curr.qty) }, 0)}
                                    </span>
                                )}
                                <span className='text-black text-2xl'>
                                    <span>
                                        <IoBagOutline />
                                    </span>
                                </span>
                            </div>
                            :
                            <Link to={'/login'}>
                                <span className='text-black text-2xl'>
                                    <span>
                                        <IoBagOutline />
                                    </span>
                                </span>
                            </Link>
                        }

                        {/* profile menu */}
                        <div className='px-2'>
                            {user
                                ?
                                <Menu as="div" className="relative block text-left">
                                    <div>
                                        <Menu.Button className="flex w-full whitespace-nowrap justify-center  text-2xl font-medium text-text">
                                            <img
                                                src={`https://ui-avatars.com/api/?name=${user.fullname}&background=random`}
                                                className='w-8 h-8 object-cover object-center rounded-full'
                                            />
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
                                        <Menu.Items className="absolute z-10 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md overflow-hidden bg-white shadow-lg">
                                            {profileMenu.map((el, index) => (
                                                <Menu.Item key={index}>
                                                    {({ active }) => (
                                                        <Link to={el.link}
                                                            className='block py-2 px-3 text-text text-sm bg-white hover:bg-muted-bg w-full text-start'
                                                        >
                                                            {el.name}
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                                :
                                <Link to={'/login'} className="flex w-full whitespace-nowrap justify-center items-center  text-2xl font-medium text-text">
                                    <IoPersonOutline />
                                </Link>
                            }

                        </div>

                    </div>
                </div>
            </div>
        </header >
    )
}

export default Navbar
