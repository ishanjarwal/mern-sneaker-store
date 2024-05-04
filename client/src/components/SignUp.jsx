import React, { useState } from 'react'
import { IoArrowForwardOutline } from 'react-icons/io5'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createUserAsync } from '../slices/userSlice'

const SignUp = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.currUser);

    const [data, setData] = useState({
        fullname: "",
        email: "",
        password: ""
    })

    function handleSubmit() {
        // dispatch create user
        dispatch(createUserAsync(data))
    }

    if (user) {
        return <Navigate to="/" />
    }

    return (
        <form>
            <h1 className='font-bold lg:text-5xl text-3xl'>SignUp</h1>
            <p className='text-muted-text mt-2'>Create an account to access the features of this store.</p>
            <div className=" relative z-0 w-full mb-8 mt-8 group">
                <input
                    onChange={(e) => {
                        setData(prev => ({ ...prev, fullname: e.target.value }))
                    }}
                    type="text"
                    className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 appearance-none  focus:outline-none focus:ring-0 border-gray-300 focus:border-black peer"
                    placeholder=" "
                />
                <label
                    className="peer-focus:font-medium absolute text-sm text-muted-text duration-300 transform -translate-y-8 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-placeholder-shown:start-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 cursor-text pointer-events-none"
                >
                    Full Name
                </label>
            </div>
            <div className=" relative z-0 w-full mb-8 mt-8 group">
                <input
                    onChange={(e) => {
                        setData(prev => ({ ...prev, email: e.target.value }))
                    }}
                    type="text"
                    className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 appearance-none  focus:outline-none focus:ring-0 border-gray-300 focus:border-black peer"
                    placeholder=" "
                />
                <label
                    className="peer-focus:font-medium absolute text-sm text-muted-text duration-300 transform -translate-y-8 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-placeholder-shown:start-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 cursor-text pointer-events-none"
                >
                    Email
                </label>
            </div>
            <div className=" relative z-0 w-full mb-5 group">
                <input
                    onChange={(e) => {
                        setData(prev => ({ ...prev, password: e.target.value }))
                    }}
                    type="text"
                    className="block py-2.5 px-2 w-full text-sm text-text bg-gray-100 border-0 border-b-2 appearance-none  focus:outline-none focus:ring-0 border-gray-300 focus:border-black peer"
                    placeholder=" "
                />
                <label
                    className="peer-focus:font-medium absolute text-sm text-muted-text duration-300 transform -translate-y-8 scale-75 top-3 z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black peer-placeholder-shown:start-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8 cursor-text pointer-events-none"
                >
                    Password
                </label>
            </div>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    handleSubmit()
                }}
                className='w-full py-2 bg-black text-white text-lg flex justify-center items-center space-x-2 duration-150 hover:brightness-75'>
                <span>Sign Up</span>
                <span className='pt-1'>
                    <IoArrowForwardOutline />
                </span>
            </button>
            <div>
                <p className='mt-8 text-center'>Already have an account,
                    <Link to="/login" className='text-blue-500'>{' '}Login in.</Link>
                </p>
            </div>

        </form>
    )
}

export default SignUp
