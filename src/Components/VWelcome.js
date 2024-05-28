import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./VWelcome.css";
import ReviewModal from "./ReviewModal";

function VWelcome() {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [watchlist, setWatchlist] = useState([]);
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReviews();
    fetchWatchlist();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/reviews");
      const sortedReviews = response.data.sort((a, b) => b.rating - a.rating);
      setReviews(sortedReviews);
    } catch (error) {
      console.error("Error fetching reviews", error);
    }
  };

  const fetchWatchlist = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/watchlist");
      setWatchlistMovies(response.data);
    } catch (error) {
      console.error("Error fetching watchlist", error);
    }
  };

  const handleReviewClick = (review) => {
    setSelectedReview(review);
  };

  const handleCloseModal = () => {
    setSelectedReview(null);
  };

  const handleSearch = () => {
    return reviews.filter((review) => {
      return review.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  };

  const filteredReviews = handleSearch();

  const HomeButton = () => {
    navigate("/");
  };

  const OpenWatchlist = () => {
    navigate("/WatchlistMovie");
  };

  const addToWatchlist = async (review) => {
  try {
    const { name, genre, language, rating, cast, imageName, reviews } = review;
    const reviewData = reviews && reviews.length > 0 ? reviews : [{ review: '', star: 0 }]; // If reviews array is empty, add a default review and star
    await axios.post("http://localhost:5000/api/add-to-watchlist", {
      wname: name,
      wgenre: genre,
      wlanguage: language,
      wrating: rating,
      wcast: cast,
      wimageName: imageName,
      wreviews: reviewData // Pass review data
    });
    setWatchlist((prevWatchlist) => [...prevWatchlist, review]);
    fetchWatchlist();
  } catch (error) {
    if (error.response && error.response.status === 400) {
      alert("This movie already in the watchlist!!!");
    } else {
      console.error("Error adding to watchlist", error);
    }
  }
};

  
  const isInWatchlist = (review) => {
    return watchlistMovies.some((movie) => movie.wname === review.name);
  };

  return (
    <div>
      <header className="navbar">
        <h1 className="navbar-title">Movie Mania</h1>
        <i className="fas fa-search search-icon"></i>
        <input
          type="text"
          placeholder="Search"
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="home-button" onClick={HomeButton}>
          Home
        </button>
        <button className="watchlist-button" onClick={OpenWatchlist}>
          Watchlist
        </button>
      </header>
      <div className="vwelcome">
        {filteredReviews.map((review, index) => (
          <div key={index} onClick={() => handleReviewClick(review)}>
            <div className="widthh">
            <img src={`http://localhost:5000/uploads/${review.imageName}`} alt="Review" className="vreview-image" />
            <h3 className="review-title">{review.name}</h3>
            <button className="add-to-watchlist-button" onClick={() => addToWatchlist(review)}>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className={isInWatchlist(review) ? "tick-icon-filled" : "tick-icon"}>
    <path fill={isInWatchlist(review) ? "black" : "none"} d="M0 0h24v24H0z" />
    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
  </svg>
</button>
</div>

          </div>
        ))}
        {selectedReview && (
          <ReviewModal review={selectedReview} onClose={handleCloseModal} addToWatchlist={addToWatchlist} />
        )}
      </div>
    </div>
  );
}

export default VWelcome;
