import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom'
import { resetPasswordAsync } from '../slices/userSlice';

const ChangePassword = () => {

    const { token } = useParams();
    const [newPass, setNewPass] = useState("");
    const dispatch = useDispatch();
    const state = useSelector(state => state.user.state);
    if (state === 'fulfilled') {
        return <Navigate to={'/logout'} />
    }
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Change your password
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form action="#" method="POST" className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            New Password
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                onChange={(e) => {
                                    setNewPass(e.target.value);
                                }}
                                value={newPass}
                                required
                                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                dispatch(resetPasswordAsync({ password: newPass, token: token }))
                            }}
                            className="flex w-full justify-center rounded-md bg-black py-1.5 px-3 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-zinc-700"
                        >
                            Change
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword
