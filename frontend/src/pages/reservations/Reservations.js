import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useAuth } from '../../context/AuthContext';
import API_BASE_URL from '../../config/api';

const Reservations = () => {
  const { token } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchReservations = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${API_BASE_URL}/reservations/user`, {
          headers: { Authorization: 'Bearer ' + token },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to load reservations');
        if (isMounted) setReservations(data);
      } catch (err) {
        if (isMounted) setError(err.message || 'Failed to load reservations');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    if (token) fetchReservations();
    return () => { isMounted = false; };
  }, [token]);

  const formatDate = (d) => {
    if (!d) return '';
    const date = new Date(d);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 pt-28 pb-16">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">My Reservations</h1>
        <p className="mt-1 text-sm text-gray-500">All your upcoming stays in one place.</p>
        {loading && <p className="mt-6 text-sm text-gray-500">Loading reservations...</p>}
        {error && <p className="mt-6 text-sm text-rose-600">{error}</p>}
        {!loading && !error && reservations.length === 0 && (
          <p className="mt-6 text-sm text-gray-500">You have no reservations yet.</p>
        )}
        <div className="mt-6 flex flex-col gap-4">
          {reservations.map((r) => (
            <div key={r._id} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">{r.listingId?.title || 'Listing'}</h2>
              <p className="mt-1 text-sm text-gray-500">{r.listingId?.location || ''}</p>
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-700">
                <span>Check-in: {formatDate(r.checkInDate)}</span>
                <span>Check-out: {formatDate(r.checkOutDate)}</span>
                <span className="font-semibold">Total: ${Number(r.totalPrice) || 0}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Reservations;
