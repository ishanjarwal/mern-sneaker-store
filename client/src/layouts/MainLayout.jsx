import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import MobileNavbar from '../components/MobileNavbar'
import CartPanel from '../components/CartPanel'
import WishlistModal from '../components/WishlistModal'
import Footer from '../components/Footer'

const MainLayout = () => {

    const [mobileNav, setMobileNav] = useState(false);
    function handleMenu() {
        if (window.innerWidth > 1028) {
            setMobileNav(false);
        }
    }
    window.addEventListener('resize', handleMenu);
    useEffect(() => {
        handleMenu();
    }, []);

    return (
        <main>
            <WishlistModal />
            <MobileNavbar mobileNav={mobileNav} setMobileNav={setMobileNav} />
            <Navbar setMobileNav={setMobileNav} />
            <CartPanel />
            <div className='max-w-7xl mx-auto w-full'>
                <Outlet />
            </div>
            <Footer />
        </main>
    )
}

export default MainLayout
