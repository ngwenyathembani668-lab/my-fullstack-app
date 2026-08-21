import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const BASE_API_URL = 'http://localhost:5000/api/accommodations';

const ViewListings = () => {
  const { user, token, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);

  // Fetch all accommodations and filter by host_id
  useEffect(() => {
    if (!isAuthenticated || !user?.id) return;

    let isMounted = true;

    const fetchListings = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(BASE_API_URL);

        if (!response.ok) {
          throw new Error(
            `Backend responded with status ${response.status} (${response.statusText})`
          );
        }

        const allListings = await response.json();

        // Filter listings by host_id to show only the current host's listings
        if (isMounted) {
          const hostListings = Array.isArray(allListings)
            ? allListings.filter((listing) => listing.host_id === user.id)
            : [];
          setListings(hostListings);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : 'An unexpected error occurred while loading your listings.'
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchListings();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, user?.id]);

  // Delete a listing
  const handleDelete = async (listingId) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;

    setDeleting(listingId);
    try {
      const res = await fetch(`${BASE_API_URL}/${listingId}`, {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to delete listing');
      }

      // Remove the deleted listing from state
      setListings((prev) => prev.filter((l) => l._id !== listingId));
      showToast('Listing deleted successfully!');
    } catch (err) {
      showToast(err.message || 'Failed to delete listing', 'error');
    } finally {
      setDeleting(null);
    }
  };

  // Navigate to edit page with listing ID
  const handleUpdate = (listingId) => {
    navigate(`/host/edit-listing/${listingId}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-10 pt-28 pb-16">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">My Listings</h1>
            <p className="mt-1 text-sm text-gray-600">Manage all your active accommodations.</p>
          </div>

          {/* Loading State */}
          {loading && (
            <div
              className="flex flex-col items-center justify-center gap-3 py-20"
              aria-busy="true"
              aria-label="Loading listings"
            >
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-rose-500 border-t-transparent" />
              <p className="text-sm text-gray-500">Loading your listings...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div
              role="alert"
              className="w-full p-4 sm:p-5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700"
            >
              <p className="font-semibold text-sm sm:text-base">
                Oops! We couldn't load your listings.
              </p>
              <p className="mt-1 text-xs sm:text-sm">{error}</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && listings.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="text-center">
                <p className="text-lg sm:text-xl font-semibold text-gray-900">
                  You have no active listings yet.
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  Click 'Create New Listing' to get started!
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate('/host/create-listing')}
                className="mt-4 px-6 py-2.5 rounded-lg bg-rose-500 text-white font-semibold hover:bg-rose-600 transition"
              >
                Create New Listing
              </button>
            </div>
          )}

          {/* Listings Grid */}
          {!loading && !error && listings.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => {
                const primaryImage =
                  listing.images && listing.images.length > 0 ? listing.images[0] : '';
                const nightlyPrice =
                  typeof listing.price === 'number'
                    ? listing.price
                    : Number(listing.price) || 0;

                return (
                  <div
                    key={listing._id}
                    className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
                  >
                    {/* Listing Image */}
                    <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
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

                    {/* Listing Details */}
                    <div className="flex flex-col gap-2 p-4 flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                        {listing.title}
                      </h3>
                      <p className="text-sm text-gray-600">{listing.location}</p>
                      <p className="text-sm text-gray-600">
                        {listing.bedrooms} bed{listing.bedrooms !== 1 ? 's' : ''} ·{' '}
                        {listing.bathrooms} bath{listing.bathrooms !== 1 ? 's' : ''}
                      </p>
                      <p className="text-lg font-semibold text-gray-900 mt-2">
                        ${nightlyPrice.toLocaleString()} <span className="text-sm text-gray-500 font-normal">/ night</span>
                      </p>

                      {/* Action Buttons */}
                      <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
                        <button
                          type="button"
                          onClick={() => handleUpdate(listing._id)}
                          className="flex-1 px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition text-sm"
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(listing._id)}
                          disabled={deleting === listing._id}
                          className="flex-1 px-4 py-2 rounded-lg bg-rose-500 text-white font-semibold hover:bg-rose-600 transition text-sm disabled:opacity-50"
                        >
                          {deleting === listing._id ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ViewListings;
