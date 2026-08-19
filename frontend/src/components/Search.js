import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { HiChevronDown } from 'react-icons/hi';

const LOCATION_OPTIONS = [
    { label: 'All Locations', value: '' },
    { label: 'New York', value: 'New York' },
    { label: 'Paris', value: 'Paris' },
    { label: 'Tokyo', value: 'Tokyo' },
    { label: 'London', value: 'London' },
    { label: 'Rome', value: 'Rome' },
];

const Search = () => {
    const [isLocationOpen, setIsLocationOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState('All Locations');
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    // Close the dropdown when clicking outside of it.
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsLocationOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLocationSelect = (locationValue) => {
        setSelectedLocation(
            locationValue === '' ? 'All Locations' : locationValue
        );

        // Close the dropdown automatically upon selection.
        setIsLocationOpen(false);

        // Redirect to the dedicated Listings page.
        if (locationValue === '') {
            navigate('/listings');
        } else {
            navigate(`/listings?location=${encodeURIComponent(locationValue)}`);
        }
    };

    return (
        <div
            className='
        py-2
        border-[1px]
        w-full
        md:w-auto
        rounded-full
        shadow-sm
        hover:shadow-md
        transition
        cursor-pointer
    '
        >
            <div
                className='
                    flex
                    flex-row
                    items-center
                    justify-between
                '
            >
                {/* Location dropdown trigger */}
                <div
                    ref={dropdownRef}
                    className="relative"
                >
                    <button
                        type="button"
                        onClick={() => setIsLocationOpen((prev) => !prev)}
                        className='
                            flex
                            flex-row
                            items-center
                            gap-2
                            text-sm
                            font-semibold
                            px-6
                            py-1
                            outline-none
                        '
                        aria-haspopup="listbox"
                        aria-expanded={isLocationOpen}
                    >
                        <span>{selectedLocation}</span>
                        <HiChevronDown
                            size={16}
                            className={`transition-transform duration-200 ${isLocationOpen ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {/* Responsive dropdown menu */}
                    {isLocationOpen && (
                        <div
                            role="listbox"
                            className="
                                absolute
                                left-0
                                top-full
                                mt-2
                                w-44
                                rounded-xl
                                bg-white
                                border
                                border-gray-200
                                shadow-lg
                                py-2
                                z-50
                            "
                        >
                            {LOCATION_OPTIONS.map((option) => (
                                <button
                                    key={option.label}
                                    type="button"
                                    role="option"
                                    aria-selected={selectedLocation === option.label}
                                    onClick={() => handleLocationSelect(option.value)}
                                    className={`
                                        w-full
                                        text-left
                                        px-4
                                        py-2
                                        text-sm
                                        hover:bg-gray-100
                                        transition-colors
                                        ${selectedLocation === option.label ? 'font-semibold text-rose-500' : 'text-gray-700'}
                                    `}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div
                    className='
                        hidden
                        sm:block
                        text-sm
                        font-semibold
                        px-6
                        border-x-[1px]
                        flex-1
                        text-center
                    '
                >
                    Pick date
                </div>
                <div
                    className='
                        text-sm
                        pl-6
                        pr-2
                        text-gray-600
                        flex
                        flex-row
                        items-center
                        gap-3
                    '
                >
                    <div className='hidden sm:block font-semibold'>Add Guests</div>
                    <div className='
                        p-2
                        bg-rose-500
                        rounded-full
                        text-white
                    '>
                        <IoSearch size={18} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search;