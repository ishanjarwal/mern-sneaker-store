import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import CountrySelector from './CountrySelector';
import StateSelector from './StateSelector';
import { Country, State, City } from 'country-state-city'
import CitySelector from './CitySelector';
import { resetAddressValidationErrors } from '../slices/userSlice';

const AddressForm = ({ on_submit, setFormActionType, formActionType }) => {

    const dispatch = useDispatch();
    const validationErrors = useSelector(state => state.user.addressValidationErrors);
    const currAddress = useSelector(state => state.user.currAddress);
    const { handleSubmit, control, watch, setValue } = useForm();
    watch("country");
    watch("state");
    useEffect(() => {
        if (currAddress) {
            Object.keys(currAddress).forEach(key => {
                setValue(key, currAddress[key]);
            })
        }
    }, [currAddress]);

    useEffect(() => {
        dispatch(resetAddressValidationErrors());
    }, []);

    return (
        <div className='py-4 bg-white px-4 max-w-5xl mx-auto rounded-lg'>
            <form onSubmit={handleSubmit(data => {
                on_submit(data)
                // console.log(data);
            })}
                autoComplete='off'>
                <h2 className='mb-1 text-text text-lg'>Add a New Address</h2>
                <div className='grid grid-cols-2 gap-2'>
                    <div className='col-span-1'>
                        <label className='text-sm mb-1 text-muted-text'>First Name</label>
                        {validationErrors && validationErrors.find(item => item.path.replace(/^address\./, '') == 'first_name') &&
                            <p className='text-xs text-red-500'>
                                {validationErrors && validationErrors.find(item => item.path.replace(/^address\./, '') == 'first_name').msg}
                            </p>
                        }
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
                                />
                            )}
                        />
                    </div>
                    <div className='col-span-1'>
                        <label className='text-sm mb-1 text-muted-text'>Last Name</label>
                        {validationErrors && validationErrors.find(item => item.path.replace(/^address\./, '') == 'last_name') &&
                            <p className='text-xs text-red-500'>
                                {validationErrors && validationErrors.find(item => item.path.replace(/^address\./, '') == 'last_name').msg}
                            </p>
                        }
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
                        {validationErrors && validationErrors.find(item => item.path.replace(/^address\./, '') == 'phone') &&
                            <p className='text-xs text-red-500'>
                                {validationErrors && validationErrors.find(item => item.path.replace(/^address\./, '') == 'phone').msg}
                            </p>
                        }
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
                        {validationErrors && validationErrors.find(item => item.path.replace(/^address\./, '') == 'email') &&
                            <p className='text-xs text-red-500'>
                                {validationErrors && validationErrors.find(item => item.path.replace(/^address\./, '') == 'email').msg}
                            </p>
                        }
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
                        {validationErrors && validationErrors.find(item => item.path.replace(/^address\./, '') == 'plot_no') &&
                            <p className='text-xs text-red-500'>
                                {validationErrors && validationErrors.find(item => item.path.replace(/^address\./, '') == 'plot_no').msg}
                            </p>
                        }
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
                        {validationErrors && validationErrors.find(item => item.path.replace(/^address\./, '') == 'address_line_1') &&
                            <p className='text-xs text-red-500'>
                                {validationErrors && validationErrors.find(item => item.path.replace(/^address\./, '') == 'address_line_1').msg}
                            </p>
                        }
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
                        {validationErrors && validationErrors.find(item => item.path.replace(/^address\./, '') == 'address_line_1') &&
                            <p className='text-xs text-red-500'>
                                {validationErrors && validationErrors.find(item => item.path.replace(/^address\./, '') == 'address_line_1').msg}
                            </p>
                        }
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
                        {validationErrors && validationErrors.find(item => item.path.replace(/^address\./, '') == 'landmark') &&
                            <p className='text-xs text-red-500'>
                                {validationErrors && validationErrors.find(item => item.path.replace(/^address\./, '') == 'landmark').msg}
                            </p>
                        }
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
                <div className='mt-6'>
                    <div className='grid grid-cols-2 gap-x-2 gap-y-6 w-full'>
                        <div className='col-span-1'>
                            <label className='text-sm mb-1 text-muted-text'>Country</label>
                            {validationErrors && validationErrors.find(item => item.path.replace(/^address\./, '') == 'country') &&
                                <p className='text-xs text-red-500'>
                                    {validationErrors && validationErrors.find(item => item.path.replace(/^address\./, '') == 'country').msg}
                                </p>
                            }
                            <Controller
                                name="country"
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <CountrySelector value={value} onChange={onChange} />
                                )}
                            />
                        </div>
                        <div className='col-span-1'>
                            <label className='text-sm mb-1 text-muted-text'>State</label>
                            {validationErrors && validationErrors.find(item => item.path.includes("state")) &&
                                <p className='text-xs text-red-500'>
                                    {validationErrors && validationErrors.find(item => item.path.includes("state")).msg}
                                </p>
                            }
                            <Controller
                                name="state"
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <StateSelector value={value} onChange={onChange} options={State.getStatesOfCountry(watch("country.isoCode"))} setValue={setValue} />
                                )}
                            />
                        </div>
                        <div className='col-span-1'>
                            <label className='text-sm mb-1 text-muted-text'>City/District</label>
                            {validationErrors && validationErrors.find(item => item.path.replace(/^address\./, '') == 'city') &&
                                <p className='text-xs text-red-500'>
                                    {validationErrors && validationErrors.find(item => item.path.replace(/^address\./, '') == 'city').msg}
                                </p>
                            }
                            <Controller
                                name="city"
                                control={control}
                                render={({ field: { value, onChange } }) => (
                                    <CitySelector value={value} onChange={onChange} options={City.getCitiesOfState(watch("country.isoCode"), watch("state.isoCode"))} setValue={setValue} />
                                )}
                            />
                        </div>
                        <div className='col-span-1'>
                            <label className='text-sm mb-1 text-muted-text'>Postal Code</label>
                            {validationErrors && validationErrors.find(item => item.path.replace(/^address\./, '') == 'pincode') &&
                                <p className='text-xs text-red-500'>
                                    {validationErrors && validationErrors.find(item => item.path.replace(/^address\./, '') == 'pincode').msg}
                                </p>
                            }
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
