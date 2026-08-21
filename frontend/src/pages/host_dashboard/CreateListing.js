import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const BASE_API_URL = 'http://localhost:5000/api/accommodations';

const inputCls = 'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500';

const CreateListing = () => {
  const { token } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    title: '',
    type: '',
    location: '',
    description: '',
    price: '',
    guests: '',
    bedrooms: '',
    bathrooms: '',
    cleaningFee: '',
    serviceFee: '',
    weeklyDiscount: '',
    occupancyTaxes: '',
    images: [''],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image URL inputs
  const handleImageChange = (index, value) => {
    const updatedImages = [...form.images];
    updatedImages[index] = value;
    setForm((prev) => ({
      ...prev,
      images: updatedImages,
    }));
  };

  // Add a new image input field
  const addImageInput = () => {
    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ''],
    }));
  };

  // Remove an image input field
  const removeImageInput = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Client-side validation
  const validate = () => {
    const newErrors = {};

    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.type.trim()) newErrors.type = 'Accommodation type is required';
    if (!form.location.trim()) newErrors.location = 'Location is required';
    if (!form.description.trim()) newErrors.description = 'Description is required';

    // Price validation
    const price = Number(form.price);
    if (!form.price) newErrors.price = 'Price per night is required';
    else if (isNaN(price) || price < 0) newErrors.price = 'Price must be a positive number';

    // Guests validation
    const guests = Number(form.guests);
    if (!form.guests) newErrors.guests = 'Max guests is required';
    else if (isNaN(guests) || guests < 1) newErrors.guests = 'Max guests must be at least 1';

    // Bedrooms validation
    const bedrooms = Number(form.bedrooms);
    if (!form.bedrooms) newErrors.bedrooms = 'Number of bedrooms is required';
    else if (isNaN(bedrooms) || bedrooms < 0) newErrors.bedrooms = 'Bedrooms must be a non-negative number';

    // Bathrooms validation
    const bathrooms = Number(form.bathrooms);
    if (!form.bathrooms) newErrors.bathrooms = 'Number of bathrooms is required';
    else if (isNaN(bathrooms) || bathrooms < 0) newErrors.bathrooms = 'Bathrooms must be a non-negative number';

    // Images validation
    const validImages = form.images.filter((img) => img.trim());
    if (validImages.length === 0) newErrors.images = 'At least one image URL is required';

    // Optional fields - validate if provided
    if (form.cleaningFee && (isNaN(Number(form.cleaningFee)) || Number(form.cleaningFee) < 0)) {
      newErrors.cleaningFee = 'Cleaning fee must be a non-negative number';
    }
    if (form.serviceFee && (isNaN(Number(form.serviceFee)) || Number(form.serviceFee) < 0)) {
      newErrors.serviceFee = 'Service fee must be a non-negative number';
    }
    if (form.weeklyDiscount && (isNaN(Number(form.weeklyDiscount)) || Number(form.weeklyDiscount) < 0 || Number(form.weeklyDiscount) > 100)) {
      newErrors.weeklyDiscount = 'Weekly discount must be between 0 and 100';
    }
    if (form.occupancyTaxes && (isNaN(Number(form.occupancyTaxes)) || Number(form.occupancyTaxes) < 0)) {
      newErrors.occupancyTaxes = 'Occupancy taxes must be a non-negative number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      // Filter out empty image URLs and convert numeric fields
      const validImages = form.images.filter((img) => img.trim());

      const payload = {
        title: form.title.trim(),
        type: form.type.trim(),
        location: form.location.trim(),
        description: form.description.trim(),
        price: Number(form.price),
        guests: Number(form.guests),
        bedrooms: Number(form.bedrooms),
        bathrooms: Number(form.bathrooms),
        images: validImages,
        cleaningFee: form.cleaningFee ? Number(form.cleaningFee) : 0,
        serviceFee: form.serviceFee ? Number(form.serviceFee) : 0,
        weeklyDiscount: form.weeklyDiscount ? Number(form.weeklyDiscount) : 0,
        occupancyTaxes: form.occupancyTaxes ? Number(form.occupancyTaxes) : 0,
      };

      const res = await fetch(BASE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to create listing');

      showToast('Listing created successfully!');
      navigate('/host/dashboard');
    } catch (err) {
      showToast(err.message || 'Failed to create listing', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-10 pt-28 pb-16">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">Create New Listing</h1>
            <p className="mt-1 text-sm text-gray-600">List your accommodation and start hosting.</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-6">
            {/* Basic Information Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className={inputCls}
                    placeholder="e.g., Cozy Apartment in Downtown"
                  />
                  {errors.title && <p className="mt-1 text-xs text-rose-600">{errors.title}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Type *
                    </label>
                    <input
                      type="text"
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      className={inputCls}
                      placeholder="e.g., Entire Apartment"
                    />
                    {errors.type && <p className="mt-1 text-xs text-rose-600">{errors.type}</p>}
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      className={inputCls}
                      placeholder="e.g., New York"
                    />
                    {errors.location && (
                      <p className="mt-1 text-xs text-rose-600">{errors.location}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    className={inputCls + ' resize-none'}
                    placeholder="Describe your accommodation in detail..."
                    rows="5"
                  />
                  {errors.description && (
                    <p className="mt-1 text-xs text-rose-600">{errors.description}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Capacity & Features Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Capacity & Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Max Guests *
                  </label>
                  <input
                    type="number"
                    name="guests"
                    value={form.guests}
                    onChange={handleChange}
                    className={inputCls}
                    placeholder="1"
                    min="1"
                  />
                  {errors.guests && <p className="mt-1 text-xs text-rose-600">{errors.guests}</p>}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Bedrooms *
                  </label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={form.bedrooms}
                    onChange={handleChange}
                    className={inputCls}
                    placeholder="1"
                    min="0"
                  />
                  {errors.bedrooms && (
                    <p className="mt-1 text-xs text-rose-600">{errors.bedrooms}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Bathrooms *
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={form.bathrooms}
                    onChange={handleChange}
                    className={inputCls}
                    placeholder="1"
                    min="0"
                  />
                  {errors.bathrooms && (
                    <p className="mt-1 text-xs text-rose-600">{errors.bathrooms}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Pricing</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Price per Night (USD) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    className={inputCls}
                    placeholder="100"
                    min="0"
                    step="0.01"
                  />
                  {errors.price && <p className="mt-1 text-xs text-rose-600">{errors.price}</p>}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Cleaning Fee (USD)
                  </label>
                  <input
                    type="number"
                    name="cleaningFee"
                    value={form.cleaningFee}
                    onChange={handleChange}
                    className={inputCls}
                    placeholder="0"
                    min="0"
                    step="0.01"
                  />
                  {errors.cleaningFee && (
                    <p className="mt-1 text-xs text-rose-600">{errors.cleaningFee}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Service Fee (USD)
                  </label>
                  <input
                    type="number"
                    name="serviceFee"
                    value={form.serviceFee}
                    onChange={handleChange}
                    className={inputCls}
                    placeholder="0"
                    min="0"
                    step="0.01"
                  />
                  {errors.serviceFee && (
                    <p className="mt-1 text-xs text-rose-600">{errors.serviceFee}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Weekly Discount (%)
                  </label>
                  <input
                    type="number"
                    name="weeklyDiscount"
                    value={form.weeklyDiscount}
                    onChange={handleChange}
                    className={inputCls}
                    placeholder="0"
                    min="0"
                    max="100"
                    step="0.01"
                  />
                  {errors.weeklyDiscount && (
                    <p className="mt-1 text-xs text-rose-600">{errors.weeklyDiscount}</p>
                  )}
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Occupancy Taxes (USD)
                  </label>
                  <input
                    type="number"
                    name="occupancyTaxes"
                    value={form.occupancyTaxes}
                    onChange={handleChange}
                    className={inputCls}
                    placeholder="0"
                    min="0"
                    step="0.01"
                  />
                  {errors.occupancyTaxes && (
                    <p className="mt-1 text-xs text-rose-600">{errors.occupancyTaxes}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Images Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Images</h2>
              <p className="text-sm text-gray-600 mb-4">
                Add at least one image URL. The first image will be used as the main cover photo.
              </p>
              <div className="space-y-3">
                {form.images.map((image, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="url"
                      value={image}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      className={inputCls}
                      placeholder={`Image URL ${index + 1} ${index === 0 ? '(Cover photo)' : ''}`}
                    />
                    {form.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageInput(index)}
                        className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition text-sm whitespace-nowrap"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                {errors.images && <p className="text-xs text-rose-600">{errors.images}</p>}
              </div>

              <button
                type="button"
                onClick={addImageInput}
                className="mt-4 px-4 py-2 rounded-lg bg-gray-500 text-white font-semibold hover:bg-gray-600 transition text-sm"
              >
                Add Another Image
              </button>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-2.5 rounded-lg bg-rose-500 text-white font-semibold hover:bg-rose-600 transition disabled:opacity-50"
              >
                {loading ? 'Creating Listing...' : 'Create Listing'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/host/dashboard')}
                className="flex-1 px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CreateListing;
