import React, { useEffect, useState } from 'react';
import './app.css'; // import your CSS file

export default function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    async function getProducts() {
      try {
        const result = await fetch("https://dummyjson.com/products");
        const arrProducts = await result.json();
        
        if (Array.isArray(arrProducts.products)) {
          setProducts(arrProducts.products);
          
          const categoryMap = {};
          arrProducts.products.forEach(product => {
            categoryMap[product.category] = true;
          });
          setCategories(Object.keys(categoryMap));
        } else {
          console.error("המוצרים אינם מערך:", arrProducts.products);
        }
      } catch (error) {
        console.error("שגיאה בקבלת המוצרים:", error);
      }
    }
    getProducts();
  }, []);

 
  const filteredProducts = selectedCategory 
    ? products.filter(product => product.category === selectedCategory) 
    : products;

  return (
    <div>
      <label htmlFor="category-select">בחר קטגוריה:</label>
      <select id="category-select" value={selectedCategory} onChange={(event)=>setSelectedCategory(event.target.value)}>
        <option value="">--all --</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>

      <div className="products-container">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <h3>{product.title}</h3>
            <p>price: {product.price}₪ </p>
          </div>
        ))}
      </div>
    </div>
  );
}