import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react'
import { IoArrowForwardOutline, IoCloseOutline } from 'react-icons/io5';
import { navLinks } from '../app/constants';

const MobileNavbar = ({ mobileNav, setMobileNav }) => {
    return (
        <div>
            <Transition.Root show={mobileNav} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => { setMobileNav(false) }}>
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
                            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="-translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-full"
                                    leaveTo="-translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                                        <div className="flex h-full flex-col overflow-y-auto bg-white py-6 shadow-xl">
                                            <div className="relative px-4 sm:px-6">
                                                <button
                                                    onClick={() => { setMobileNav(false) }}
                                                    className='absolute top-0 right-4 text-text text-2xl'>
                                                    <IoCloseOutline />
                                                </button>
                                                <div>
                                                    {/* content here */}
                                                    <nav className='flex flex-col w-full'>
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
                                                                        <span className='flex justify-start space-x-4 items-center'>
                                                                            <span>{el.name}</span>
                                                                            <span><IoArrowForwardOutline /></span>
                                                                        </span>
                                                                        {/* submenu */}
                                                                        <div className='relative max-h-0 opacity-0 invisible pointer-events-none group-hover:max-h-96 group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto top-full left-0 flex flex-col  min-w-48 duration-300z-10 bg-white'>
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

export default MobileNavbar
