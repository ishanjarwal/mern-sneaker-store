import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserAsync } from '../slices/userSlice';
import { Navigate } from 'react-router-dom';

const Logout = () => {

    const user = useSelector(state => state.user.currUser);
    const dispatch = useDispatch();
    useEffect(() => {
        if (user) {
            dispatch(logoutUserAsync());
        }
    }, []);
    if (!user) {
        return <Navigate to={"/"} />
    }
    return (
        <div>
        </div>
    )
}

export default Logout
