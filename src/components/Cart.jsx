import React from 'react';

/**
 * Cart Component
 * Slide-out drawer displaying cart items, quantity controls, and checkout trigger.
 */
export default function Cart({
    isOpen,
    onClose,
    cartItems,
    onUpdateQuantity,
    onRemoveItem,
    onCheckout
}) {
    const subtotal = cartItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);

    return (
        <>
            {/* Semi-transparent backdrop - clicking it closes the cart */}
            <div
                className={`cart-drawer-overlay ${isOpen ? 'active' : ''}`}
                onClick={onClose}
                aria-hidden="true"
            ></div>

            {/* Slide-in Cart Drawer */}
            <div className={`cart-drawer ${isOpen ? 'active' : ''}`} role="dialog" aria-modal="true" aria-label="Shopping Bag">

                {/* Cart Header */}
                <div className="cart-header">
                    <h2>
                        <i className="fas fa-shopping-bag"></i>
                        Your Bag
                    </h2>
                    <button
                        className="btn-close-cart"
                        onClick={onClose}
                        aria-label="Close cart"
                        id="close-cart-btn"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                {/* Cart Item List */}
                <div className="cart-body">
                    {cartItems.length > 0 ? (
                        cartItems.map(item => (
                            <div key={item.id} className="cart-item-row" id={`cart-item-${item.id}`}>
                                <div className="cart-item-img">
                                    <img src={item.img} alt={item.name} />
                                </div>
                                <div className="cart-item-details">
                                    <h4>{item.name}</h4>
                                    <div className="cart-item-price">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                    <div className="cart-item-controls">
                                        {/* Quantity Adjuster */}
                                        <div className="quantity-adjuster">
                                            <button
                                                className="qty-btn"
                                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                                aria-label="Decrease quantity"
                                                id={`dec-qty-${item.id}`}
                                            >
                                                <i className="fas fa-minus"></i>
                                            </button>
                                            <span className="qty-num">{item.quantity}</span>
                                            <button
                                                className="qty-btn"
                                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                                aria-label="Increase quantity"
                                                id={`inc-qty-${item.id}`}
                                            >
                                                <i className="fas fa-plus"></i>
                                            </button>
                                        </div>

                                        {/* Remove Item */}
                                        <button
                                            className="btn-remove-item"
                                            onClick={() => onRemoveItem(item.id)}
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
                        <div className="cart-empty-message">
                            <i className="fas fa-shopping-basket"></i>
                            <p>Your shopping bag is empty.</p>
                            <span style={{ fontSize: '0.85rem', display: 'block', marginTop: '0.5rem', color: '#aaa' }}>
                                Add some freshly brewed retreats!
                            </span>
                        </div>
                    )}
                </div>

                {/* Cart Footer with Subtotal and Checkout */}
                {cartItems.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-summary-row">
                            <span>Subtotal</span>
                            <span className="cart-total-price">${subtotal.toFixed(2)}</span>
                        </div>
                        <button
                            className="btn-checkout"
                            onClick={onCheckout}
                            id="checkout-submit-btn"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
