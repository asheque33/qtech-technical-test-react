import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { CartProvider } from './contexts/CartContext';
import CartIntegration from './components/CartIntegration';
import Footer from './components/Footer';

const App = () => {
  return (
    <CartProvider>
      <div className='min-h-screen bg-gray-50'>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <CartIntegration />
      </div>
      <Footer />
    </CartProvider>
  );
};

export default App;
