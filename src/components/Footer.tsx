const Footer = () => {
  return (
    <footer className='bg-gray-800 text-white py-6 mt-auto'>
      <div className='max-w-6xl mx-auto px-4 md:px-6 '>
        <div className='text-center'>
          <p className='text-sm text-gray-300'>
            © {new Date().getFullYear()} MiniShop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
