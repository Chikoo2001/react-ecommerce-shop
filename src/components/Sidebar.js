import React, { useContext, useEffect } from 'react';
import { IoMdArrowForward } from 'react-icons/io';
import { SidebarContext } from '../contexts/SidebarContext';
import CartItem from '../components/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { emptyCart, setTotal } from '../redux/slices/cartSlice';

const Sidebar = () => {

  const {isOpen, setIsOpen} = useContext(SidebarContext);
  const { cartItems, cartAmount, cartQuantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("executed");
    dispatch(setTotal());
  }, [cartItems])

  return (
      <div className={`${isOpen ? 'right-0' : '-right-full'} w-full bg-white fixed top-0 h-full shadow-2xl 
      md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px] overflow-y-auto scrollbar-hide`}>
        <div className='flex items-center justify-between py-6 border-b'>
          <div className='uppercase text-sm font-semibold'>Shopping Bag ({cartQuantity})</div>
          <div
            className='cursor-pointer w-8 h-8 flex justify-center items-center border-b'
            onClick={() => setIsOpen(false)}
          >
            <IoMdArrowForward className='text-2xl' />
          </div>
        </div>
        <div className='flex flex-col gap-y-2 border-b'>
          {
            cartItems.map((item) => (
              <CartItem item={item} key={item.id} />
            ))
          }
        </div>
        <div className='flex flex=col gap-y-3 py-4 mt-4'>
          <div className='flex justify-between items-center w-full'>
            <div>
              <div className='uppercase font-semibold'>
              {
                cartQuantity
                ? (<div><span className='mr-2'>Total: </span>$ {cartAmount}</div>)
                : <div>Cart is empty</div>
              }
                
              </div>
            </div>
            <div 
              className="px-5 py-2 rounded-md text-blue-100 bg-blue-600 hover:bg-blue-700 cursor-pointer"
              onClick={() => cartQuantity ? dispatch(emptyCart()) : setIsOpen(false)}
            >
              {
                cartQuantity
                ? "Empty Cart"
                : "Shop now"
              }
            </div>
          </div>
        </div>
        
      </div>
    );
};

export default Sidebar;
