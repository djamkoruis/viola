// src/components/Navigation.jsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext'; // Add this import
import './Navigation.css';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems } = useCart(); // Get cart functionality
  const cartItemCount = getTotalItems();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="mobile-header">
        <div className="mobile-logo">
          <h1>Viola</h1>
        </div>
        <div className="nav-hamburger" onClick={toggleMenu}>
          <div className={`bar ${isMenuOpen ? 'bar-active' : ''}`}></div>
          <div className={`bar ${isMenuOpen ? 'bar-active' : ''}`}></div>
          <div className={`bar ${isMenuOpen ? 'bar-active' : ''}`}></div>
        </div>
      </header>

      {/* Menu Overlay */}
      {isMenuOpen && (
        <div className="menu-overlay" onClick={toggleMenu}></div>
      )}

      {/* Left Sidebar Navigation */}
      <nav className={`left-navigation ${isMenuOpen ? 'nav-open' : ''}`}>
        <div className="nav-header">
          <div className="nav-logo">
            <h1>Viola</h1>
            <span>Bakery</span>
          </div>
        </div>

        <div className="nav-menu">
          <button className="nav-link" onClick={() => scrollToSection('home')}>
            <span className="nav-icon">🏠</span>
            <span className="nav-text">Home</span>
          </button>

          <button className="nav-link" onClick={() => scrollToSection('products')}>
            <span className="nav-icon">🧁</span>
            <span className="nav-text">Products</span>
          </button>

          <button className="nav-link cart-link" onClick={() => scrollToSection('products')}>
            <span className="nav-icon">🛒</span>
            <span className="nav-text">Cart</span>
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
          </button>

          <button className="nav-link" onClick={() => scrollToSection('contact')}>
            <span className="nav-icon">📞</span>
            <span className="nav-text">Contact</span>
          </button>

          <button className="nav-phone" onClick={() => window.location.href = 'tel:+1234567890'}>
            <span className="nav-icon">📱</span>
            <span className="nav-text">Call to Order</span>
          </button>
        </div>

        <div className="nav-footer">
          <div className="business-hours">
            <h4>Business Hours</h4>
            <p>Mon-Fri: 6:00 AM - 7:00 PM</p>
            <p>Sat-Sun: 7:00 AM - 6:00 PM</p>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
