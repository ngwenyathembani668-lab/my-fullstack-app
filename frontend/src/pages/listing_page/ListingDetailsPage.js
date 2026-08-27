import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './ListingDetailsPage.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useAuth } from '../../context/AuthContext';
import { useModal } from '../../context/ModalContext';
import { useToast } from '../../context/ToastContext';
import { GrHomeRounded } from "react-icons/gr";
import { MdOutlineCleaningServices } from "react-icons/md";
import { BsDoorClosed } from "react-icons/bs";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { GiThreeLeaves } from "react-icons/gi";
import { BiSolidWasher } from "react-icons/bi";
import { BiFridge } from "react-icons/bi";
import { PiBoneDuotone } from "react-icons/pi";
import { GiCctvCamera } from "react-icons/gi";
import { IoIosWifi } from "react-icons/io";
import { TbAirConditioning } from "react-icons/tb";
import { FaKitchenSet } from "react-icons/fa6";
import { BiSolidDryer } from "react-icons/bi";
import { LiaBicycleSolid } from "react-icons/lia";

const BASE_API_URL = 'http://localhost:5000/api/accommodations';

// ----- Date & currency helpers (booking engine) -----
const startOfDay = (date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate());

const addDays = (date, days) => {
    const next = new Date(date);
    next.setDate(next.getDate() + days);
    return next;
};

// Formats a Date as DD/MM/YY, or the placeholder if none selected yet.
const toDDMMYY = (date) => {
    if (!date) return 'DD/MM/YY';
    const d = startOfDay(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = String(d.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
};

const formatMoney = (value) => `$${Math.round(Number(value) || 0)}`;

const ListingDetailsPage = () => {
    // Capture the dynamic _id from the URL: /listings/:id
    const { id } = useParams();

    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // ============================================================
    // Phase 3 — Booking calculator engine (.calc-container) state
    // ============================================================
    const [showCheckInCal, setShowCheckInCal] = useState(false);
    const [showCheckOutCal, setShowCheckOutCal] = useState(false);
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);

    // These two calendars are FULLY INDEPENDENT of the calculator
    // states above — they only drive the booking-date range text.
    const [bookingCheckIn, setBookingCheckIn] = useState(null);
    const [bookingCheckOut, setBookingCheckOut] = useState(null);

    // ============================================================
    // Phase 4 — Reservation checkout engine
    // ============================================================
    const { isAuthenticated, token } = useAuth();
    const { openLogin } = useModal();
    const { showToast } = useToast();
    const [reserving, setReserving] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const fetchListing = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(`${BASE_API_URL}/${id}`);

                // Strict network feedback: any non-2xx response is a failure.
                if (!response.ok) {
                    throw new Error(
                        `Backend responded with status ${response.status} (${response.statusText})`
                    );
                }

                const data = await response.json();

                if (isMounted) {
                    setListing(data);
                }
            } catch (err) {
                if (isMounted) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : 'An unexpected error occurred while loading this listing.'
                    );
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchListing();

        return () => {
            isMounted = false;
        };
    }, [id]);

    const listingImages = Array.isArray(listing?.images)
        ? listing.images.filter((image) => typeof image === 'string' && image.trim())
        : [];
    const primaryImage = listingImages[0] || '';
    const nightlyPrice =
        listing && typeof listing.price === 'number'
            ? listing.price
            : listing ? Number(listing.price) || 0 : 0;

    // ----- Numeric properties pulled from the listing document -----
    const safePrice = Number(listing?.price) || nightlyPrice || 0;
    const safeWeeklyDiscount = Number(listing?.weeklyDiscount) || 0;
    const safeCleaningFee = Number(listing?.cleaningFee) || 0;
    const safeServiceFee = Number(listing?.serviceFee) || 0;
    const safeOccupancyTaxes = Number(listing?.occupancyTaxes) || 0;

    const todayStart = startOfDay(new Date());

    // ----- Live financial loop (recomputes whenever dates shift) -----
    const nights =
        checkInDate && checkOutDate && checkOutDate > checkInDate
            ? Math.round((startOfDay(checkOutDate) - startOfDay(checkInDate)) / 86400000)
            : 0;

    const subtotal = safePrice * nights;
    // Weekly discount kicks in for stays of 7+ nights (percentage based).
    const weeklyDiscount =
        nights >= 7 && safeWeeklyDiscount > 0
            ? Math.round(subtotal * (safeWeeklyDiscount / 100))
            : 0;
    const finalTotal =
        subtotal - weeklyDiscount + safeCleaningFee + safeServiceFee + safeOccupancyTaxes;

    // ----- Independent calendars -> booking-date range text -----
    const bookingRangeText = `${toDDMMYY(bookingCheckIn)} – ${toDDMMYY(bookingCheckOut)}`;

    // ----- Calculator validation handlers -----
    const handleCheckInChange = (value) => {
        const normalized = value ? startOfDay(value) : null;
        setCheckInDate(normalized);
        setShowCheckInCal(false);
        // Strict: if a check-out already exists it must stay AFTER check-in.
        if (checkOutDate && normalized && normalized >= startOfDay(checkOutDate)) {
            setCheckOutDate(null);
        }
    };

    const handleCheckOutChange = (value) => {
        const normalized = value ? startOfDay(value) : null;
        setShowCheckOutCal(false);
        // Strict validation: reject any check-out on/before the check-in date.
        if (checkInDate && normalized && normalized <= startOfDay(checkInDate)) {
            return;
        }
        setCheckOutDate(normalized);
    };

    // ----- Independent calendars handlers (no pricing influence) -----
    const handleBookingCheckIn = (value) => {
        const normalized = value ? startOfDay(value) : null;
        setBookingCheckIn(normalized);
        if (bookingCheckOut && normalized && normalized >= startOfDay(bookingCheckOut)) {
            setBookingCheckOut(null);
        }
    };

    const handleBookingCheckOut = (value) => {
        const normalized = value ? startOfDay(value) : null;
        if (bookingCheckIn && normalized && normalized <= startOfDay(bookingCheckIn)) {
            return;
        }
        setBookingCheckOut(normalized);
    };

    // ----- Reservation checkout handler -----
    const handleReserve = async () => {
        // Block unauthorized access: require login before booking.
        if (!isAuthenticated) {
            openLogin();
            showToast('Please log in to make a reservation', 'error');
            return;
        }
        if (!checkInDate || !checkOutDate) {
            showToast('Please select check-in and check-out dates', 'error');
            return;
        }
        setReserving(true);
        try {
            const res = await fetch('http://localhost:5000/api/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
                body: JSON.stringify({
                    listingId: id,
                    checkInDate: checkInDate.toISOString(),
                    checkOutDate: checkOutDate.toISOString(),
                    totalPrice: finalTotal,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Failed to create reservation');
            setShowSuccessModal(true);
            showToast('Reservation has been successfully created!');
        } catch (err) {
            showToast(err.message || 'Failed to create reservation', 'error');
        } finally {
            setReserving(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 w-full max-w-[2520px] mx-auto px-4 sm:px-2 md:px-10 xl:px-20 pt-28 pb-16">
                {loading && (
                    <div
                        className="flex flex-col items-center justify-center gap-3 py-20"
                        aria-busy="true"
                        aria-label="Loading listing details"
                    >
                        <div className="h-10 w-10 animate-spin rounded-full border-4 border-rose-500 border-t-transparent" />
                        <p className="text-sm text-gray-500">Loading listing details...</p>
                    </div>
                )}

                {error && !loading && (
                    <div
                        role="alert"
                        className="w-full p-4 sm:p-5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700"
                    >
                        <p className="font-semibold text-sm sm:text-base">
                            Oops! We couldn't load this listing.
                        </p>
                        <p className="mt-1 text-xs sm:text-sm">{error}</p>
                    </div>
                )}

                {!loading && !error && listing && (
                    <div className="flex flex-col gap-6">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                                {listing.title}
                            </h1>
                            <p className="mt-1 text-sm text-gray-600">
                                {listing.location} · {listing.type}
                            </p>
                        </div>

                        <div className={`listing-gallery${listingImages.length > 1 ? ' listing-gallery--with-alternatives' : ''}`}>
                            <div className="listing-gallery__primary">
                                {primaryImage ? (
                                    <img src={primaryImage} alt={`${listing.title} - main view`} />
                                ) : (
                                    <div className="listing-gallery__empty">No image available</div>
                                )}
                            </div>

                            {listingImages.length > 1 && (
                                <div className="listing-gallery__alternatives">
                                    {listingImages.slice(1, 5).map((image, index) => (
                                        <div className="listing-gallery__alternative" key={`${image}-${index}`}>
                                            <img
                                                src={image}
                                                alt={`${listing.title} - view ${index + 2}`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="text-sm text-gray-700">{listing.description}</p>
                            <p className="text-sm text-gray-900">
                                <span className="font-semibold">
                                    ${nightlyPrice.toLocaleString()}
                                </span>{' '}
                                <span className="text-gray-500">/ night</span>
                            </p>
                        </div>

                        <div className='flex flex-col lg:flex-row w-full gap-6 lg:gap-[2.5rem] items-start lg:items-center '>

                            <div className='flex flex-col gap-[10px] pb-[1.5rem] border-b-[2px] border-b-[#555] w-full lg:w-[60%] justify-start '>

                                <div>
                                    <div className='
                                        flex
                                        gap-[5px]
                                        items-center
                                    '>
                                        <GrHomeRounded />
                                        <p className='
                                            font-semibold
                                            text-[1.1rem]
                                        '>Entire apartment</p>
                                    </div>
                                    <div>
                                        <p className='
                                            text-[#555]
                                            pl-[22px]
                                        '>You'll have the apartment for yourself</p>
                                    </div>
                                </div>
                                <div>
                                    <div className='
                                        flex
                                        gap-[5px]
                                        items-center
                                    '>
                                        <MdOutlineCleaningServices />
                                        <p className='
                                            font-semibold
                                            text-[1.1rem]
                                        '>Enhanced Cleaning:</p>
                                    </div>
                                    <div>
                                        <p className='
                                            text-[#555]
                                            pl-[22px]
                                        '>This Host committed to Airbnb's 5-step enhanced cleaning process.</p>
                                    </div>
                                </div>
                                <div>
                                    <div className='
                                        flex
                                        gap-[5px]
                                        items-center
                                    '>
                                        <BsDoorClosed />
                                        <p className='
                                            font-semibold
                                            text-[1.1rem]
                                        '>Self Check-in:</p>
                                    </div>
                                    <div>
                                        <p className='
                                            text-[#555]
                                            pl-[22px]
                                        '>Check yourself in with the keypad</p>
                                    </div>
                                </div>
                                <div>
                                    <div className='
                                        flex
                                        gap-[5px]
                                        items-center
                                    '>
                                        <BsFillCalendarDateFill />
                                        <p className='
                                            font-semibold
                                            text-[1.1rem]
                                        '>Free cancellation before Feb 14</p>
                                    </div>
                                    <div>
                                        <p></p>
                                    </div>
                                </div>

                            </div>

                            {/* price calculator */}
                            <div className="w-full sm:w-[80%] lg:w-[40%] lg:flex-1 mx-auto sm:mx-0">
                                <div className="calc-container w-full rounded-xl border border-gray-200 bg-white p-5 shadow-md sm:p-6">
                                    <div className="flex items-baseline gap-1">
                                        <h4 className="dynamic-price-in-dolars text-2xl font-semibold text-gray-900">
                                            {formatMoney(safePrice)}
                                        </h4>
                                        <span className="text-sm text-gray-500">/ night</span>
                                    </div>

                                    {/* Collapsible check-in calculator */}
                                    <div className="mt-4 overflow-hidden rounded-lg border border-gray-300">
                                        <button
                                            type="button"
                                            aria-expanded={showCheckInCal}
                                            onClick={() => setShowCheckInCal((prev) => !prev)}
                                            className="w-full px-4 py-3 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
                                        >
                                            (select check-in date)
                                        </button>
                                        {showCheckInCal && (
                                            <div className="check-in-calender border-t border-gray-200 p-2">
                                                <Calendar
                                                    onChange={handleCheckInChange}
                                                    value={checkInDate}
                                                    minDate={todayStart}
                                                    tileDisabled={({ date }) => date < todayStart}
                                                    next2Label={null}
                                                    prev2Label={null}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Collapsible check-out calculator */}
                                    <div className="mt-2 overflow-hidden rounded-lg border border-gray-300">
                                        <button
                                            type="button"
                                            aria-expanded={showCheckOutCal}
                                            onClick={() => setShowCheckOutCal((prev) => !prev)}
                                            className="w-full px-4 py-3 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
                                        >
                                            (select check-out date)
                                        </button>
                                        {showCheckOutCal && (
                                            <div className="check-out-calender border-t border-gray-200 p-2">
                                                <Calendar
                                                    onChange={handleCheckOutChange}
                                                    value={checkOutDate}
                                                    minDate={
                                                        checkInDate
                                                            ? addDays(startOfDay(checkInDate), 1)
                                                            : todayStart
                                                    }
                                                    tileDisabled={({ date }) =>
                                                        checkInDate
                                                            ? date <= startOfDay(checkInDate)
                                                            : date < todayStart
                                                    }
                                                    next2Label={null}
                                                    prev2Label={null}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Cost breakdown */}
                                    <div className="mt-4 space-y-2 border-t border-gray-200 pt-4 text-sm text-gray-800">
                                        <div className="price-des flex items-center justify-between">
                                            <span>{formatMoney(safePrice)} x {nights} {nights === 1 ? 'night' : 'nights'}</span>
                                            <span>{formatMoney(subtotal)}</span>
                                        </div>
                                        <div className="price-des flex items-center justify-between">
                                            <span>Weekly discount</span>
                                            <span>{weeklyDiscount > 0 ? `-${formatMoney(weeklyDiscount)}` : formatMoney(0)}</span>
                                        </div>
                                        <div className="price-des flex items-center justify-between">
                                            <span>Cleaning fee</span>
                                            <span>{formatMoney(safeCleaningFee)}</span>
                                        </div>
                                        <div className="price-des flex items-center justify-between">
                                            <span>Service fee</span>
                                            <span>{formatMoney(safeServiceFee)}</span>
                                        </div>
                                        <div className="price-des flex items-center justify-between">
                                            <span>Occupancy taxes</span>
                                            <span>{formatMoney(safeOccupancyTaxes)}</span>
                                        </div>
                                        <div className="total-costs flex items-center justify-between border-t border-gray-200 pt-3 font-semibold text-gray-900">
                                            <span>Total</span>
                                            <span>{formatMoney(finalTotal)}</span>
                                        </div>
                                    </div>

                                    {/* Reservation checkout button */}
                                    <div className="reservation-btn mt-4">
                                        <button
                                            type="button"
                                            onClick={handleReserve}
                                            disabled={reserving}
                                            className="w-full rounded-lg bg-rose-500 py-3 text-sm font-semibold text-white transition hover:bg-rose-600 disabled:opacity-50"
                                        >
                                            {reserving ? 'Reserving...' : 'Reserve'}
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>


                        <div className=' w-full lg:w-[79%] flex flex-col mt-[50px]'>

                            <div className=' pb-[20px] border-b-[#555] border-b-[2px] '>
                                <p className=' text-[1.1rem] font-semibold '>Where You'll Sleep</p>
                                <img className=' w-full sm:w-[280px] h-auto sm:h-[200px] rounded-[10px] object-cover mt-[25px] ' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU_Y4IYuN1dSRUlTmnXPVUYWQmrw-1kTT1XINBPAkmoA&s=10' alt='Spacious bedroom with comfotable bed' />
                                <p className=' text-[#555] mt-[8px] '>Spacious bedroom with comfotable bed</p>
                                <p className=' text-[#555] '>Total Bedrooms: 2</p>
                            </div>

                        </div>


                        <div className=' flex flex-col pb-[50px] border-b-[#555] border-b-2 w-full lg:w-[79%] '>

                            <p className=' mb-[20px] text-[1.1rem] font-semibold '>What this place offers</p>
                            <div className=' grid grid-cols-2 '>

                                <div>
                                    <span className=' flex items-center gap-[8px] '>
                                        <GiThreeLeaves className=' size-[18px] ' />
                                        Garden View
                                    </span>
                                    <span className=' flex items-center gap-[8px] '>
                                        <BiSolidWasher className=' size-[18px] ' />
                                        Free washer-in building
                                    </span>
                                    <span className=' flex items-center gap-[8px] '>
                                        <BiFridge className=' size-[18px] ' />
                                        Refrigerator
                                    </span>
                                    <span className=' flex items-center gap-[8px] '>
                                        <PiBoneDuotone className=' size-[18px] ' />
                                        Pets allowed
                                    </span>
                                    <span className=' flex items-center gap-[8px] '>
                                        <GiCctvCamera className=' size-[18px] ' />
                                        Security cameras
                                    </span>
                                    <button className=' rounded bg-black text-[#fff] hover:bg-rose-500 p-2 mt-[20px] '>View all 37 amenities</button>
                                </div>

                                 <div>
                                    <span className=' flex items-center gap-[8px] '>
                                        <IoIosWifi className=' size-[18px] ' />
                                        Wifi
                                    </span>
                                    <span className=' flex items-center gap-[8px] '>
                                        <TbAirConditioning className=' size-[18px] ' />
                                        Central air conditioning
                                    </span>
                                    <span className=' flex items-center gap-[8px] '>
                                        <FaKitchenSet className=' size-[18px] ' />
                                        Kitchen
                                    </span>
                                    <span className=' flex items-center gap-[8px] '>
                                        <BiSolidDryer className=' size-[18px] ' />
                                        Dryer
                                    </span>
                                    <span className=' flex items-center gap-[8px] '>
                                        <LiaBicycleSolid className=' size-[18px] ' />
                                        Bicycles
                                    </span>
                                </div>

                            </div>

                        </div>


                        <div className=' w-full lg:w-[79%] pb-[60px] border-b-[#555] border-b-2 mb-[80px] '>

                            <p className=' text-[1.4rem] font-semibold '>7 Nights in New York</p>
                            <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 w-full lg:w-[79%]'>

                                <div className=' flex flex-col flex-1 '>

                                    <p className=' text-[0.98rem] font-semibold '>Check-in</p>
                                    <div className=' booking-date '>
                                        <span className=' text-[0.75rem] sm:text-[0.8rem] text-[#555] break-words'>{bookingRangeText}</span>
                                    </div>
                                    {/* add the calendar here! — Calendar A: independent of price calculator */}
                                    <div className='mt-2 overflow-x-auto'>
                                        <Calendar
                                            onChange={handleBookingCheckIn}
                                            value={bookingCheckIn}
                                            minDate={todayStart}
                                            tileDisabled={({ date }) => date < todayStart}
                                            next2Label={null}
                                            prev2Label={null}
                                        />
                                    </div>

                                </div>
                                <div className=' flex flex-col flex-1 '>

                                    <p className=' text-[0.98rem] font-semibold '>Check-out</p>
                                    <div className=' booking-date '>
                                        <span className=' text-[0.75rem] sm:text-[0.8rem] text-[#555] break-words'>{bookingRangeText}</span>
                                    </div>
                                    {/* add the calendar here! — Calendar B: independent of price calculator */}
                                    <div className='mt-2 overflow-x-auto'>
                                        <Calendar
                                            onChange={handleBookingCheckOut}
                                            value={bookingCheckOut}
                                            minDate={
                                                bookingCheckIn
                                                    ? addDays(startOfDay(bookingCheckIn), 1)
                                                    : todayStart
                                            }
                                            tileDisabled={({ date }) =>
                                                bookingCheckIn
                                                    ? date <= startOfDay(bookingCheckIn)
                                                    : date < todayStart
                                            }
                                            next2Label={null}
                                            prev2Label={null}
                                        />
                                    </div>

                                </div>

                            </div>

                        </div>


                    </div>
                )}
            </main>

            <Footer />

            {/* Reservation success modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 sm:p-8 shadow-xl">
                        <h2 className="text-xl font-semibold text-gray-900">Booking Confirmed</h2>
                        <p className="mt-3 text-sm text-gray-600">
                            Reservation has been successfully created!
                        </p>
                        <button
                            type="button"
                            onClick={() => setShowSuccessModal(false)}
                            className="mt-6 w-full rounded-lg bg-rose-500 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListingDetailsPage;
