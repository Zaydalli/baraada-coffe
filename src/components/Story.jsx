import React from 'react';

// Import images as ES module assets (Vite processes and serves these correctly)
import imgSourcing from '../../images/sourcing.jpg';
import imgBarista from '../../images/barista.jpg';

/**
 * Story Component
 * Displays Baraada Coffee's origin story and values through elegant image cards.
 */
export default function Story() {
    return (
        <section className="py-[4.5rem] pb-[3.15rem] px-[5%] bg-cream max-w-[1080px] mx-auto" id="story">
            <h2 className="font-heading text-[2rem] font-bold mb-6 text-primary fade-in">OUR STORY</h2>
            <p className="mb-16 max-w-[700px] text-[#4a4a4a] text-[1.1rem] leading-[1.8] fade-in">
                Baraada is more than a cafe; it's a sanctuary. We believe that every cup represents a quiet
                moment of warmth and inspiration. By working hand-in-hand with specialty coffee farmers,
                we roast and deliver exceptional, ethical coffee in a beautiful space.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
                {/* Sustainable Sourcing Card */}
                <div className="bg-transparent rounded-xl overflow-hidden transition-all duration-300 group fade-in" id="story-card-sourcing">
                    <img src={imgSourcing} alt="Sustainable Sourcing" loading="lazy" className="w-full h-[200px] object-cover rounded-xl mb-4 transition-transform duration-300 group-hover:scale-[1.02]" />
                    <div>
                        <h3 className="text-[1.25rem] mb-2 font-heading text-primary-dark font-semibold">Sustainable Sourcing</h3>
                        <p className="text-[0.95rem] text-[#666]">We operate on direct-trade models, working with small-scale coffee farming communities
                           to source the world's most pristine, ethically harvested beans.</p>
                    </div>
                </div>

                {/* Crafted with Care Card */}
                <div className="bg-transparent rounded-xl overflow-hidden transition-all duration-300 group fade-in" id="story-card-crafting">
                    <img src={imgBarista} alt="Crafted with Care" loading="lazy" className="w-full h-[200px] object-cover rounded-xl mb-4 transition-transform duration-300 group-hover:scale-[1.02]" />
                    <div>
                        <h3 className="text-[1.25rem] mb-2 font-heading text-primary-dark font-semibold">Crafted with Care</h3>
                        <p className="text-[0.95rem] text-[#666]">Every single pour, extraction, and roast profile is monitored carefully by coffee
                           masters to release the rich notes locked inside each bean.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
