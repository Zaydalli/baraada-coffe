import React, { useState, useMemo } from 'react';
import PromoBanner from './PromoBanner.jsx';

// Import images as ES module assets (Vite processes and serves these correctly)
import imgColdBrew from '../../images/cold-brew.jpg';
import imgOatLatte from '../../images/oat-latte.jpg';
import imgCroissant from '../../images/croissant-with-honey-dipper-basket-wooden-table-flat-lay.jpg';
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
    },
    {
        id: 5,
        name: 'Classic Espresso',
        category: 'brews',
        price: 3.50,
        img: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=500&q=80',
        description: 'A rich and bold double shot of our house blend espresso with a beautiful golden crema.'
    },
    {
        id: 6,
        name: 'Caramel Cappuccino',
        category: 'lattes',
        price: 5.50,
        img: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=500&q=80',
        description: 'Perfectly balanced espresso and steamed milk foam, drizzled with artisan caramel sauce.'
    },
    {
        id: 7,
        name: 'Somali Spiced Tea',
        category: 'tea',
        price: 3.00,
        img: 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?w=500&q=80',
        description: 'Traditional Somali tea brewed with cardamom, cinnamon, cloves, and a touch of milk.'
    },
    {
        id: 8,
        name: 'Beef Sambusa',
        category: 'snacks',
        price: 2.50,
        img: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80',
        description: 'Crispy, golden pastry triangles filled with savory spiced ground beef and fresh herbs.'
    },
    {
        id: 9,
        name: 'Blueberry Muffin',
        category: 'pastries',
        price: 4.00,
        img: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=500&q=80',
        description: 'Freshly baked muffin bursting with wild blueberries and topped with a buttery streusel crumb.'
    },
    {
        id: 10,
        name: 'Iced Vanilla Mocha',
        category: 'lattes',
        price: 6.50,
        img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&q=80',
        description: 'Rich chocolate, house espresso, and vanilla syrup shaken over ice with a splash of cream.'
    }
];

// Category tabs definition
const CATEGORIES = [
    { id: 'all', label: 'All Menu' },
    { id: 'brews', label: 'Coffees & Brews' },
    { id: 'lattes', label: 'Lattes & Mochas' },
    { id: 'tea', label: 'Teas' },
    { id: 'pastries', label: 'Pastries' },
    { id: 'snacks', label: 'Savory Snacks' }
];

import { useCart } from '../context/CartContext.jsx';

/**
 * FeaturedMenu Component
 * Displays the interactive product grid with category tabs and real-time search filtering.
 */
export default function FeaturedMenu({ searchQuery }) {
    const { dispatch } = useCart();
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
        <section className="py-[4.5rem] px-[5%] max-w-[1080px] mx-auto" id="menu">
            <PromoBanner />
            <div className="flex flex-col gap-4 mb-12 md:flex-row md:justify-between md:items-end">
                <h2 className="font-heading text-[2rem] font-bold text-primary">Featured Menu</h2>

                {/* Category Filter Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar" role="tablist">
                    {CATEGORIES.map(category => (
                        <button
                            key={category.id}
                           className={` py-2 px-5 rounded-full font-body font-medium text-[0.9rem] 
                            cursor-pointer whitespace-nowrap transition-all duration-300 focus:outline-none 
                            ${activeCategory === category.id 
                                ? 'bg-primary border border-primary text-cream shadow-[0_4px_10px_rgba(111,78,55,0.15)]' 
                                : 'border border-primary/20 text-primary hover:border-primary hover:bg-primary/5'
                            }`}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 min-h-[100px] w-full">
                {filteredItems.length > 0 ? (
                    filteredItems.map(item => (
                        <div key={item.id} className="bg-white rounded-2xl p-4 shadow-card flex flex-col justify-between transition-all duration-300 
                            min-w-0 break-words     
                            hover:-translate-y-1 
                            hover:shadow-[0_15px_40px_rgba(111,78,55,0.08)] group fade-in" 
                            id={`menu-item-${item.id}`}>
                            <div className="w-full aspect-square rounded-xl overflow-hidden mb-4 bg-cream">
                                <img src={item.img} alt={item.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-105" />
                            </div>
                            <div className="w-full mb-4">
                                <h3 className="font-heading text-[1.15rem] mb-1 font-semibold text-text-dark">{item.name}</h3>
                                <p className="text-[0.75rem] text-text-muted leading-relaxed mb-2">{item.description}</p>
                            </div>
                            <div className="flex justify-between items-center w-full mt-auto">
                                <span className="text-accent font-semibold text-[1.15rem]">${item.price.toFixed(2)}</span>
                                <button
                                    className="bg-primary text-text-light border-none w-9 h-9 rounded-full flex items-center 
                                    justify-center cursor-pointer text-[0.9rem] transition-all duration-300 hover:bg-accent hover:scale-110"
                                    onClick={() => dispatch({ type: 'ADD_ITEM', payload: item })}
                                    aria-label={`Add ${item.name} to cart`}
                                    id={`add-btn-${item.id}`}
                                >
                                    <i className="fas fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 px-4 text-text-muted fade-in">
                        <i className="fas fa-mug-hot text-5xl mb-4 text-primary-light"></i>
                        <h3 className="font-heading text-xl font-semibold mb-2">No items found</h3>
                        <p>We couldn't find anything matching your filters. Try a different category or search term.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
