import React from 'react';

export default function Header({ cartCount, onCartClick, onSearch  }) {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md sticky top-0 z-50"> 
      <div className="text-xl font-bold text-gray-800">
        Product Dashboard
      </div>

      <div className="flex-1 mx-8 max-w-xl">
        <input
          type="text"
          placeholder="Search products..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="relative">
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            onClick={onCartClick}
          >
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8H19M7 13l1.6-8M9 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
          </svg>
        </div>
        <img
          src="https://i.pravatar.cc/40?img=3"
          alt="User Avatar"
          className="w-9 h-9 rounded-full border border-gray-300 object-cover"
        />
      </div>
    </header>
  );
}
