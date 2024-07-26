import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { checkAuthAsync } from '../slices/userSlice';

const AuthLayout = () => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.currUser);
    const navigate = useNavigate();
    const state = useSelector(state => state.user.state)

    useEffect(() => {
        if (state === 'idle') {
            navigate('/');
        }
    }, [state]);

    return (
        <div className='w-full min-h-screen bg-gray-100 flex justify-center items-center'>
            <div className='flex lg:flex-row flex-col max-w-6xl w-full bg-white'>
                <div className='flex-1 overflow-hidden relative min-h-48'>
                    <img
                        src="https://i.pinimg.com/originals/95/4d/84/954d84d7da43726de372557d334b3cd5.jpg"
                        className='absolute w-full h-full object-cover object-center'
                    />
                </div>
                <div className='flex-1 py-8 lg:px-24 sm:px-16 px-8'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AuthLayout
