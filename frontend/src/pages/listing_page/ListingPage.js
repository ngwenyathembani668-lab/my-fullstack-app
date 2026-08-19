import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Showcase from '../../components/Showcase';

const BASE_API_URL = 'http://localhost:5000/api/accommodations';

const ListingPage = () => {
    // Capture the active location query parameter from the URL.
    const [searchParams] = useSearchParams();
    const locationQuery = searchParams.get('location') || '';

    // Local state for the data array, loading flag, and error boundary state.
    const [accommodations, setAccommodations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch operation re-runs whenever the location query changes.
    useEffect(() => {
        let isMounted = true;

        const fetchAccommodations = async () => {
            try {
                setLoading(true);
                setError(null);

                // Build the endpoint based on the active location parameter.
                const endpoint = locationQuery
                    ? `${BASE_API_URL}?location=${encodeURIComponent(locationQuery)}`
                    : BASE_API_URL;

                const response = await fetch(endpoint);

                // Strict network feedback: any non-2xx response is a failure.
                if (!response.ok) {
                    throw new Error(
                        `Backend responded with status ${response.status} (${response.statusText})`
                    );
                }

                const data = await response.json();

                // Guard against unexpected payload shapes.
                if (!Array.isArray(data)) {
                    throw new Error('The backend response format is invalid.');
                }

                if (isMounted) {
                    setAccommodations(data);
                }
            } catch (err) {
                // Safely capture the network failure to display in the error alert.
                if (isMounted) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : 'An unexpected error occurred while loading the listings.'
                    );
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchAccommodations();

        // Cancel state updates if the component unmounts mid-request.
        return () => {
            isMounted = false;
        };
    }, [locationQuery]);

    const hasError = Boolean(error);
    const hasAccommodations = accommodations.length > 0;

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 w-full max-w-[2520px] mx-auto px-4 sm:px-2 md:px-10 xl:px-20 pt-28 pb-16">
                <div className="flex flex-col gap-8">
                    {/* Page heading reflects the active location filter */}
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                            {locationQuery ? `${locationQuery} Stays` : 'All Stays'}
                        </h1>
                        <p className="mt-1 text-sm text-gray-600">
                            {locationQuery
                                ? `Discover accommodations in ${locationQuery}`
                                : 'Discover accommodations in every destination'}
                        </p>
                    </div>

                    {/* ------- Error alert ------- */}
                    {hasError && (
                        <div
                            role="alert"
                            className="w-full p-4 sm:p-5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700"
                        >
                            <p className="font-semibold text-sm sm:text-base">
                                Oops! We couldn't load the listings.
                            </p>
                            <p className="mt-1 text-xs sm:text-sm">
                                {error} — Please ensure the backend server is running on port 5000 and try again.
                            </p>
                        </div>
                    )}

                    {/* ------- Loading spinner ------- */}
                    {loading && !hasError && (
                        <div
                            className="flex flex-col items-center justify-center gap-3 py-20"
                            aria-busy="true"
                            aria-label="Loading listings"
                        >
                            <div className="h-10 w-10 animate-spin rounded-full border-4 border-rose-500 border-t-transparent" />
                            <p className="text-sm text-gray-500">Loading listings...</p>
                        </div>
                    )}

                    {/* ------- Empty state ------- */}
                    {!loading && !hasError && !hasAccommodations && (
                        <p className="text-sm sm:text-base text-gray-500">
                            No accommodations found{locationQuery ? ` in ${locationQuery}` : ''}. Please try another location.
                        </p>
                    )}

                    {/* ------- Responsive listing cards -------
                         Mobile-first: grid-cols-1 collapses to a single column
                         on phones; scales up on larger viewports. */}
                    {!loading && !hasError && hasAccommodations && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6 bg-[#f2f2f2cc]  rounded-[25px] p-[1.8rem] ">
                            {accommodations.map((listing) => (
                                <Link
                                    key={listing._id}
                                    to={`/listings/${listing._id}`}
                                    className="block w-full rounded-2xl overflow-hidden hover:opacity-95 transition-opacity focus:outline-none focus:ring-2 focus:ring-rose-500"
                                >
                                    <Showcase listing={listing} />
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ListingPage;