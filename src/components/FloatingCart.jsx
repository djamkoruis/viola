// src/components/FloatingCart.jsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './FloatingCart.css';

const FloatingCart = () => {
    const { cart, getTotalItems, getTotalPrice, removeFromCart, updateQuantity } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const totalItems = getTotalItems();

    const toggleCart = () => {
        setIsOpen(!isOpen);
    };

    if (totalItems === 0) {
        return null; // Don't show if cart is empty
    }

    return (
        <>
            {/* Floating Cart Button */}
            <div className="floating-cart-button" onClick={toggleCart}>
                <span className="cart-icon">🛒</span>
                <span className="cart-count">{totalItems}</span>
            </div>

            {/* Cart Dropdown */}
            {isOpen && (
                <>
                    <div className="cart-overlay" onClick={toggleCart}></div>
                    <div className="floating-cart-dropdown">
                        <div className="cart-header">
                            <h3>Your Cart</h3>
                            <button className="close-cart" onClick={toggleCart}>×</button>
                        </div>

                        <div className="cart-items">
                            {cart.items.map(item => (
                                <div key={item.id} className="cart-item">
                                    <img src={item.image} alt={item.name} className="cart-item-image" />
                                    <div className="cart-item-details">
                                        <h4>{item.name}</h4>
                                        <p className="cart-item-price">{item.price}</p>
                                        <div className="quantity-controls">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="quantity-btn"
                                            >
                                                -
                                            </button>
                                            <span className="quantity">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="quantity-btn"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="remove-item"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="cart-footer">
                            <div className="cart-total">
                                <strong>Total: ${getTotalPrice()}</strong>
                            </div>
                            <button className="checkout-btn">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default FloatingCart;
