import React, { useContext} from 'react';
import { SidebarContext } from '../contexts/SidebarContext';
import { BsBag } from 'react-icons/bs';
import logo from '../img/logo.svg';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signOut } from "firebase/auth";
import { toast } from 'react-toastify';
import { removeUser } from '../redux/slices/cartSlice';

const Header = ({showLogin, setShowLogin}) => {
  const {isOpen, setIsOpen} = useContext(SidebarContext);
  const { userInfo, cartQuantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  function handleLogout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      dispatch(removeUser());
      toast.success("User Logged out");
    }).catch((error) => {
      toast.error(error.code);
    });
  }
  

  return (
    <header className={`bg-white p-4 shadow-md fixed w-full z-10 transition-all`}>
      <div className='container mx-auto flex items-center justify-between h-full'>
        <Link to={"/"}>
          <div>
            <img className='w-[40px]' src={logo} alt="logo" />
          </div>
        </Link>
        <div className='flex flex-1 justify-end items-center'>
          <div 
            className='cursor-pointer flex relative mr-8'
            onClick={() => setIsOpen(!isOpen)}
          >
            <BsBag className='text-2xl'/>
            <div 
              className=' bg-pink-500 absolute -right-2 -bottom-2 text-white rounded-full 
              flex justify-center items-center text-[12px] w-[18px] h-[18px]'
            >
              {cartQuantity}
            </div>
          </div>
          {
            userInfo 
            ? (
              <p 
                className='bg-pink-500 w-8 h-8 rounded-full flex justify-center items-center text-lg font-bold border-2-black cursor-pointer'
                onClick={handleLogout}
              >
                {userInfo.name?.charAt(0)?.toUpperCase()}
              </p>
            )
            : (
              <img
                onClick={() => setShowLogin(true)}
                className='w-8 h-8 rounded-fullk cursor-pointer'
                src='https://cdn-icons-png.flaticon.com/512/1144/1144760.png'
                alt='profile'
              />
            )
          }
        </div>
        
      </div>
    </header>
  );
};

export default Header;
