import React from 'react';
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import dotenv from "dotenv";
import App from './App.jsx'
import store from './redux/store';

dotenv.config({
    path: './.env'
})

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <App />
    </Provider>
)
