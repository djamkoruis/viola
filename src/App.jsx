// src/App.jsx
import React from 'react';
import { CartProvider } from './context/CartContext';
import Navigation from './components/Navigation';
import ProductCard from './components/ProductCard';
import ContactForm from './components/ContactForm';
import FloatingCart from './components/FloatingCart';
import { bakeryProducts } from './products';
import './App.css';

function App() {
  return (
    <CartProvider>
      <div className="App">
        <Navigation />

        {/* Main content area that scrolls */}
        <div className="main-content">
          {/* Hero Section */}
          <section id="home" className="hero-section">
            <h1>Welcome to Viola Bakery</h1>
            <p>
              At Viola Bakery, we believe in creating beautiful, delicious treats that bring joy to every special moment. Our artisan bakers use only the finest ingredients to craft fresh breads, pastries, and custom cakes that exceed your expectations.
            </p>
            <p>
              Visit us for your daily bread or let us create something special for your next celebration!
            </p>
          </section>

          {/* Products Section */}
          <section id="products" className="products-section">
            <h2>Our Delicious Products</h2>
            <div className="products-grid">
              {bakeryProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact">
            <ContactForm />
          </section>
        </div>

        <FloatingCart />
      </div>
    </CartProvider>
  );
}

export default App;
