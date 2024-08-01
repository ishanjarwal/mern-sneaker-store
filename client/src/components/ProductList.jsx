import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import SortMenu from './SortMenu'
import Pagination from './Pagination'
import FilterPanel from './FilterPanel'
import { ITEMS_PER_PAGE, product_images } from '../app/constants'
import { IoCheckmark } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsAsync } from '../slices/productSlice'
import DesktopFilters from './DesktopFilters'

const ProductList = () => {

    const dispatch = useDispatch();
    const products = useSelector(state => state.product.products);
    const totalItems = useSelector(state => state.product.totalItems);
    const state = useSelector(state => state.product.state);


    const [filterMenu, setFilterMenu] = useState(false);
    function handleMenu() {
        if (window.innerWidth > 1028) {
            setFilterMenu(false);
        }
    }
    window.addEventListener('resize', handleMenu);
    useEffect(() => {
        handleMenu();
    }, []);


    const [paginationOptions, setPaginationOptions] = useState({ page: 1, limit: ITEMS_PER_PAGE });
    const [sortOptions, setSortOptions] = useState({ sort_by: 'createdAt', order_by: 'asc', display: 'Newest' });
    const [filterOptions, setFilterOptions] = useState({});

    useEffect(() => {
        dispatch(fetchProductsAsync({ pagination: paginationOptions, sort: sortOptions, filters: filterOptions }));
        document.documentElement.scrollTop = 0;
    }, [paginationOptions, sortOptions, filterOptions]);

    // when sort is clicked, user is moved to page 1 by default
    useEffect(() => {
        setPaginationOptions(prev => ({ ...prev, page: 1 }))
    }, [totalItems, sortOptions]);


    return (
        <div>
            {/* {state === 'pending' && (
                <div className='h-screen w-screen bg-black/25 backdrop-blur-sm fixed top-0 left-0 z-50'>

                </div>
            )} */}
            <FilterPanel setFilterMenu={setFilterMenu} filterMenu={filterMenu} filterOptions={filterOptions} setFilterOptions={setFilterOptions} />
            <div className='flex lg:flex-row flex-col justify-between items-start pt-2 pb-4 px-2'>
                <div className='w-full lg:mb-0 mb-2'>
                    <h1 className='md:text-4xl text-2xl font-bold w-full truncate whitespace-nowrap text-ellipsis'>All Products</h1>
                    <span className='text-sm text-muted-text'>{totalItems}{" "} Products</span>
                </div>
                <div className='flex justify-end w-full space-x-1'>
                    {/* sort and mobile filter button */}
                    <div className='flex-1 lg:hidden block'>
                        <button
                            onClick={() => { setFilterMenu(true) }}
                            className="inline-flex w-full whitespace-nowrap justify-center border border-muted-text bg-white px-4 py-2 text-sm font-medium text-text hover:bg-muted-bg">
                            Filter
                        </button>
                    </div>
                    <div className='lg:flex-none flex-1'>
                        <SortMenu sortOptions={sortOptions} setSortOptions={setSortOptions} />
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-5 py-2'>
                <div className='lg:block hidden col-span-1'>
                    {/* filters */}
                    <DesktopFilters filterOptions={filterOptions} setFilterOptions={setFilterOptions} />
                </div>
                {products && products.length <= 0 && (
                    <div className='py-24 flex justify-center items-center col-span-4'>
                        <h1 className='text-3xl font-bold text-center'>No Products☹️</h1>
                    </div>
                )}
                <div className='self-start grid lg:col-span-4 col-span-5 md:grid-cols-3 grid-cols-2 sm:gap-4 gap-0 '>
                    {products.length > 0 && products.map((product, index) => (
                        <ProductCard key={index} data={{
                            id: product.id,
                            name: product.name,
                            mrp: product.mrp,
                            sp: product.sp,
                            brand: product.brand,
                            images: product.images,
                            thumbnail: product.thumbnail,
                            discountPercentage: product.discountPercentage
                        }} />
                    ))}
                </div>
            </div>
            <div className='border-t border-gray-300 py-4'>
                {/* pagination */}
                <Pagination totalItems={totalItems} paginationOptions={paginationOptions} setPaginationOptions={setPaginationOptions} />
            </div>
        </div>
    )
}

export default ProductList
