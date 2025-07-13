import React, { useState } from 'react';

export default function ProductTable({ data, onAddToCart, setSortConfig, page, setPage  }) {
    const [hoveredCol, setHoveredCol] = useState(null);
    const [columnOrder, setColumnOrder] = useState([
        'id',
        'image',
        'name',
        'category',
        'price',
        'stock',
        'status',
        'actions',
        'addToCart'
    ]);
    const [draggedCol, setDraggedCol] = useState(null);
    const limit = 10;
    const totalPages = Math.ceil(data.length / limit);
    const currentItems = data.slice((page - 1) * limit, page * limit);

    const handleSort = (colKey) => {
        if (colKey !== 'price' && colKey !== 'stock') return;

        setSortConfig(prev => {
            const isSame = prev.key === colKey;
            return {
            key: colKey,
            direction: isSame && prev.direction === 'asc' ? 'desc' : 'asc',
            };
        });
    };

    const handleDragStart = (e, colKey) => {
        setDraggedCol(colKey);
    };

    const handleDrop = (e, targetColKey) => {
        if (!draggedCol || draggedCol === targetColKey) return;
        const newOrder = [...columnOrder];
        const from = newOrder.indexOf(draggedCol);
        const to = newOrder.indexOf(targetColKey);
        newOrder.splice(from, 1);
        newOrder.splice(to, 0, draggedCol);
        setColumnOrder(newOrder);
    };

    const handleDragOver = (e, colKey) => {
        e.preventDefault();
        setHoveredCol(colKey);
    };

    const handleDragLeave = () => setHoveredCol(null);

    return (
    <div className="bg-white p-4 rounded shadow overflow-x-auto">
        <table className="w-full text-sm text-left">
            <thead>
                <tr className="text-xs uppercase bg-gray-100 text-gray-600">
                    {columnOrder.map((colKey) => (
                    <th
                        key={colKey}
                        draggable
                        onDragStart={(e) => handleDragStart(e, colKey)}
                        onDrop={(e) => handleDrop(e, colKey)}
                        onClick={() => handleSort(colKey)}
                        className={`px-4 py-2 text-sm font-semibold transition-all duration-300 ease-in-out 
                            ${
                            colKey === 'price' || colKey === 'stock'
                                ? 'cursor-pointer hover:text-blue-600'
                                : 'cursor-move'
                            }
                            ${hoveredCol === colKey ? 'ring-2 ring-offset-1 ring-blue-300' : ''}
                        `}
                        onDragOver={(e) => handleDragOver(e, colKey)}
                        onDragLeave={handleDragLeave}
                    >
                        {{
                        id: '#',
                        image: 'Preview',
                        name: 'Title',
                        category: 'Type',
                        price: 'Price ↕',
                        stock: 'Stock ↕',
                        status: 'Status',
                        actions: 'Manage',
                        addToCart: 'Cart',
                        }[colKey]}
                    </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {currentItems.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                    {columnOrder.map((colKey) => (
                        <td key={colKey} className="px-4 py-2">
                        {{
                            id: item.id,
                            image: (
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-10 h-10 rounded object-cover"
                            />
                            ),
                            name: item.name,
                            category: item.category,
                            price: `$${item.price.toFixed(2)}`,
                            stock: item.stock,
                            status: (
                            <span
                                className={`text-xs font-medium px-2 py-1 rounded-full ${
                                item.stock < 5
                                    ? 'bg-red-100 text-red-600'
                                    : 'bg-green-100 text-green-700'
                                }`}
                            >
                                {item.stock < 5 ? 'Low' : 'Available'}
                            </span>
                            ),
                            actions: (
                            <div className="space-x-2">
                                <button className="text-blue-600 text-sm hover:underline">View</button>
                                <button className="text-yellow-500 text-sm hover:underline">Edit</button>
                                <button className="text-red-500 text-sm hover:underline">Delete</button>
                            </div>
                            ),
                            addToCart: (
                            <button
                                onClick={() => onAddToCart(item)}
                                className="text-indigo-600 text-sm hover:underline"
                            >
                                Add to Cart
                            </button>
                            ),
                        }[colKey]}
                        </td>
                    ))}
                    </tr>
                ))}
            </tbody>

        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-500">
                Page {page} of {totalPages}
            </span>
            <div className="space-x-2">
                <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
                >
                Prev
                </button>
                {data.length % limit === 0 && (
                <button
                onClick={() => setPage((prev) => prev + 1)}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                Load More
                </button>
                )}
            </div>
        </div>
    </div>
    );
}
