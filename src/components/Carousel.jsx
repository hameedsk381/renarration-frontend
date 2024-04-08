import React, { useState, useEffect } from 'react';

function Carousel({ carouselimages }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % carouselimages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, carouselimages.length]);

  return (
    <>
      {carouselimages.map( (src, index) => (
    
            <img key={index} src={src} style={{objectFit:'cover',height:'200px',width:'200px'}} alt={`Renarration  ${index + 1}`} />
       
      ))}
    </>
  );
};
export default Carousel;