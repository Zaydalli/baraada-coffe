import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import FeaturedMenu from './components/FeaturedMenu.jsx';
import Story from './components/Story.jsx';
import Cart from './components/Cart.jsx';
import CheckoutModal from './components/CheckoutModal.jsx';
import { useCart } from './context/CartContext.jsx';

/**
 * Main App Component
 * Acts as the single state orchestrator for Search and Mobile Menu.
 * Cart and Checkout state are now handled by CartContext.
 */
export default function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { state, dispatch } = useCart();

    return (
        <div className="app-container">
            {/* Sticky Navigation Header */}
            <Navbar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
            />

            <main>
                {/* Full-screen Hero Banner */}
                <Hero />

                {/* Interactive Menu with Filters and Search */}
                <FeaturedMenu
                    searchQuery={searchQuery}
                />

                {/* Company Story & Values */}
                <Story />
            </main>

            {/* Footer */}
            <footer id="find-us">
                <div className="footer-content fade-in">
                    <div className="footer-logo">BARAADA</div>
                    <p>30th Street, Banaadir, Mogadishu, Somalia</p>
                    <p>Open Daily: 7:00 AM - 8:00 PM</p>
                    <div className="social-icons">
                        <button className="social-icon-btn" aria-label="Baraada Location" id="social-location-btn">
                            <i className="fas fa-map-marker-alt"></i>
                        </button>
                        <button className="social-icon-btn" aria-label="Email Us" id="social-email-btn">
                            <i className="fas fa-envelope"></i>
                        </button>
                        <button className="social-icon-btn" aria-label="Call Us" id="social-phone-btn">
                            <i className="fas fa-phone"></i>
                        </button>
                    </div>
                </div>
            </footer>

            {/* Slide-out Shopping Cart Drawer */}
            <Cart />

            {/* Checkout Success Modal */}
            <CheckoutModal
                isOpen={state.isModalOpen}
                onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
                receipt={state.receiptData}
            />
        </div>
    );
}
