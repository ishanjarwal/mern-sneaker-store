import React, { useState } from 'react'
import { IoMenuSharp } from 'react-icons/io5'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AdminLayout = () => {

    const adminLinks = [
        // {
        //     name: "Dashboard",
        //     link: '/'
        // },
        {
            name: "Add New Product",
            link: "add-product"
        },
        {
            name: "Manage Products",
            link: ""
        },
        {
            name: "Manage Categories",
            link: "manage-categories"
        },
        {
            name: "Manage Brands",
            link: "manage-brands"
        },
        {
            name: "Manage Users",
            link: "manage-users"
        },
        {
            name: "Manage Orders",
            link: "manage-orders"
        },
        // {
        //     name: "Manage Collections",
        //     link: "/"
        // },

    ]
    const navigate = useNavigate();
    const [sidepanel, setSidepanel] = useState(true);
    const location = useLocation();
    const user = useSelector(state => state.user.currUser);
    if (user?.role == 'customer') {
        navigate('/');
    }
    if (!user) {
        navigate('/login');
    }

    return (
        <main>
            <div className='flex items-start'>
                {sidepanel && (
                    <div className='py-8 max-w-64 w-full bg-black h-screen max-h-screen overflow-y-auto'>
                        <h1 className='text-3xl mb-4 px-6 text-white font-bold uppercase'>LOGO</h1>
                        <ul className='px-4 py-2'>
                            {adminLinks.map((el, index) => (
                                <li key={index} className='mb-2'>
                                    <Link
                                        to={el.link}
                                        className={`block py-2 px-3 duration-150 cursor-pointer rounded-md hover:bg-white hover:text-black  ${location.pathname.split('/admin/')[1] === el.link ? 'bg-white text-text' : 'bg-transparent text-white'}`}>
                                        {el.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className='flex-1 w-full min-h-screen max-h-screen overflow-y-auto'>
                    <header className='py-2 px-4 bg-muted-bg flex justify-between items-center'>
                        <div>
                            <button
                                onClick={() => { setSidepanel(!sidepanel) }}
                                className='text-xl font-bold text-text p-2'>
                                <IoMenuSharp />
                            </button>
                        </div>

                        <div>
                            {/* profile options */}

                        </div>
                    </header>
                    <div>
                        <Outlet />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default AdminLayout
