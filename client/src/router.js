import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Signup from './auth/Signup';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: 'signup',
        element: <Signup />
    }
]);

export default router;