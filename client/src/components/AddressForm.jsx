import axios from 'axios';
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

const AddressForm = ({ on_submit, setFormActionType, formActionType }) => {


    const user = useSelector(state => state.user.currUser);
    const currAddress = useSelector(state => state.user.currAddress);
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, control, watch, setValue, getValues } = useForm();

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

    useEffect(() => {
        if (currAddress) {
            Object.keys(currAddress).forEach(key => {
                setValue(key, currAddress[key]);
            })
        }
    }, [currAddress]);

    return (
        <div className='py-4 bg-white px-4 max-w-5xl mx-auto rounded-lg'>
            <form onSubmit={handleSubmit(data => { on_submit(data) })}>
                <h2 className='mb-1 text-text text-lg'>Add a New Address</h2>
                <div className='grid grid-cols-2 gap-2'>
                    <div className='col-span-1'>
                        <label className='text-sm mb-1 text-muted-text'>First Name</label>
                        <Controller
                            name="first_name"
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
                            name="last_name"
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
                            setFormActionType(null)
                        }}
                        className='py-2 px-3 text-text rounded-md border border-text text-sm hover:bg-muted-bg '
                    >
                        Cancel
                    </button>
                    <button
                        className='py-2 px-3 text-white rounded-md bg-black text-sm hover:bg-zinc-800'
                    >
                        {formActionType == "add" ? "Save Address" : "Update"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddressForm
