import { useEffect, useState } from 'react';
import type { IProduct } from '../types/product';
import ProductCard from './ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const baseUrl =
        import.meta.env.MODE === 'production'
          ? import.meta.env.VITE_SERVER_REMOTE_URI
          : import.meta.env.VITE_SERVER_LOCAL_URI;
      const response = await fetch(`${baseUrl}/products`);
      const { data } = await response.json();
      setProducts(data);
    };
    getProducts();
  }, []);
  return (
    <div className='max-w-6xl mx-auto px-4 md:px-6  py-12'>
      <div className='text-center mb-12'>
        <h2 className='text-3xl font-bold text-gray-900 mb-4'>
          Featured Products
        </h2>
        <p className='text-lg text-gray-600'>
          Browse our collection of premium products
        </p>
      </div>

      {/* Products Grid */}
      <div
        className='grid gap-6 justify-items-center'
        style={{
          gridTemplateColumns: 'repeat(auto-fit, 200px)', // ✅ Exactly 200px cards
          justifyContent: 'center',
        }}
      >
        {products.map((product: IProduct) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
