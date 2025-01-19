import React from 'react';
// import image2 from "./assets/image2.jpg";
// import item from './assets/images.png';
const ProductCard = ({ title, description, image, price }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 m-1">
      <img src={image } alt={title} className="rounded mb-4" />
      <h2 className="text-lg font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
      {/* <div className="mt-4">
        <span className="text-re
        d-600 font-bold">{price}</span>
      </div> */}
      {/* <button className="mt-2 w-full bg-red-500 text-white py-2 rounded">Add ₹199</button> */}
    </div>
  );
};

export default ProductCard;
