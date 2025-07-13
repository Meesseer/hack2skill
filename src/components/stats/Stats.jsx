import React from 'react';

const Stats = ({ products }) => {
    const totalProducts = products.length;

    const totalRevenue = products.reduce((sum, item) => {
        return sum + item.price * (item.stock || 0);
    }, 0);

    const lowStockCount = products.filter((p) => p.stock < 5).length;

    const uniqueCategories = new Set(products.map((p) => p.category));

    return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
        <h3 className="text-sm text-gray-500">Total Products</h3>
        <p className="text-xl font-semibold text-gray-800">{totalProducts}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
        <h3 className="text-sm text-gray-500">Total Revenue</h3>
        <p className="text-xl font-semibold text-green-600">${totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
        <h3 className="text-sm text-gray-500">Low Stock Items</h3>
        <p className="text-xl font-semibold text-red-500">{lowStockCount}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
        <h3 className="text-sm text-gray-500">Categories</h3>
        <p className="text-xl font-semibold text-indigo-500">{uniqueCategories.size}</p>
        </div>
    </div>
    );
}

export default Stats;
