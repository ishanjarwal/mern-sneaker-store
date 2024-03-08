import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import MobileNavbar from '../components/MobileNavbar'
import CartPanel from '../components/CartPanel'
import WishlistModal from '../components/WishlistModal'

const MainLayout = () => {

    const [mobileNav, setMobileNav] = useState(false);
    const [cartPanel, setCartPanel] = useState(false);
    const [wishlistModal, setWishlistModal] = useState(false);
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
            <WishlistModal wishlistModal={wishlistModal} setWishlistModal={setWishlistModal} />
            <MobileNavbar mobileNav={mobileNav} setMobileNav={setMobileNav} />
            <Navbar setCartPanel={setCartPanel} setMobileNav={setMobileNav} setWishlistModal={setWishlistModal} />
            <CartPanel cartPanel={cartPanel} setCartPanel={setCartPanel} />
            <div className='max-w-7xl mx-auto w-full'>
                <Outlet />
            </div>
        </main>
    )
}

export default MainLayout
