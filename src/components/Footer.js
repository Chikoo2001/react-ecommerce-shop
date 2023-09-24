import React from 'react';

const Footer = () => {
  return (
    <footer className='py-12 bg-primary'>
      <div className="container mx-auto">
        <p className='text-white text-center'>
          Copyright &copy; Ecommerce Shop {new Date().getFullYear()}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
