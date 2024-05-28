// ReviewModal.js
import React from 'react';
import './ReviewModal.css';
import starImage from './s.jpg';

function ReviewModal({ review, onClose, addToWatchlist }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={`http://localhost:5000/uploads/${review.imageName}`} alt="Review" className="review-rimage" />
        <h3 className="review-title">{review.name}</h3>
        <p className="review-detail">Genre: {review.genre}</p>
        <p className="review-detail">Language: {review.language}</p>
        <p className="review-detail">Rating: {review.rating}</p>
        <p className="review-text">Cast: {review.cast}</p>
        {review.reviews.map((reviewItem, index) => (
          <div key={index} className="review-item">
            <h3>Review:{index+1}</h3>
            <div className="star-rating">
              {Array.from({ length: reviewItem.star }, (_, i) => (
                <img key={`${index}-${i}`} src={starImage} alt="Star" className="star-icon" />
              ))}
            </div>
            <p className="review-text">Review: {reviewItem.review}</p>
          </div>
        ))}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default ReviewModal;
