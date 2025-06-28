// src/components/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Import cart functionality
import './Sidebar.css';

const Sidebar = () => {
    const location = useLocation();
    const { getTotalItems } = useCart(); // Get cart item count
    const cartItemCount = getTotalItems();

    return (
        <nav className="sidebar">
            <div className="sidebar-brand">
                <h2>Viola</h2>
                <p>Bakery</p>
            </div>

            <ul className="sidebar-menu">
                <li>
                    <Link
                        to="/"
                        className={location.pathname === '/' ? 'active' : ''}
                    >
                        🏠 Home
                    </Link>
                </li>
                <li>
                    <Link
                        to="/products"
                        className={location.pathname === '/products' ? 'active' : ''}
                    >
                        🧁 Products
                    </Link>
                </li>
                <li className="cart-item">
                    <Link to="/cart" className="cart-link">
                        🛒 Cart
                        {cartItemCount > 0 && (
                            <span className="cart-badge">{cartItemCount}</span>
                        )}
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;
