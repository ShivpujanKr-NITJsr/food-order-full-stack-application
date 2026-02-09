import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MenuPage from '../pages/MenuPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import TrackingPage from '../pages/TrackingPage';

export default function AppRoutes() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path='/' element={<MenuPage />} />

        <Route path='/cart' element={<CartPage />} />

        <Route path='/checkout' element={<CheckoutPage />} />

        <Route path='/track/:id' element={<TrackingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
