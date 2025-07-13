import React, { useMemo,useState, useEffect } from 'react';
import Header from './components/header/Header';
import Slidebar from './components/slidebar/SlideBar';
import ProductTable from './components/producttable/producttable';
import generateMockProducts from './utils/GenerateData';
import Stats from './components/stats/Stats';

function App() {
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [allProducts] = useState(() => generateMockProducts(999));
  const [page, setPage] = useState(1);
  const limit = 10;
  const [rawSearch, setRawSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const updateQty = (id, newQty) => {
    if (newQty <= 0) return removeItem(id);
    setCartItems(prev =>
      prev.map(item => (item.id === id ? { ...item, qty: newQty } : item))
    );
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  };

  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [allProducts, searchQuery]);

    const sortedProducts = useMemo(() => {
    let sorted = [...filteredProducts];

    if (sortConfig.key) {
      sorted.sort((a, b) => {
        if (sortConfig.direction === 'asc') {
          return a[sortConfig.key] - b[sortConfig.key]
        } else {
          return b[sortConfig.key] - a[sortConfig.key]
        }
      });
    }

  return sorted;
}, [filteredProducts, sortConfig]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });
  };

  const currentItems = useMemo(() => {
    return sortedProducts.slice(0, page * limit)
  }, [sortedProducts, page]);
  return (
    <div className="min-h-screen bg-gray-100">
      <Header cartCount={cartItems.length} onCartClick={() => setIsCartOpen(true)} onSearch={setSearchQuery} />

      <Slidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateQty={updateQty}
        removeItem={removeItem}
      />

      <div className="pt-10 px-10">
        <Stats products={allProducts} />
        <ProductTable
          data={currentItems}
          onAddToCart={addToCart}
          setSortConfig={setSortConfig}
          page={page}
          setPage={setPage}
        />
      </div>
    </div> 
  );
}

export default App;
