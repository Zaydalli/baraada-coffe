import React from 'react';

/**
 * CheckoutModal Component
 * Success confirmation dialog displaying a receipt summary after checkout.
 */
export default function CheckoutModal({ isOpen, onClose, receipt }) {
    if (!receipt) return null;

    return (
        <div
            className={`fixed top-0 left-0 w-full h-full bg-primary-dark/50 backdrop-blur-[5px] z-[20000] flex items-center justify-center transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            onClick={onClose}
            aria-modal="true"
            role="dialog"
        >
            {/* Prevent clicking inside modal from closing it */}
            <div className={`bg-white w-[90%] max-w-[440px] max-h-[90vh] overflow-y-auto rounded-3xl p-6 md:p-10 text-center shadow-modal transition-transform duration-[400ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${isOpen ? 'translate-y-0' : 'translate-y-[30px]'}`} onClick={(e) => e.stopPropagation()}>

                {/* Animated Success Icon */}
                <div
                    className="w-[56px] h-[56px] bg-[#2ecc71]/10 text-[#2ecc71] rounded-full flex items-center justify-center text-[1.8rem] mx-auto mb-6 md:w-[72px] md:h-[72px] md:text-[2.2rem]"
                    style={{ animation: 'scaleCheckmark 0.5s 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) both' }}
                >
                    <i className="fas fa-check"></i>
                </div>

                <h3 className="font-heading text-[1.4rem] md:text-[1.75rem] text-primary-dark mb-3">Order Placed!</h3>
                <p className="text-text-dark text-[0.95rem] mb-6 leading-relaxed">
                    Thank you for your order! Your coffee retreat is being prepared
                    with precision and love by our baristas.
                </p>

                {/* Receipt Summary Box */}
                <div className="bg-cream p-4 rounded-xl text-left mb-7 border border-dashed border-primary/20">
                    <div className="font-semibold mb-3 text-[0.9rem] text-primary-dark">
                        Receipt Summary:
                    </div>

                    {/* Ordered Items */}
                    {receipt.items.map(item => (
                        <div key={item.id} className="flex justify-between mb-2 text-[0.85rem] text-[#555]">
                            <span>{item.name} (x{item.quantity})</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}

                    {/* Tax Line */}
                    <div className="flex justify-between mb-2 text-[0.85rem] text-[#555]">
                        <span>Estimated Tax (8%)</span>
                        <span>${receipt.tax.toFixed(2)}</span>
                    </div>

                    {/* Grand Total */}
                    <div className="flex justify-between mt-3 pt-3 border-t border-primary/10 font-semibold text-primary-dark text-[0.95rem]">
                        <span>Grand Total</span>
                        <span className="text-accent">${receipt.total.toFixed(2)}</span>
                    </div>
                </div>

                <button
                    className="w-full bg-primary text-text-light border-none p-3 rounded-full font-body text-[0.95rem] font-semibold cursor-pointer transition-colors duration-300 hover:bg-primary-dark"
                    onClick={onClose}
                    id="success-modal-close-btn"
                >
                    Done
                </button>
            </div>
        </div>
    );
}
