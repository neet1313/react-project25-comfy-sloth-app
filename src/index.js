import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

import { ProductsProvider } from './context/products_context';
import { FilterProvider } from './context/filter_context';
import { CartProvider } from './context/cart_context';
import { UserProvider } from './context/user_context';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Auth0Provider
        domain='dev-m31cz5mlzr4w514x.us.auth0.com'
        clientId='aVypGBkUx71U0G3QDqJmlivaXlFnFXAw'
        redirectUri={window.location.origin}
        cacheLocation='localstorage'
    >
        <UserProvider>
            <Router>
                <ProductsProvider>
                    <FilterProvider>
                        <CartProvider>
                            <App />
                        </CartProvider>
                    </FilterProvider>
                </ProductsProvider>
            </Router>
        </UserProvider>
    </Auth0Provider>
);
