import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { GrHomeRounded } from "react-icons/gr";

const BASE_API_URL = 'http://localhost:5000/api/accommodations';

const ListingDetailsPage = () => {
    // Capture the dynamic _id from the URL: /listings/:id
    const { id } = useParams();

    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const primaryImage = listing?.images && listing.images.length > 0 ? listing.images[0] : '';
    const nightlyPrice =
        listing && typeof listing.price === 'number'
            ? listing.price
            : listing ? Number(listing.price) || 0 : 0;

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

                        <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gray-100">
                            {primaryImage ? (
                                <img
                                    src={primaryImage}
                                    alt={listing.title}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
                                    No image available
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

                        <div className='flex w-full gap-[2.5rem]'>

                            <div className='flex flex-col gap-[10px]'>

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
                                        <p>You'll have the apartment for yourself</p>
                                    </div>
                                </div>
                                <div></div>
                                <div></div>
                                <div></div>

                            </div>
                            <div></div>

                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default ListingDetailsPage;