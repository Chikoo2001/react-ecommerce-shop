import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from '../contexts/ProductContext';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';

const ProductDetails = () => {

  const { id } = useParams();
  const {products} = useContext(ProductContext);
  const {userInfo} = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const product = products.find((product) => product.id === parseInt(id));
  
  const {title, price, description, image} = product;

  return (
    <section className='mt-44 mb-12 lg:py-32 h-screen flex items-center'>
      <div className="container mx-auto">
        <div className='flex flex-col lg:flex-row items-center'>
          <div className='flex flex-1 justify-center items-center mb-8 lg:mb-0'>
            <img className='max-w-[200px] lg:max-w-sm' src={image} alt="product" />
          </div>
          <div className='flex-1 text-center lg:text-left'>
            <h1 className='text-[26px] font-medium mb-2 max-w-[460px]'>{title}</h1>
            <div className='text-xl font-bold mb-6'>$ {price}</div>
            <p className='mb-8'>{description}</p>
            <button
              className='bg-primary py-4 px-8 text-white'
              onClick={() => userInfo ? dispatch(addToCart(product)) : toast.error("Login to add to cart")}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
