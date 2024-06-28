import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import axios from 'axios'
import { DOMAIN } from '../app/constants';

const Protected = ({ children }) => {

    const [auth, setAuth] = useState(null);
    async function checkAuth() {
        try {
            const response = await axios.get(DOMAIN + "/api/user/check-auth");
            if (response.status == 200) {
                setAuth(true)
            } else {
                setAuth(false);
            }
        } catch (err) {
            setAuth(false);
        }
    }
    useEffect(() => {
        checkAuth();
    }, []);

    if (auth === false) {
        return <Navigate to={'/login'} />
    }
    return (
        <>
            {/* preloder */}
            {!auth && (
                <div className='h-screen max-h-screen w-full bg-black/50 backdrop-blur-sm flex justify-center items-center'>
                    loading
                </div>
            )}
            {auth && (
                <div>
                    {children}
                </div>
            )}
        </>
    )
}

export default Protected
