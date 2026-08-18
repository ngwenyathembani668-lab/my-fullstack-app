import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <div className='banner'>
        
        <h1 className='
            font-semibold
        '>Not sure where to go, perfect</h1>
        <button className='
            p-2 
            rounded-3xl
            bg-white
            text-black
            hover:bg-rose-500
            hover:text-white
            transition-colors duration-200
            font-semibold
        '>I am flexable</button>
      
    </div>
  )
}

export default HeroSection;
