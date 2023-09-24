import React, { createContext, useEffect, useState } from 'react';

export const ProductContext = createContext();

export default function ProductContextProvider({children}) {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, [])

  return (
    <ProductContext.Provider value={{products, loading}}>
      {children}
    </ProductContext.Provider>
  )
}

