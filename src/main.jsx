import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import '../style.css';
import { CartProvider } from './context/CartContext.jsx';

// Mount the React application to the #root div in index.html
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <CartProvider>
            <App />
        </CartProvider>
    </React.StrictMode>
);
