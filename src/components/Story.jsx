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
        <section className="story-section" id="story">
            <h2 className="section-title fade-in">OUR STORY</h2>
            <p className="story-text fade-in">
                Baraada is more than a cafe; it's a sanctuary. We believe that every cup represents a quiet
                moment of warmth and inspiration. By working hand-in-hand with specialty coffee farmers,
                we roast and deliver exceptional, ethical coffee in a beautiful space.
            </p>

            <div className="story-cards">
                {/* Sustainable Sourcing Card */}
                <div className="card fade-in" id="story-card-sourcing">
                    <img src={imgSourcing} alt="Sustainable Sourcing" loading="lazy" />
                    <div className="card-content">
                        <h3>Sustainable Sourcing</h3>
                        <p>We operate on direct-trade models, working with small-scale coffee farming communities
                           to source the world's most pristine, ethically harvested beans.</p>
                    </div>
                </div>

                {/* Crafted with Care Card */}
                <div className="card fade-in" id="story-card-crafting">
                    <img src={imgBarista} alt="Crafted with Care" loading="lazy" />
                    <div className="card-content">
                        <h3>Crafted with Care</h3>
                        <p>Every single pour, extraction, and roast profile is monitored carefully by coffee
                           masters to release the rich notes locked inside each bean.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
