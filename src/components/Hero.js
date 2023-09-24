import React from 'react';
import Woman from '../img/woman_hero.png'

const Hero = () => {
  return (
    <section className='w-screen h-[800px] bg-hero bg-no-repeat bg-cover bg-center py-24'>
      <div className="container mx-auto flex justify-around h-full">
        <div className="flex flex-col justify-center">
          <div className='flex font-semibold items-center uppercase'>
            <div className='w-10 h-[2px] bg-red-500 mr-3'></div>New Trend
          </div>
          <h1 className='text-[70px] leading-[1.1] font-light mb-4'>
            AUTUMN SALE STYLISH <br />
            <span>WOMENS</span>
          </h1>
          <div className='uppercase self-start font-semibold border-primary border-b-2'>Discover More</div>
        </div>
        <div className='hidden lg:block'>
          <img src={Woman} alt="woman" />
        </div>
      </div>
    </section>
  );
};

export default Hero; 
