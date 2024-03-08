import { MdChevronRight, MdChevronLeft } from "react-icons/md";
import { ITEMS_PER_PAGE } from "../app/constants";

export default function Pagination({ paginationOptions, setPaginationOptions, totalItems }) {

    const handlePagination = (page) => {
        setPaginationOptions(prev => ({ ...prev, page: page }))
    }

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 justify-between items-center sm:hidden px-4">
                {paginationOptions.page > 1 ? (
                    <button
                        onClick={() => {
                            if (paginationOptions.page > 1) {
                                setPaginationOptions(prev => ({ ...prev, page: prev.page - 1 }))
                            }
                        }}
                        className="relative px-4 py-3 inline-flex items-center rounded-lg bg-black text-white hover:scale-105 duration-150"
                    >
                        <MdChevronLeft />
                    </button>
                )
                    :
                    <span className="px-8"></span>
                }
                <p className="text-muted-text text-sm">
                    Page
                    <span className="text-text font-bold">{' '}{paginationOptions.page}{' '}</span>
                    of
                    <span className="text-text font-bold">{' '}{Math.ceil(totalItems / ITEMS_PER_PAGE)}</span>
                </p>
                {paginationOptions.page < Math.ceil(totalItems / ITEMS_PER_PAGE) ? (
                    <button
                        onClick={() => {
                            if (Math.ceil(totalItems / ITEMS_PER_PAGE) > paginationOptions.page) {
                                setPaginationOptions(prev => ({ ...prev, page: prev.page + 1 }))

                            }
                        }}
                        className="relative px-4 py-3 inline-flex items-center rounded-lg bg-black text-white hover:scale-105 duration-150"
                    >
                        <MdChevronRight />
                    </button>
                )
                    :
                    <span className="px-8"></span>
                }
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-muted-text">
                        Showing <span className="font-medium">{(paginationOptions.page - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="font-medium">{paginationOptions.page * ITEMS_PER_PAGE < totalItems ? paginationOptions.page * ITEMS_PER_PAGE : totalItems}</span> of{' '}
                        <span className="font-medium">{totalItems}</span> results
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button
                            onClick={() => {
                                if (paginationOptions.page > 1) {
                                    setPaginationOptions(prev => ({ ...prev, page: prev.page - 1 }))
                                }
                            }}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 bg-gray-100 hover:bg-gray-200"
                        >
                            <MdChevronLeft className="h-5 w-5" />
                        </button>
                        {Array.from({ length: Math.ceil(totalItems / ITEMS_PER_PAGE) }).map((item, index) => (
                            <button
                                key={index}
                                onClick={() => { handlePagination(index + 1) }}
                                className={`cursor-pointer relative inline-flex items-center px-4 py-2 text-sm font-semibold  ${index + 1 === paginationOptions.page ? 'bg-black text-white' : 'bg-gray-100 text-text hover:bg-gray-300'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        {/* <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-muted-text">
                            ...
                        </span> */}
                        <button
                            onClick={() => {
                                if (Math.ceil(totalItems / ITEMS_PER_PAGE) > paginationOptions.page) {
                                    setPaginationOptions(prev => ({ ...prev, page: prev.page + 1 }))

                                }
                            }}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 bg-gray-100 hover:bg-gray-200"
                        >
                            <MdChevronRight className="h-5 w-5" />
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    )
}
