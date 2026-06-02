import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import FeaturedMenu from './components/FeaturedMenu.jsx';
import Story from './components/Story.jsx';
import Cart from './components/Cart.jsx';
import CheckoutModal from './components/CheckoutModal.jsx';

/**
 * Main App Component
 * Acts as the single state orchestrator for Cart Items, Search, Mobile Menu, and Checkout.
 */
export default function App() {
    const [cart, setCart] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [receiptData, setReceiptData] = useState(null);

    // Compute total item count for cart badge display
    const cartCount = useMemo(() => {
        return cart.reduce((acc, curr) => acc + curr.quantity, 0);
    }, [cart]);

    // Add an item to the cart (or increment quantity if already exists)
    const handleAddToCart = (product) => {
        setCart(prevCart => {
            const existingProduct = prevCart.find(item => item.id === product.id);
            if (existingProduct) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
        // Auto-open cart drawer for immediate feedback
        setIsCartOpen(true);
    };

    // Update item quantity (remove if quantity reaches 0)
    const handleUpdateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            handleRemoveItem(productId);
            return;
        }
        setCart(prevCart =>
            prevCart.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    // Remove a specific item from cart
    const handleRemoveItem = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    // Trigger simulated checkout: save receipt, clear cart, show modal
    const handleCheckout = () => {
        const subtotal = cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
        const tax = subtotal * 0.08;
        const total = subtotal + tax;

        setReceiptData({ items: [...cart], tax, total });
        setIsCartOpen(false);
        setCart([]);
        setIsModalOpen(true);
    };

    return (
        <div className="app-container">
            {/* Sticky Navigation Header */}
            <Navbar
                cartCount={cartCount}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onOpenCart={() => setIsCartOpen(true)}
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
            />

            <main>
                {/* Full-screen Hero Banner */}
                <Hero />

                {/* Interactive Menu with Filters and Search */}
                <FeaturedMenu
                    onAddToCart={handleAddToCart}
                    searchQuery={searchQuery}
                />

                {/* Company Story & Values */}
                <Story />
            </main>

            {/* Footer */}
            <footer id="find-us">
                <div className="footer-content fade-in">
                    <div className="footer-logo">BARAADA</div>
                    <p>30th Street, Banaadir District</p>
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
            <Cart
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                cartItems={cart}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onCheckout={handleCheckout}
            />

            {/* Checkout Success Modal */}
            <CheckoutModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                receipt={receiptData}
            />
        </div>
    );
}
