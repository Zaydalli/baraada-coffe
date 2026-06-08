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
        <section className="h-[90vh] bg-[linear-gradient(rgba(0,0,0,0.45),rgba(0,0,0,0.45)),url('/images/hero-bg.jpg')] bg-cover bg-center flex items-center justify-center text-center text-text-light px-[5%]" id="home">
            <div className="fade-in max-w-[600px] mx-auto">
                <h1 className="font-heading text-[2.5rem] md:text-[4.2rem] font-bold mb-4 tracking-[2px]">BARAADA</h1>
                <p className="text-xl mb-10 font-light opacity-95">Your daily retreat in every sip. Crafted with precision, poured with passion.</p>
                <button onClick={handleScrollToMenu} className="bg-accent text-text-light py-4 px-12 rounded-full font-semibold tracking-[0.5px] inline-block shadow-[0_4px_15px_rgba(200,117,34,0.3)] cursor-pointer font-body transition-all duration-300 hover:bg-accent-hover hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(200,117,34,0.4)] border-none" id="hero-order-now-btn">
                    Order Now
                </button>
            </div>
        </section>
    );
}
