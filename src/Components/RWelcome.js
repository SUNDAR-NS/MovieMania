import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import './RWelcome.css';
import ReviewAccordion2 from "./ReviewAccordion2";

function RWelcome() {
  const location  = useLocation();
  const username = location.state ? location.state.name : "";
  const [isOpen, setIsOpen] = useState(true);
  const [isVOpen, setIsVOpen ] = useState(true);
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [star, setStar] = useState('');
  const [details, setDetails] = useState([]);
  const navigate = useNavigate();

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/reviews');
      setDetails(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        name: name,
        review: review,
        star: star
      };
  
      const resp = await axios.post(
        "http://localhost:5000/api/add-review",
        formData
      );
  
      console.log(resp.data);
      setDetails([...details, resp.data]);
      setIsOpen(true);
      setIsVOpen(true);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  
  const LogOut = () => {
    navigate('/Login');
  };

  const GoHome = () => {
    navigate('/');
  };

  const GoAbout = () => {
    navigate('/About');
  };

  const handleViewReviewClick = () => {
    setIsVOpen(false);
  };

  const handleAddReviewClick = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <header className="navbar">
        <h1 className="navbar-title">Movie Mania</h1>
        <button className="a-home" onClick={GoHome}>Home</button>
        <button className="a-about" onClick={GoAbout}>About</button>
        <button className="a-logout" onClick={LogOut}>Logout</button>
      </header>
      <div>
        {isOpen && isVOpen && (
          <div class="a-container">
            <div class="a-left-section">
              <h1 class="username">Welcome, {username}!</h1>
              <p class="a-quote">
              Reviewers are the secret keepers of excellence, guarding standards with diligence and care.
              </p>
            </div>
            <div class="a-right-section">
              <button class="action-button" onClick={handleViewReviewClick}>
                View Movie
              </button>
              <button class="action-button" onClick={handleAddReviewClick}>
                Add Review
              </button>
            </div>
          </div>
        )}
      {isOpen && !isVOpen && (
          <div className="rrreview-container">
            {details.map((review, index) => (
              <div key={index} className="rrreview-item">
                <ReviewAccordion2 review={review} />
              </div>
            ))}
          </div> )}
      {!isOpen && isVOpen && (
          <div className="rcard">
            <h3 className="review-quotes">"Lights, camera, action! Share your cinematic thoughts and let your review shine like a star on the silver screen!"</h3>
            <form onSubmit={handleSubmit}>
              <label className="rlabel">Name</label>
              <input
                type="text"
                name="name"
                className="rinput-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label className="rlabel">Review</label>
              <textarea
                type="text"
                name="review"
                className="rtext-field"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
              <label className="rlabel">Star</label>
              <input
                type="text"
                name="star"
                className="rinput-field"
                value={star}
                onChange={(e) => setStar(e.target.value)}
              />
              <button className="rwelcome-submit" type="submit">
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default RWelcome;
