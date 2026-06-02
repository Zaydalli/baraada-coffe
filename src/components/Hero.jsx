import React from 'react';

/**
 * Hero Component
 * Full-height banner with dark overlay, headline, tagline, and smooth-scroll CTA button.
 */
export default function Hero() {
    const handleScrollToMenu = (e) => {
        e.preventDefault();
        const menuSection = document.querySelector('#menu');
        if (menuSection) {
            menuSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section className="hero" id="home">
            <div className="hero-content fade-in">
                <h1>BARAADA</h1>
                <p>Your daily retreat in every sip. Crafted with precision, poured with passion.</p>
                <button onClick={handleScrollToMenu} className="btn-primary" id="hero-order-now-btn">
                    Order Now
                </button>
            </div>
        </section>
    );
}
