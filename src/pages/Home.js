import React, { useContext } from 'react';
import { ProductContext } from '../contexts/ProductContext';
import Product from '../components/Product';
import Hero from '../components/Hero';
import Spinner from '../components/Spinner/Spinner';

const Home = () => {

  const { products, loading } = useContext(ProductContext);
  const filteredProducts = products.filter((product) => (product.category === "men's clothing" || product.category === 
  "women's clothing"));

  return (
    <div>
      <Hero />
      <section className="py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto
            md:max-w-none md:mx-0">
            {
              loading 
              ? (<Spinner />) 
              : (filteredProducts.map((product) => (
                <Product key={product.id} product={product}/>
              )))
            }
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
