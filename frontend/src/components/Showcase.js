import React from 'react';

// Presentational card component.
// All data comes in via props - this component contains NO fetch logic.
const Showcase = ({ listing }) => {
    const { _id, title, location, price, images } = listing;
    const primaryImage = images && images.length > 0 ? images[0] : '';
    const nightlyPrice =
        typeof price === 'number' ? price : Number(price) || 0;

    return (
        // The unique MongoDB _id string drives the React key at the call site.
        <article
            key={_id}
            className="w-full flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow"
        >
            <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
                {primaryImage ? (
                    <img
                        src={primaryImage}
                        alt={title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
                        No image available
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-1 p-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-1">
                    {title}
                </h3>
                <p className="text-sm text-gray-600">{location}</p>
                <p className="mt-2 text-sm text-gray-900">
                    <span className="font-semibold">
                        ${nightlyPrice.toLocaleString()}
                    </span>{' '}
                    <span className="text-gray-500">/ night</span>
                </p>
            </div>
        </article>
    );
};

export default Showcase;