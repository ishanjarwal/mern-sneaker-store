import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import { DOMAIN } from '../../app/constants';
import { Link } from 'react-router-dom';
import { FaCheck, FaUpDown } from 'react-icons/fa6';
import { Listbox, Transition } from '@headlessui/react';

const ManageOrders = () => {

    const paymentStatusOptions = ['due', 'completed'];
    const [paymentStatus, setPaymentStatus] = useState();
    const statusOptions = ['pending', 'placed', 'processing', 'shipped', 'delivered', 'cancelled'];
    const [status, setStatus] = useState();


    const updatePaymentStatus = async (status, id) => {
        try {
            const { data } = await axios.patch(`${DOMAIN}/api/order/update-payment-status`, { status, id }, { withCredentials: true })
            if (data) {
                setPaymentStatus(data);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    const updateStatus = async (status, id) => {
        try {
            const { data } = await axios.patch(`${DOMAIN}/api/order/update-status`, { status, id }, { withCredentials: true })
            if (data) {
                setStatus(data);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    const [orders, setOrders] = useState([]);
    const fetchAllOrders = async () => {
        try {
            const { data } = await axios.get(`${DOMAIN}/api/order/all-orders`, { withCredentials: true })
            if (data) {
                setOrders(data);
            }
        } catch (error) {
            alert(error.message);
        }
    }
    useEffect(() => {
        fetchAllOrders();
    }, [paymentStatus, status]);


    return (
        <div className='py-8 px-6'>
            <h1 className='text-2xl font-bold uppercase mb-4'>Manage Orders</h1>
            <div>
                <table className='table-auto w-full border' style={{ minWidth: '768px' }}>
                    <thead className='bg-muted-bg'>
                        <tr>
                            <th className='text-start py-2 px-2 border border-muted-text'>S.no</th>
                            <th className='text-start py-2 px-2 border border-muted-text'>OrderID</th>
                            <th className='text-start py-2 px-2 border border-muted-text'>Items</th>
                            <th className='text-start py-2 px-2 border border-muted-text'>UserID</th>
                            <th className='text-start py-2 px-2 border border-muted-text'>Address</th>
                            <th className='text-start py-2 px-2 border border-muted-text'>Payment Status</th>
                            <th className='text-start py-2 px-2 border border-muted-text'>Status</th>
                            <th className='text-start py-2 px-2 border border-muted-text'>Payment Details</th>
                            <th className='text-start py-2 px-2 border border-muted-text'>Placed At</th>
                            <th className='text-start py-2 px-2 border border-muted-text'>Updated At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.map((order, index) => (
                            <tr>
                                <td className='text-start py-2 px-2 border border-muted-text'>{index + 1}</td>
                                <td className='text-start text-sm py-2 px-2 border border-muted-text'>{order._id}</td>
                                <td className='min-w-80 text-start py-2 px-2 border border-muted-text'>
                                    {order?.items.map((item, idx) => (
                                        <div>
                                            <div className='py-4 gap-y-4'>
                                                <div className='lg:col-span-3 col-span-8 flex justify-start items-start space-x-2'>
                                                    <Link to={`/product/${item.id}`} className='h-24 w-24 bg-gray-100'>
                                                        <img
                                                            src={`${DOMAIN}/uploads/product_images/${item.thumbnail}`}
                                                            alt=""
                                                            className='h-full w-full min-w-24 object-center object-cover'
                                                        />
                                                    </Link>
                                                    <div>
                                                        <Link to={`/product/${item.id}`}>
                                                            <h2 className='text-md'>{item.name}</h2>
                                                        </Link>
                                                        <p>
                                                            <span className='text-lg font-semibold'>
                                                                ₹ {item.total_price}
                                                            </span>
                                                        </p>
                                                        <p>
                                                            <span className='text-sm'>
                                                                Quantity : <b>{item.quantity}</b>
                                                            </span>
                                                        </p>
                                                        <p>
                                                            <span className='text-sm'>
                                                                Price per article : <b>₹ {item.price}</b>
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </td>
                                <td className='min-w-80 text-start text-sm py-2 px-2 border border-muted-text'>
                                    <div>
                                        <p><b>ID :</b>{order?.customer_id?._id}</p>
                                        <p><b>Fullname :</b>{order?.customer_id?.fullname}</p>
                                        <p><b>Email :</b>{order?.customer_id?.email}</p>
                                        <p><b>Phone :</b>{order?.customer_id?.phone}</p>
                                    </div>
                                </td>
                                <td className='min-w-80 text-start text-sm py-2 px-2 border border-muted-text'>
                                    <div>
                                        <p><b>Name : </b>{order?.shipping_address?.first_name}{" "}{order?.shipping_address?.last_name}</p>
                                        <p><b>Email : </b>{order?.shipping_address?.email}</p>
                                        <p><b>Phone : </b>{order?.shipping_address?.phone}</p>
                                        <div className='flex justify-start space-x-2'>
                                            <p><b>Address </b></p>
                                            <div>
                                                <p>{order?.shipping_address?.plot_no}</p>
                                                <p>{order?.shipping_address?.address_line_1}</p>
                                                <p>{order?.shipping_address?.address_line_2}</p>
                                                <p>{order?.shipping_address?.landmark}</p>
                                                <p>{order?.shipping_address?.country}, {order?.shipping_address?.state}, {order?.shipping_address?.city}</p>
                                                <p>{order?.shipping_address?.pincode}</p>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className='min-w-64 text-start text-sm py-2 px-2 border border-muted-text'>
                                    <Listbox
                                        value={order?.payment_status}
                                        onChange={(v) => {
                                            updatePaymentStatus(v, order._id);
                                        }}
                                    >
                                        <div className="relative mt-1">
                                            <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                                <span className="block truncate">{order?.payment_status}</span>
                                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                    <FaUpDown
                                                        className="h-5 w-5 text-gray-400"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            </Listbox.Button>
                                            <Transition
                                                as={Fragment}
                                                leave="transition ease-in duration-100"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                                    {paymentStatusOptions.map((option, idx) => (
                                                        <Listbox.Option
                                                            key={idx}
                                                            className={({ active }) =>
                                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                                                }`
                                                            }
                                                            value={option}
                                                        >
                                                            {({ selected }) => (
                                                                <>
                                                                    <span
                                                                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                            }`}
                                                                    >
                                                                        {option}
                                                                    </span>
                                                                    {selected ? (
                                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                                            <FaCheck className="h-5 w-5" aria-hidden="true" />
                                                                        </span>
                                                                    ) : null}
                                                                </>
                                                            )}
                                                        </Listbox.Option>
                                                    ))}
                                                </Listbox.Options>
                                            </Transition>
                                        </div>
                                    </Listbox>
                                </td>
                                <td className='min-w-64 text-start text-sm py-2 px-2 border border-muted-text'>
                                    <Listbox
                                        value={order?.status}
                                        onChange={(v) => {
                                            updateStatus(v, order._id);
                                        }}
                                    >
                                        <div className="relative mt-1">
                                            <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                                <span className="block truncate">{order?.status}</span>
                                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                    <FaUpDown
                                                        className="h-5 w-5 text-gray-400"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            </Listbox.Button>
                                            <Transition
                                                as={Fragment}
                                                leave="transition ease-in duration-100"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <Listbox.Options className="absolute z-[5] mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                                    {statusOptions.map((option, idx) => (
                                                        <Listbox.Option
                                                            key={idx}
                                                            className={({ active }) =>
                                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                                                }`
                                                            }
                                                            value={option}
                                                        >
                                                            {({ selected }) => (
                                                                <>
                                                                    <span
                                                                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                            }`}
                                                                    >
                                                                        {option}
                                                                    </span>
                                                                    {selected ? (
                                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                                            <FaCheck className="h-5 w-5" aria-hidden="true" />
                                                                        </span>
                                                                    ) : null}
                                                                </>
                                                            )}
                                                        </Listbox.Option>
                                                    ))}
                                                </Listbox.Options>
                                            </Transition>
                                        </div>
                                    </Listbox>
                                </td>
                                <td className='min-w-64 text-start text-sm py-2 px-2 border border-muted-text'>
                                    <p><b>Method : </b>{order?.payment_details?.method}</p>
                                    <p><b>Card : </b>{order?.payment_details?.card}</p>
                                    <p><b>VPA : </b>{order?.payment_details?.vpa}</p>
                                </td>
                                <td className='min-w-64 text-start text-sm py-2 px-2 border border-muted-text'>{order?.placed_at}</td>
                                <td className='min-w-64 text-start text-sm py-2 px-2 border border-muted-text'>{order?.updated_at}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ManageOrders
