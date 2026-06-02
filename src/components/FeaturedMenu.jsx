import React, { useState, useMemo } from 'react';

// Import images as ES module assets (Vite processes and serves these correctly)
import imgColdBrew from '../../images/cold-brew.jpg';
import imgOatLatte from '../../images/oat-latte.jpg';
import imgCroissant from '../../images/croissant.jpg';
import imgMatcha from '../../images/matcha.jpg';

// Curated premium menu items
const MENU_ITEMS = [
    {
        id: 1,
        name: 'Signature Cold Brew',
        category: 'brews',
        price: 5.50,
        img: imgColdBrew,
        description: 'Slow-steeped for 20 hours in cold spring water, offering an incredibly smooth, bold flavor with zero bitterness.'
    },
    {
        id: 2,
        name: 'Oat Milk Latte',
        category: 'lattes',
        price: 6.00,
        img: imgOatLatte,
        description: 'Double shot of house espresso matched with creamy steamed organic oat milk and a light hint of organic cane sugar syrup.'
    },
    {
        id: 3,
        name: 'Almond Croissant',
        category: 'pastries',
        price: 4.50,
        img: imgCroissant,
        description: 'Flaky, double-baked French pastry filled with sweet almond frangipane cream and topped with toasted almonds.'
    },
    {
        id: 4,
        name: 'Matcha Bliss',
        category: 'brews',
        price: 6.50,
        img: imgMatcha,
        description: 'Ceremonial-grade Japanese Uji Matcha hand-whisked and balanced with steamed organic whole milk and honey.'
    }
];

// Category tabs definition
const CATEGORIES = [
    { id: 'all', label: 'All Menu' },
    { id: 'brews', label: 'Cold Brews' },
    { id: 'lattes', label: 'Lattes' },
    { id: 'pastries', label: 'Artisan Pastries' }
];

/**
 * FeaturedMenu Component
 * Displays the interactive product grid with category tabs and real-time search filtering.
 */
export default function FeaturedMenu({ onAddToCart, searchQuery }) {
    const [activeCategory, setActiveCategory] = useState('all');

    // Filter items by active category tab AND search query simultaneously
    const filteredItems = useMemo(() => {
        return MENU_ITEMS.filter(item => {
            const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
            const matchesSearch =
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    return (
        <section className="menu-section" id="menu">
            <div className="section-header">
                <h2>Featured Menu</h2>

                {/* Category Filter Tabs */}
                <div className="category-tabs" role="tablist">
                    {CATEGORIES.map(category => (
                        <button
                            key={category.id}
                            className={`tab-btn ${activeCategory === category.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category.id)}
                            role="tab"
                            aria-selected={activeCategory === category.id}
                            id={`tab-btn-${category.id}`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
            <div className="menu-grid">
                {filteredItems.length > 0 ? (
                    filteredItems.map(item => (
                        <div key={item.id} className="menu-item fade-in" id={`menu-item-${item.id}`}>
                            <div className="menu-img">
                                <img src={item.img} alt={item.name} loading="lazy" />
                            </div>
                            <div className="menu-item-info">
                                <h3>{item.name}</h3>
                                <p className="menu-item-desc">{item.description}</p>
                            </div>
                            <div className="menu-item-footer">
                                <span className="price">${item.price.toFixed(2)}</span>
                                <button
                                    className="btn-add-cart"
                                    onClick={() => onAddToCart(item)}
                                    aria-label={`Add ${item.name} to cart`}
                                    id={`add-btn-${item.id}`}
                                >
                                    <i className="fas fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-menu-state fade-in">
                        <i className="fas fa-mug-hot"></i>
                        <h3>No items found</h3>
                        <p>We couldn't find anything matching your filters. Try a different category or search term.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
