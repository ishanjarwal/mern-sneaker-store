import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { fetchOrderAsync } from '../slices/orderSlice';
import { DOMAIN } from '../app/constants';
import { handleRazorpay } from '../utils/razorpayModalOpener';

const UserOrder = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const state = useSelector(state => state.order.state);
    const currOrder = useSelector(state => state.order.currOrder);

    useEffect(() => {
        dispatch(fetchOrderAsync(id));
    }, []);
    useEffect(() => {
        if (state === 'fulfilled') {
            dispatch(fetchOrderAsync(id));
        }
        if (state === 'rejected') {
            navigate('/account/myorders');
        }
    }, [state]);


    return (
        <div>
            <div className="px-4 sm:px-0">
                <h3 className="text-xl font-semibold leading-7 text-gray-900">Order #{currOrder?._id}</h3>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Ordered on {currOrder?.updated_at}</p>
            </div>
            <div className="px-4 sm:px-0">
                {currOrder?.payment_status == 'due' && currOrder.status == 'pending' && (
                    <button
                        onClick={() => {
                            handleRazorpay(currOrder, dispatch);
                        }}
                        className='w-min whitespace-nowrap py-2 px-3 bg-blue-500 text-white'>
                        Complete Payment
                    </button>
                )}
            </div>
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Status</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{currOrder?.status}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Payment Status</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{currOrder?.payment_status}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Items in this Order</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {currOrder?.items.map((item, idx) => (
                                <div>
                                    <div className='py-4 gap-y-4'>
                                        <div className='lg:col-span-3 col-span-8 flex justify-start items-start space-x-2'>
                                            <Link to={`/product/${item.id}`} className='h-24 w-24 bg-gray-100'>
                                                <img
                                                    src={`${DOMAIN}/uploads/product_images/${item.thumbnail}`}
                                                    alt=""
                                                    className='h-full w-full object-center object-cover'
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
                                    <span className='border-b border-gray-300 block'></span>
                                </div>
                            ))}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Total Price</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">₹{currOrder?.total_amount}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Total Items</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{currOrder?.total_items}</dd>
                    </div>
                    {currOrder?.payment_status === 'completed' && (
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Payment Method</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{currOrder?.payment_details.method}</dd>
                        </div>
                    )}
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">Customer Details</dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            <p><b>Name : </b>{currOrder?.shipping_address.first_name}{" "}{currOrder?.shipping_address.last_name}</p>
                            <p><b>Email : </b>{currOrder?.shipping_address.email}</p>
                            <p><b>Phone : </b>{currOrder?.shipping_address.phone}</p>
                            <div className='flex justify-start space-x-2'>
                                <p><b>Address : </b></p>
                                <div>
                                    <p>{currOrder?.shipping_address.plot_no}</p>
                                    <p>{currOrder?.shipping_address.address_line_1}</p>
                                    <p>{currOrder?.shipping_address.address_line_2}</p>
                                    <p>{currOrder?.shipping_address.landmark}</p>
                                    <p>{currOrder?.shipping_address.country}, {currOrder?.shipping_address.state}, {currOrder?.shipping_address.city}</p>
                                    <p>{currOrder?.shipping_address.pincode}</p>
                                </div>
                            </div>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    )
}

export default UserOrder
