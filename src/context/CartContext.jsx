import React, { createContext, useReducer, useContext } from 'react';

const CartContext = createContext();

const initialState = {
    cartItems: [],
    isCartOpen: false,
    isModalOpen: false,
    receiptData: null,
};

function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItem = state.cartItems.find(item => item.id === action.payload.id);
            if (existingItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(item =>
                        item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
                    ),
                    isCartOpen: true
                };
            }
            return {
                ...state,
                cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
                isCartOpen: true
            };
        }
        case 'UPDATE_QUANTITY': {
            if (action.payload.quantity <= 0) {
                return {
                    ...state,
                    cartItems: state.cartItems.filter(item => item.id !== action.payload.id)
                };
            }
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
                )
            };
        }
        case 'REMOVE_ITEM':
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.payload)
            };
        case 'OPEN_CART':
            return { ...state, isCartOpen: true };
        case 'CLOSE_CART':
            return { ...state, isCartOpen: false };
        case 'CHECKOUT': {
            const subtotal = state.cartItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
            const tax = subtotal * 0.08;
            const total = subtotal + tax;
            return {
                ...state,
                receiptData: { items: [...state.cartItems], tax, total },
                isCartOpen: false,
                cartItems: [],
                isModalOpen: true
            };
        }
        case 'CLOSE_MODAL':
            return { ...state, isModalOpen: false };
        default:
            return state;
    }
}

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Compute derived state
    const cartCount = state.cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
    const subtotal = state.cartItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);

    const value = {
        state,
        cartCount,
        subtotal,
        dispatch,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    return useContext(CartContext);
}
