import axios from "axios";
import { resetCurrRazorpayOrder, verifyPaymentAsync } from "../slices/orderSlice";
import { DOMAIN } from "../app/constants";

export const handleRazorpay = async (order, dispatch) => {
    const prefill = {
        name: order.shipping_address?.first_name + " " + order.shipping_address?.last_name,
        email: order.shipping_address?.email,
        contact: order.shipping_address?.phone,
    }
    const { data: { data: key } } = await axios.get(`${DOMAIN}/api/order/get-razorpay-key-id`, { withCredentials: true });
    if (!key) {
        alert("Something went wrong");
        return;
    }
    const options = {
        key: key,
        amount: (order.total_amount * 100).toString(),
        currency: order.currency,
        name: 'Sneaker Store',
        description: 'Test Transaction',
        order_id: order.razorpay_order_id,
        handler: async (response) => {
            dispatch(verifyPaymentAsync({ ...response }))
        },
        modal: {
            ondismiss: () => {
                dispatch(resetCurrRazorpayOrder());
            }
        },
        prefill: prefill,
        notes: {
            address: 'Sneaker Store Jaipur',
        },
        theme: {
            color: '#000000',
        },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}