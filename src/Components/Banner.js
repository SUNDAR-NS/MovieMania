import React from 'react';
import './Banner.css';
import vikram from './vikram.jpg'; // Import the image file

function Banner() {
  return (
    <div className="picture" style={{ backgroundImage: `url(${vikram})` }}>
      <div className="banner"> 
        Vikram
      </div>
    </div>
  );
}

export default Banner;
