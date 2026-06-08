import React, { useState, useEffect, useRef } from 'react';

import { useCart } from '../context/CartContext.jsx';

/**
 * Navbar Component
 * Sticky navigation with real-time search, shopping cart badge, and mobile hamburger menu.
 */
export default function Navbar({
    searchQuery,
    setSearchQuery,
    isMobileMenuOpen,
    setIsMobileMenuOpen
}) {
    const { cartCount, dispatch } = useCart();
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
        <header className="flex justify-between items-center py-2 px-[5%] bg-white/95 backdrop-blur-md sticky top-0 z-[1000] border-b border-black/10 shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300">
            <nav className="flex justify-between items-center w-full" aria-label="Main Navigation">
                {/* Brand Logo */}
                <div className="font-heading font-bold text-[1.8rem] tracking-[0.5px] text-primary cursor-pointer transition-colors duration-300 hover:text-accent" id="nav-logo" onClick={(e) => handleScrollTo(e, '#root')}>
                    BARAADA
                </div>

                {/* Desktop Navigation Links */}
                <ul className="hidden md:flex gap-10 list-none">
                    <li>
                        <a href="#menu" onClick={(e) => handleScrollTo(e, '#menu')} className="relative py-1 font-semibold text-[0.95rem] text-primary-dark transition-colors duration-300 hover:text-accent group">
                            Menu
                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    </li>
                    <li>
                        <a href="#story" onClick={(e) => handleScrollTo(e, '#story')} className="relative py-1 font-semibold text-[0.95rem] text-primary-dark transition-colors duration-300 hover:text-accent group">
                            Our Story
                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    </li>
                    <li>
                        <a href="#find-us" onClick={(e) => handleScrollTo(e, '#find-us')} className="relative py-1 font-semibold text-[0.95rem] text-primary-dark transition-colors duration-300 hover:text-accent group">
                            Locations
                            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full"></span>
                        </a>
                    </li>
                </ul>

                {/* Action Icons: Search, Cart, Hamburger */}
                <div className="flex gap-6 items-center text-[1.1rem] text-primary">
                    {/* Expandable Search Input */}
                    <div className="flex items-center relative">
                        <div className={`flex items-center overflow-hidden transition-all duration-300 ${isSearchActive ? 'w-[180px] mr-2' : 'w-0'}`}>
                            <input
                                type="text"
                                ref={searchInputRef}
                                placeholder="Search menu..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                aria-label="Search menu items"
                                className="w-full py-1.5 px-3 border border-primary/20 rounded-full font-body text-[0.85rem] bg-cream outline-none transition-all duration-300 focus:border-accent focus:bg-white focus:shadow-[0_0_8px_rgba(200,117,34,0.15)]"
                            />
                        </div>
                        <button
                            className="bg-transparent border-none text-[1.25rem] text-primary cursor-pointer relative flex items-center justify-center transition-all duration-300 p-1.5 rounded-full hover:text-accent hover:bg-accent/10"
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
                        className="bg-transparent border-none text-[1.25rem] text-primary cursor-pointer relative flex items-center justify-center transition-all duration-300 p-1.5 rounded-full hover:text-accent hover:bg-accent/10"
                        onClick={() => dispatch({ type: 'OPEN_CART' })}
                        aria-label="Open Shopping Bag"
                        id="cart-bag-btn"
                    >
                        <i className="fas fa-shopping-bag"></i>
                        {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-accent text-white text-[0.7rem] font-semibold w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-white animate-pop">{cartCount}</span>}
                    </button>

                    {/* Mobile Hamburger Toggle */}
                    <div
                        className="flex flex-col gap-[5px] cursor-pointer p-1.5 z-[1001] md:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        id="hamburger-menu"
                        aria-label="Toggle Mobile Menu"
                    >
                        <span className={`w-[22px] h-[2px] bg-text-dark transition-all duration-300 ${isMobileMenuOpen ? 'translate-y-[7px] rotate-45' : ''}`}></span>
                        <span className={`w-[22px] h-[2px] bg-text-dark transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`w-[22px] h-[2px] bg-text-dark transition-all duration-300 ${isMobileMenuOpen ? '-translate-y-[7px] -rotate-45' : ''}`}></span>
                    </div>
                </div>
            </nav>

            {/* Full-screen Mobile Navigation Drawer */}
            <div className={`fixed top-[60px] right-0 w-full h-[calc(100vh-60px)] bg-white flex flex-col items-center justify-center gap-8 transition-all duration-300 z-[999] md:hidden ${isMobileMenuOpen ? 'translate-x-0 opacity-100 visible' : 'translate-x-full opacity-0 invisible'}`}>
                <a href="#menu" onClick={(e) => handleScrollTo(e, '#menu')} className="text-2xl font-semibold text-primary-dark transition-colors duration-300 hover:text-accent">Menu</a>
                <a href="#story" onClick={(e) => handleScrollTo(e, '#story')} className="text-2xl font-semibold text-primary-dark transition-colors duration-300 hover:text-accent">Our Story</a>
                <a href="#find-us" onClick={(e) => handleScrollTo(e, '#find-us')} className="text-2xl font-semibold text-primary-dark transition-colors duration-300 hover:text-accent">Locations</a>
            </div>
        </header>
    );
}
