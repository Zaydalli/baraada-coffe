import React from 'react';
import { useCart } from '../context/CartContext.jsx';

/**
 * Cart Component
 * Slide-out drawer displaying cart items, quantity controls, and checkout trigger.
 */
export default function Cart() {
    const { state, subtotal, dispatch } = useCart();
    const { cartItems, isCartOpen } = state;

    return (
        <>
            {/* Semi-transparent backdrop - clicking it closes the cart */}
            <div
                className={`fixed top-0 left-0 w-full h-full bg-primary-dark/40 backdrop-blur-sm z-[10000] transition-opacity duration-400 ease-in-out ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={() => dispatch({ type: 'CLOSE_CART' })}
                aria-hidden="true"
            ></div>

            {/* Slide-in Cart Drawer */}
            <div className={`fixed top-0 right-0 w-full max-w-[420px] h-[100vh] bg-white z-[10001] shadow-drawer flex flex-col transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${isCartOpen ? 'translate-x-0 opacity-100 visible' : 'translate-x-full opacity-0 invisible'}`} role="dialog" aria-modal="true" aria-label="Shopping Bag">

                {/* Cart Header */}
                <div className="p-6 border-b border-primary/10 flex justify-between items-center">
                    <h2 className="font-heading text-[1.5rem] md:text-2xl text-primary-dark flex items-center gap-3">
                        <i className="fas fa-shopping-bag"></i>
                        Your Bag
                    </h2>
                    <button
                        className="bg-transparent border-none text-[1.5rem] md:text-2xl text-primary cursor-pointer w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-primary/10 hover:text-accent"
                        onClick={() => dispatch({ type: 'CLOSE_CART' })}
                        aria-label="Close cart"
                        id="close-cart-btn"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                {/* Cart Item List */}
                <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
                    {cartItems.length > 0 ? (
                        cartItems.map(item => (
                            <div key={item.id} className="flex gap-3 md:gap-4 items-center pb-4 border-b border-primary/5" id={`cart-item-${item.id}`}>
                                <div className="w-[70px] h-[70px] rounded-lg overflow-hidden shrink-0 bg-cream">
                                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-heading text-[1.05rem] font-semibold text-text-dark mb-1">{item.name}</h4>
                                    <div className="text-accent font-semibold text-[0.95rem] mb-1.5">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                    <div className="flex justify-between items-center">
                                        {/* Quantity Adjuster */}
                                        <div className="flex items-center border border-primary/20 rounded-[15px] overflow-hidden bg-cream">
                                            <button
                                                className="bg-transparent border-none w-7 h-7 text-[0.8rem] text-primary-dark cursor-pointer transition-colors duration-300 hover:bg-primary/10"
                                                onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity - 1 } })}
                                                aria-label="Decrease quantity"
                                                id={`dec-qty-${item.id}`}
                                            >
                                                <i className="fas fa-minus"></i>
                                            </button>
                                            <span className="w-6 text-center text-[0.9rem] font-semibold">{item.quantity}</span>
                                            <button
                                                className="bg-transparent border-none w-7 h-7 text-[0.8rem] text-primary-dark cursor-pointer transition-colors duration-300 hover:bg-primary/10"
                                                onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity + 1 } })}
                                                aria-label="Increase quantity"
                                                id={`inc-qty-${item.id}`}
                                            >
                                                <i className="fas fa-plus"></i>
                                            </button>
                                        </div>

                                        {/* Remove Item */}
                                        <button
                                            className="bg-transparent border-none text-text-muted cursor-pointer transition-colors duration-300 text-[0.95rem] hover:text-[#c0392b]"
                                            onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                                            aria-label={`Remove ${item.name} from cart`}
                                            id={`remove-item-${item.id}`}
                                        >
                                            <i className="far fa-trash-alt"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        /* Empty Cart State */
                        <div className="text-center m-auto text-text-muted">
                            <i className="fas fa-shopping-basket text-[4rem] mb-4 text-primary/15"></i>
                            <p className="text-[1rem]">Your shopping bag is empty.</p>
                            <span className="text-sm block mt-2 text-[#aaa]">
                                Add some freshly brewed retreats!
                            </span>
                        </div>
                    )}
                </div>

                {/* Cart Footer with Subtotal and Checkout */}
                {cartItems.length > 0 && (
                    <div className="p-6 border-t border-primary/10 bg-cream">
                        <div className="flex justify-between text-[1.1rem] font-semibold text-primary-dark mb-5">
                            <span>Subtotal</span>
                            <span className="font-heading text-[1.3rem] text-accent">${subtotal.toFixed(2)}</span>
                        </div>
                        <button
                            className="w-full bg-cream text-primary border border-primary/20 p-3 rounded-full font-body text-[0.95rem] font-semibold cursor-pointer transition-all duration-300 mb-3 flex items-center justify-center gap-2 hover:bg-primary/5 hover:-translate-y-[1px]"
                            onClick={() => dispatch({ type: 'CLOSE_CART' })}
                            id="continue-shopping-btn"
                        >
                            <i className="fas fa-plus"></i>
                            Si aad u dalbato waxyaabo kale halkan taabo
                        </button>
                        <button
                            className="w-full bg-accent text-text-light border-none p-4 rounded-full font-body text-[1rem] font-semibold cursor-pointer transition-all duration-300 shadow-[0_4px_15px_rgba(200,117,34,0.2)] flex items-center justify-center gap-2 hover:bg-accent-hover hover:-translate-y-[1px] hover:shadow-[0_6px_20px_rgba(200,117,34,0.3)]"
                            onClick={() => {
                                // Format WhatsApp message
                                let message = "☕ *New Order from Baraada Coffee* ☕\n\n";
                                cartItems.forEach(item => {
                                    message += `${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}\n`;
                                });
                                
                                const tax = subtotal * 0.08;
                                const total = subtotal + tax;
                                
                                message += `\n*Subtotal:* $${subtotal.toFixed(2)}`;
                                message += `\n*Tax (8%):* $${tax.toFixed(2)}`;
                                message += `\n*Total:* $${total.toFixed(2)}`;
                                message += `\n\nFadlan iigu soo diyaari! (Please prepare this for me)`;
                            
                                const encodedMessage = encodeURIComponent(message);
                                const phoneNumber = "252687683651"; // Bedel lambarkan / Replace with your real number
                            
                                window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
                                dispatch({ type: 'CHECKOUT' });
                            }}
                            id="checkout-submit-btn"
                        >
                            <i className="fab fa-whatsapp text-lg"></i>
                            Order via WhatsApp
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
