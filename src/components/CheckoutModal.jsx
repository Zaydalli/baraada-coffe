import React from 'react';

/**
 * CheckoutModal Component
 * Success confirmation dialog displaying a receipt summary after checkout.
 */
export default function CheckoutModal({ isOpen, onClose, receipt }) {
    if (!receipt) return null;

    return (
        <div
            className={`modal-overlay ${isOpen ? 'active' : ''}`}
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            {/* Prevent clicking inside modal from closing it */}
            <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>

                {/* Animated Success Icon */}
                <div className="modal-success-icon">
                    <i className="fas fa-check"></i>
                </div>

                <h3>Order Placed!</h3>
                <p>
                    Thank you for your order! Your coffee retreat is being prepared
                    with precision and love by our baristas.
                </p>

                {/* Receipt Summary Box */}
                <div className="order-receipt-box">
                    <div style={{ fontWeight: '600', marginBottom: '0.75rem', fontSize: '0.9rem', color: '#3E2723' }}>
                        Receipt Summary:
                    </div>

                    {/* Ordered Items */}
                    {receipt.items.map(item => (
                        <div key={item.id} className="receipt-row">
                            <span>{item.name} (x{item.quantity})</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}

                    {/* Tax Line */}
                    <div className="receipt-row">
                        <span>Estimated Tax (8%)</span>
                        <span>${receipt.tax.toFixed(2)}</span>
                    </div>

                    {/* Grand Total */}
                    <div className="receipt-row total">
                        <span>Grand Total</span>
                        <span className="receipt-total-val">${receipt.total.toFixed(2)}</span>
                    </div>
                </div>

                <button
                    className="btn-close-modal"
                    onClick={onClose}
                    id="success-modal-close-btn"
                >
                    Done
                </button>
            </div>
        </div>
    );
}
