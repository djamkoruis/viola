// src/components/Navigation.jsx
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useDeviceDetection } from '../hooks/useDeviceDetection';
import './Navigation.css';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { getTotalItems } = useCart();
  const { isMobile, isTablet, isDesktop, screenWidth } = useDeviceDetection();
  const cartItemCount = getTotalItems();

  // Force close menu when switching to desktop
  useEffect(() => {
    if (isDesktop && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isDesktop, isMenuOpen]);

  const toggleMenu = () => {
    if (isAnimating) return; // Prevent spam clicking

    setIsAnimating(true);
    setIsMenuOpen(!isMenuOpen);

    // Reset animation state
    setTimeout(() => setIsAnimating(false), 300);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = isMobile ? 70 : 0; // Account for mobile header
      const elementPosition = element.offsetTop - offset;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }

    // Close menu on mobile after clicking
    if (isMobile || isTablet) {
      setIsMenuOpen(false);
    }
  };

  // Prevent body scroll when menu is open on mobile
  useEffect(() => {
    if (isMobile && isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobile, isMenuOpen]);

  return (
    <>
      {/* Smart Mobile Header - Only on mobile/tablet */}
      {(isMobile || isTablet) && (
        <header className="mobile-header">
          <div className="mobile-logo">
            <h1>Viola</h1>
            <span className="mobile-subtitle">Bakery</span>
          </div>

          {/* Enhanced Hamburger Menu */}
          <div
            className={`hamburger-menu ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <div className="hamburger-box">
              <div className="hamburger-inner"></div>
            </div>
          </div>

          {/* Cart badge in mobile header */}
          {cartItemCount > 0 && (
            <div className="mobile-cart-badge">
              <span className="mobile-cart-icon">🛒</span>
              <span className="mobile-cart-count">{cartItemCount}</span>
            </div>
          )}
        </header>
      )}

      {/* Menu Overlay with blur effect */}
      {isMenuOpen && (isMobile || isTablet) && (
        <div
          className="menu-overlay"
          onClick={toggleMenu}
          style={{ backdropFilter: 'blur(5px)' }}
        />
      )}

      {/* Smart Sidebar Navigation */}
      <nav className={`left-navigation ${isMenuOpen ? 'nav-open' : ''} ${isDesktop ? 'desktop-mode' : 'mobile-mode'}`}>
        <div className="nav-header">
          <div className="nav-logo">
            <h1>Viola</h1>
            <span>Artisan Bakery</span>
          </div>

          {/* Device info for debugging (remove in production) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="device-debug">
              <small>
                {isDesktop && '🖥️ Desktop'}
                {isTablet && '📱 Tablet'}
                {isMobile && '📱 Mobile'}
                ({screenWidth}px)
              </small>
            </div>
          )}
        </div>

        <div className="nav-menu">
          <button className="nav-link" onClick={() => scrollToSection('home')}>
            <span className="nav-icon">🏠</span>
            <span className="nav-text">Home</span>
            <span className="nav-arrow">→</span>
          </button>

          <button className="nav-link" onClick={() => scrollToSection('products')}>
            <span className="nav-icon">🧁</span>
            <span className="nav-text">Products</span>
            <span className="nav-arrow">→</span>
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
            <span className="nav-arrow">→</span>
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

          {/* Social media links */}
          <div className="social-links">
            <button className="social-btn">📧</button>
            <button className="social-btn">📘</button>
            <button className="social-btn">📷</button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
