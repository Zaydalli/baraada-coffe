import React, { useState } from 'react';

export default function PromoBanner() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="bg-accent/10 border border-accent/20 text-accent-dark text-[0.75rem] md:text-[0.85rem] font-body py-1.5 px-3 mb-6 mx-auto w-fit rounded-full flex items-center justify-center relative z-10 transition-all fade-in">
            <div className="text-center font-medium tracking-wide flex items-center gap-2 pr-6">
                <i className="fas fa-bullhorn text-accent animate-pulse"></i>
                <span>Happy Hour: Jimcaha 10% Qiimo dhimis ah! Free Delivery agagaarka Banaadir.</span>
            </div>
            <button 
                onClick={() => setIsVisible(false)}
                className="bg-transparent border-none text-primary/40 hover:text-primary transition-colors cursor-pointer absolute right-2 p-1 flex items-center justify-center text-sm"
                aria-label="Close Promo Banner"
            >
                <i className="fas fa-times"></i>
            </button>
        </div>
    );
}
