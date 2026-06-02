import React, { useState, useEffect, useRef } from 'react';

/**
 * Navbar Component
 * Sticky navigation with real-time search, shopping cart badge, and mobile hamburger menu.
 */
export default function Navbar({
    cartCount,
    searchQuery,
    setSearchQuery,
    onOpenCart,
    isMobileMenuOpen,
    setIsMobileMenuOpen
}) {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const searchInputRef = useRef(null);

    // Auto-focus search input when toggled open
    useEffect(() => {
        if (isSearchActive && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchActive]);

    // Smooth scroll to section anchor
    const handleScrollTo = (e, id) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        const target = document.querySelector(id);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <header>
            <nav className="navbar" aria-label="Main Navigation">
                {/* Brand Logo */}
                <div className="logo" id="nav-logo" onClick={(e) => handleScrollTo(e, '#root')}>
                    BARAADA
                </div>

                {/* Desktop Navigation Links */}
                <ul className="nav-links">
                    <li><a href="#menu" onClick={(e) => handleScrollTo(e, '#menu')}>Menu</a></li>
                    <li><a href="#story" onClick={(e) => handleScrollTo(e, '#story')}>Our Story</a></li>
                    <li><a href="#find-us" onClick={(e) => handleScrollTo(e, '#find-us')}>Locations</a></li>
                </ul>

                {/* Action Icons: Search, Cart, Hamburger */}
                <div className="header-actions">
                    {/* Expandable Search Input */}
                    <div className="nav-search-container">
                        <div className={`search-input-wrapper ${isSearchActive ? 'active' : ''}`}>
                            <input
                                type="text"
                                ref={searchInputRef}
                                placeholder="Search menu..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                aria-label="Search menu items"
                            />
                        </div>
                        <button
                            className="action-icon-btn"
                            onClick={() => {
                                setIsSearchActive(!isSearchActive);
                                if (isSearchActive) setSearchQuery('');
                            }}
                            aria-label="Toggle Search"
                            id="search-btn"
                        >
                            <i className={`fas ${isSearchActive ? 'fa-times' : 'fa-search'}`}></i>
                        </button>
                    </div>

                    {/* Shopping Bag with Badge Count */}
                    <button
                        className="action-icon-btn"
                        onClick={onOpenCart}
                        aria-label="Open Shopping Bag"
                        id="cart-bag-btn"
                    >
                        <i className="fas fa-shopping-bag"></i>
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </button>

                    {/* Mobile Hamburger Toggle */}
                    <div
                        className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        id="hamburger-menu"
                        aria-label="Toggle Mobile Menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </nav>

            {/* Full-screen Mobile Navigation Drawer */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                <a href="#menu" onClick={(e) => handleScrollTo(e, '#menu')}>Menu</a>
                <a href="#story" onClick={(e) => handleScrollTo(e, '#story')}>Our Story</a>
                <a href="#find-us" onClick={(e) => handleScrollTo(e, '#find-us')}>Locations</a>
            </div>
        </header>
    );
}
