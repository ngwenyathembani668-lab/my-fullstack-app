import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useAuth } from '../../context/AuthContext';

const HostDashboard = () => {
  const { user } = useAuth();
  const firstName = user?.name ? user.name.split(' ')[0] : 'Host';
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 pt-28 pb-16">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Welcome, {firstName}!</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your hosting business from your dashboard.</p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Link to="/host/listings" className="block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <h2 className="text-lg font-semibold text-gray-900">View My Listings</h2>
            <p className="mt-1 text-sm text-gray-500">See all the accommodations you currently host.</p>
          </Link>
          <Link to="/host/create-listing" className="block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <h2 className="text-lg font-semibold text-gray-900">Create New Listing</h2>
            <p className="mt-1 text-sm text-gray-500">Add a brand new accommodation to your portfolio.</p>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HostDashboard;
