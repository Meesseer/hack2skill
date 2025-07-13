import React from 'react'

const GenerateData = (count = 1000) => {
  const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Gadgets'];
  const products = [];

  for (let i = 1; i <= count; i++) {
    const category = categories[i % categories.length];
    products.push({
      id: i,
      name: `Product ${i}`,
      category,
      price: parseFloat((Math.random() * 200 + 10).toFixed(2)),
      stock: Math.floor(Math.random() * 50),
      image: `https://picsum.photos/seed/${i}/60/60`,
    });
  }

  return products;
};


export default GenerateData