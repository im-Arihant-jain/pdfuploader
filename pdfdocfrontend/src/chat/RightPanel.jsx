import React from 'react';
import ProductCard from './ProductCard';
import image from "./assets/image1.jpg";
import image2 from "./assets/image2.jpg";
const RightPanel = ({imageurl}) => {
  return (
    <div style={{
        overflow: 'auto',
        scrollbarWidth: 'none', /* Firefox */
        msOverflowStyle: 'none', /* IE and Edge */
      }} className="flex flex-col items-center p-4 w-full h-full rounded-lg shadow-md bg-gradient-to-b from-[#004AAD] to-[#5DE0E6]">
      {/* <div className="flex flex-col w-full md:w-1/4"> */}
       c:\Users\Ankita\OneDrive\Desktop\brainwave\projectnavigation\frontend\src\components\chat\ProductCard.jsx
        <ProductCard
          title="National Museum"
          description="Discover the artistry of ancient civilizations at our museum! ..."
          image={image2}  // Replace with the actual image path
          price="₹2000"
        />
         <ProductCard
          title=""
          description=""
          image={imageurl}  // Replace with the actual image path
          price=""
        />
        
      {/* </div> */}
    </div>
  );
};

export default RightPanel;
