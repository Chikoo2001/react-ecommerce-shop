import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ProductContextProvider from './contexts/ProductContext';
import SidebarContextProvider from './contexts/SidebarContext';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import { app } from './firebase.config';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store} app={app}>
    <SidebarContextProvider>
      <ProductContextProvider>
        <PersistGate loading={"loading"} persistor={persistor}>
          <App />
          <ToastContainer
            position="top-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
        </PersistGate>
      </ProductContextProvider>
    </SidebarContextProvider>
  </Provider>
);
