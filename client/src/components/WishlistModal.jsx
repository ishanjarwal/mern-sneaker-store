import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react'
import { IoBagAddOutline, IoCloseOutline, IoTerminalSharp, IoTrashOutline } from 'react-icons/io5';

const WishlistModal = ({ wishlistModal, setWishlistModal }) => {

    const wishlistItems = [
        {
            id: 1,
            title: "AIR JORDAN 1 LOW 'WHITE/BLACK-GREEN GLOW'",
            href: '#',
            color: 'Salmon',
            sp: '$90.00',
            quantity: 1,
            thumbnail: 'https://images.vegnonveg.com/resized/400X328/10792/air-jordan-1-low-whiteblack-green-glow-white-65e5bb6851306.jpg',
            imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
        },
        {
            id: 2,
            title: "OZGAIA 'CLOUD WHITEOFF WHITEALMOST PINK",
            href: '#',
            color: 'Blue',
            sp: '$32.00',
            quantity: 1,
            thumbnail: 'https://images.vegnonveg.com/resized/400X328/10724/ozgaia-cloud-whiteoff-whitealmost-pink-white-65e06b61cb340.jpg',
            imageAlt:
                'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
        },
    ]

    return (
        <Transition.Root show={wishlistModal} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setWishlistModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8">
                                <div className='py-4 bg-white px-4 max-w-2xl mx-auto rounded-lg'>
                                    <div className='flex justify-between items-center pb-2 border-b border-gray-300'>
                                        <h2 className='text-2xl font-bold'>Your Wishlist</h2>
                                        <button
                                            className='p-2 text-2xl'
                                            onClick={() => { setWishlistModal(false) }}
                                        >
                                            <span>
                                                <IoCloseOutline />
                                            </span>
                                        </button>
                                    </div>
                                    <div>
                                        {/* wishlist card */}
                                        <div className='grid grid-cols-2 gap-2 mt-4'>
                                            {wishlistItems.map((item, index) => (
                                                <div key={item.id} className="md:col-span-1 col-span-2 flex p-4 border border-gray-300 rounded-lg">
                                                    <div className="h-24 w-24 flex-shrink-0 rounded-md overflow-hidden bg-muted-bg">
                                                        <img
                                                            src={item.thumbnail}
                                                            alt={item.title}
                                                            className="w-full object-contain object-center"
                                                        />
                                                    </div>

                                                    <div className="ml-4 flex flex-1 flex-col">
                                                        <div>
                                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                                <h3>
                                                                    <a href={item.href}>{item.title}</a>
                                                                </h3>
                                                                <p className="ml-4">{item.price}</p>
                                                            </div>
                                                            <p className="mt-1 text-sm text-gray-500">{item.color}</p>
                                                        </div>
                                                        <div className="flex flex-1 items-end justify-between text-sm">
                                                            <div className="flex justify-end w-full space-x-2">
                                                                <button
                                                                    type="button"
                                                                    title='Add to Cart'
                                                                    className="p-2 bg-white rounded-md text-lg text-text hover:bg-muted-bg border border-gray-300 duration-100"
                                                                >
                                                                    <IoBagAddOutline />
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    title='Remove from Cart'
                                                                    className="p-2 bg-white rounded-md text-lg text-red-400 hover:bg-muted-bg border border-gray-300 duration-100"
                                                                >
                                                                    <IoTrashOutline />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default WishlistModal
