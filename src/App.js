import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

const App = () => {
  
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return  (
    <div className='overflow-hidden'>
      <Router>
        <Header showLogin={showLogin} setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/product/:id" element={<ProductDetails/>}></Route>
          <Route path='*' element={<PageNotFound />}></Route>
        </Routes>
        <Sidebar/>
        <Footer/>
        {showLogin && <Login setShowLogin={setShowLogin} setShowRegister={setShowRegister} />}
        {showRegister && <SignUp setShowLogin={setShowLogin} setShowRegister={setShowRegister} />}
      </Router>
    </div>
  );
};

export default App;
