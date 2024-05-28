// ReviewAccordion.js
import React, { useState } from 'react';
import './ReviewAccordion.css'; // Import the corresponding CSS file for styling
import ReviewModal from './ReviewModal'; // Import the ReviewModal component

function ReviewAccordion({ review }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div onClick={toggleModal} className="width">
        <img src={`http://localhost:5000/uploads/${review.imageName}`} alt="Review" className="rrrimage" />
        <h3 className="rrrname">{review.name}</h3>
      </div>
      {isOpen && <ReviewModal review={review} onClose={toggleModal} />}
    </div>
  );
}

export default ReviewAccordion;
