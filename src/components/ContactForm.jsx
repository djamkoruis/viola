// src/components/ContactForm.jsx
import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        orderDetails: '',
        pickupDate: '',
        specialRequests: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // For now, we'll just show an alert - later we'll add email functionality
        alert(`Thank you ${formData.name}! Your Viola Bakery order request has been received. We'll contact you at ${formData.phone} to confirm details and pricing.`);
        console.log('Order submitted:', formData);
    };

    return (
        <div className="contact-form-container">
            <h2>🌸 Place Your Custom Order</h2>
            <p>Tell us what delicious treats you'd like from Viola Bakery!</p>

            <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                    <label htmlFor="name">Your Name *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number *</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="(555) 123-4567"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="orderDetails">What would you like to order? *</label>
                    <textarea
                        id="orderDetails"
                        name="orderDetails"
                        value={formData.orderDetails}
                        onChange={handleChange}
                        required
                        rows="4"
                        placeholder="Describe your order: croissants, custom cake, bread, quantities, etc."
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="pickupDate">Preferred Pickup Date</label>
                    <input
                        type="date"
                        id="pickupDate"
                        name="pickupDate"
                        value={formData.pickupDate}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="specialRequests">Special Requests or Dietary Notes</label>
                    <textarea
                        id="specialRequests"
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Allergies, custom decorations, special occasions, etc."
                    />
                </div>

                <button type="submit" className="submit-order-btn">
                    Submit Order Request 🥐
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
