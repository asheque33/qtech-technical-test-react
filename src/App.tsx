import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { CartProvider } from './contexts/CartContext';
import CartIntegration from './components/CartIntegration';

const App = () => {
  return (
    <CartProvider>
      {' '}
      {/* ✅ Wrap everything with CartProvider */}
      <div className='min-h-screen bg-gray-50'>
        <Navbar /> {/* ✅ Navbar with cart icon */}
        <main>
          <Outlet />
        </main>
        <CartIntegration /> {/* ✅ Cart sidebar integration */}
      </div>
    </CartProvider>
  );
};

export default App;
