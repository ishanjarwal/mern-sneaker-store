import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { Fragment, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const AddressFormModal = ({ formModal, setFormModal, formActionType }) => {

    const user = useSelector(state => state.user.currUser);
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, control, watch, setValue, getValues } = useForm();

    function sendData(data) {
        const sendable = { address: data, type: formActionType }
        dispatch(updateUserAddressAsync({ user_id: user._id, data: sendable }))
        console.log(data);
    }
    async function checkPincode(pincode) {
        setValue("city", "");
        setValue("state", "");
        const pincodeUrl = "https://api.postalpincode.in/pincode/" + pincode;
        const { data } = await axios.get(pincodeUrl);
        if (data[0].Status == "Success") {
            setValue("city", data[0].PostOffice[0].Block);
            setValue("state", data[0].PostOffice[0].State);
        }
    }
    useEffect(() => {
        const debounced = setTimeout(() => {
            checkPincode(watch("pincode"))
        }, 1000);
        return () => clearTimeout(debounced);
    }, [watch("pincode")]);

    return (
        <Transition.Root show={formModal} as={Fragment}>
            <Dialog className="relative z-10" onClose={setFormModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-75 transition-opacity" />
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
                                <div className='py-4 bg-white px-4 max-w-5xl mx-auto rounded-lg'>
                                    <form onSubmit={handleSubmit(data => { sendData(data) })}>
                                        <h2 className='mb-1 text-text text-lg'>Add a New Address</h2>
                                        <div className='grid grid-cols-2 gap-2'>
                                            <div className='col-span-1'>
                                                <label className='text-sm mb-1 text-muted-text'>First Name</label>
                                                <Controller
                                                    name="fname"
                                                    control={control}
                                                    defaultValue={""}
                                                    render={({ field }) => (
                                                        <input
                                                            {...field}
                                                            type="text"
                                                            className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 appearance-none  focus:outline-none focus:ring-0 border-gray-300 focus:border-black peer"
                                                            placeholder=" "
                                                            required=""
                                                        />
                                                    )}
                                                />
                                            </div>
                                            <div className='col-span-1'>
                                                <label className='text-sm mb-1 text-muted-text'>Last Name</label>
                                                <Controller
                                                    name="lname"
                                                    control={control}
                                                    defaultValue={""} // Set initial value from state
                                                    render={({ field }) => (
                                                        <input
                                                            {...field}
                                                            type="text"
                                                            className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 appearance-none  focus:outline-none focus:ring-0 border-gray-300 focus:border-black peer"
                                                            placeholder=" "
                                                            required=""
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className='grid grid-cols-2 gap-2 mt-6'>
                                            <div className='col-span-1'>
                                                <label className='text-sm mb-1 text-muted-text'>Phone</label>
                                                <Controller
                                                    name="phone"
                                                    control={control}
                                                    defaultValue={""} // et initial value from state
                                                    render={({ field }) => (
                                                        <input
                                                            {...field}
                                                            type="text"
                                                            className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 appearance-none  focus:outline-none focus:ring-0 border-gray-300 focus:border-black peer"
                                                            placeholder=" "
                                                            required=""
                                                        />
                                                    )}
                                                />
                                            </div>
                                            <div className='col-span-1'>
                                                <label className='text-sm mb-1 text-muted-text'>E-mail</label>
                                                <Controller
                                                    name="email"
                                                    control={control}
                                                    defaultValue={""} // Set initial value from state
                                                    render={({ field }) => (
                                                        <input
                                                            {...field}
                                                            type="text"
                                                            className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 appearance-none  focus:outline-none focus:ring-0 border-gray-300 focus:border-black peer"
                                                            placeholder=" "
                                                            required=""
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className='mt-6'>
                                            <div>
                                                <label className='text-sm mb-1 text-muted-text'>Flat/Plot No.</label>
                                                <Controller
                                                    name="plot_no"
                                                    control={control}
                                                    defaultValue={""} // Set initial value from state
                                                    render={({ field }) => (
                                                        <input
                                                            {...field}
                                                            type="text"
                                                            className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 appearance-none  focus:outline-none focus:ring-0 border-gray-300 focus:border-black peer"
                                                            placeholder=" "
                                                            required=""
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className='mt-6'>
                                            <div>
                                                <label className='text-sm mb-1 text-muted-text'>Address Line 1</label>
                                                <Controller
                                                    name="address_line_1"
                                                    control={control}
                                                    defaultValue={""} // Set initial value from state
                                                    render={({ field }) => (
                                                        <input
                                                            {...field}
                                                            type="text"
                                                            className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 appearance-none  focus:outline-none focus:ring-0 border-gray-300 focus:border-black peer"
                                                            placeholder=" "
                                                            required=""
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className='mt-6'>
                                            <div>
                                                <label className='text-sm mb-1 text-muted-text'>Address Line 2</label>
                                                <Controller
                                                    name="address_line_2"
                                                    control={control}
                                                    defaultValue={""} // Set initial value from state
                                                    render={({ field }) => (
                                                        <input
                                                            {...field}
                                                            type="text"
                                                            className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 appearance-none  focus:outline-none focus:ring-0 border-gray-300 focus:border-black peer"
                                                            placeholder=" "
                                                            required=""
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className='mt-6'>
                                            <div>
                                                <label className='text-sm mb-1 text-muted-text'>Landmark</label>
                                                <Controller
                                                    name="landmark"
                                                    control={control}
                                                    defaultValue={""}
                                                    render={({ field }) => (
                                                        <input
                                                            {...field}
                                                            type="text"
                                                            className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 appearance-none  focus:outline-none focus:ring-0 border-gray-300 focus:border-black peer"
                                                            placeholder=" "
                                                            required=""
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className='grid grid-cols-3 gap-2 mt-6'>
                                            <div className='col-span-1'>
                                                <label className='text-sm mb-1 text-muted-text'>Postal Code</label>
                                                <Controller
                                                    name="pincode"
                                                    control={control}
                                                    defaultValue={""} // Set initial value from state
                                                    render={({ field }) => (
                                                        <input
                                                            {...field}
                                                            type="text"
                                                            className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 appearance-none  focus:outline-none focus:ring-0 border-gray-300 focus:border-black peer"
                                                            placeholder=" "
                                                            required=""
                                                        />
                                                    )}
                                                />
                                            </div>
                                            <div className='col-span-1'>
                                                <label className='text-sm mb-1 text-muted-text'>City/District</label>
                                                <Controller
                                                    name="city"
                                                    control={control}
                                                    defaultValue={""} // Set initial value from state
                                                    render={({ field }) => (
                                                        <input
                                                            {...field}
                                                            disabled={true}
                                                            type="text"
                                                            className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 appearance-none  focus:outline-none focus:ring-0 border-gray-300 focus:border-black peer"
                                                            placeholder=" "
                                                            required=""
                                                        />
                                                    )}
                                                />
                                            </div>
                                            <div className='col-span-1'>
                                                <label className='text-sm mb-1 text-muted-text'>State</label>
                                                <Controller
                                                    name="state"
                                                    control={control}
                                                    defaultValue={""} // Set initial value from state
                                                    render={({ field }) => (
                                                        <input
                                                            {...field}
                                                            disabled={true}
                                                            type="text"
                                                            className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 appearance-none  focus:outline-none focus:ring-0 border-gray-300 focus:border-black peer"
                                                            placeholder=" "
                                                            required=""
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className='flex justify-end space-x-2 mt-8 pt-4 border-t border-gray-300'>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setFormModal(false)
                                                }}
                                                className='py-2 px-3 text-text rounded-md border border-text text-sm hover:bg-muted-bg '
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className='py-2 px-3 text-white rounded-md bg-black text-sm hover:bg-zinc-800'
                                            >
                                                Save Address
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default AddressFormModal