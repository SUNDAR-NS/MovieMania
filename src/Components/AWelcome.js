import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./AWelcome.css";
import ReviewAccordion from "./ReviewAccordion";

function AWelcome() {
  const location = useLocation();
  const username = location.state ? location.state.name : "";
  const [isVOpen, setIsVOpen] = useState(true);
  const [isAOpen, setIsAOpen] = useState(true);
  const [isDOpen, setIsDOpen] = useState(true);
  const [isUOpen, setIsUOpen] = useState(true);
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [language, setLanguage] = useState("");
  const [rating, setRating] = useState("");
  const [imageName, setImageName] = useState(null);
  const [cast, setCast] = useState("");
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/reviews");
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("genre", genre);
      formData.append("language", language);
      formData.append("rating", rating);
      formData.append("testImage", imageName);
      formData.append("cast", cast);

      const resp = await axios.post(
        "http://localhost:5000/api/details",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(resp.data);
      fetchReviews();
    } catch (error) {
      console.log("Error:", error);
    }
    setIsAOpen(true);
    setIsDOpen(true);
    setIsVOpen(true);
    setIsUOpen(true);
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/delete-entry",
        { name }
      );
      console.log(response.data);
      fetchReviews();
      setIsAOpen(true);
      setIsDOpen(true);
      setIsVOpen(true);
      setIsUOpen(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAddReviewClick = () => {
    setIsAOpen(false);
  };

  const handleDeleteReviewClick = () => {
    setIsDOpen(false);
  };

  const handleViewReviewClick = () => {
    setIsVOpen(false);
  };

  const handleUpdateReviewClick = () => {
    setIsUOpen(false);
  }

  const LogOut = () => {
    navigate("/Login");
  };

  const AHome = () => {
    navigate("/");
  };

  const AAbout = () => {
    navigate("/About");
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("genre", genre);
      formData.append("language", language);
      formData.append("rating", rating);
      formData.append("testImage", imageName);
      formData.append("cast", cast);

      const response = await axios.post(
        "http://localhost:5000/api/movieupdate-entry",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      fetchReviews();
    } catch (error) {
      console.error("Error updating entry:", error);
    }
  };

  return (
    <div>
      <header className="navbar">
        <h1 className="navbar-title">Movie Mania</h1>
        <button className="a-home" onClick={AHome}>
          Home
        </button>
        <button className="a-about" onClick={AAbout}>
          About
        </button>
        <button className="a-logout" onClick={LogOut}>
          Logout
        </button>
      </header>
      <div>
        {isAOpen && isDOpen && isVOpen && isUOpen && (
          <div class="a-container">
            <div class="a-left-section">
              <h1 class="username">Welcome, {username}!</h1>
              <p class="a-quote">
                A movie isn't good or bad because of what it's about, but how
                it's about it.
              </p>
            </div>
            <div class="a-right-section">
              <button class="action-button" onClick={handleViewReviewClick}>
                View Movie
              </button>
              <button class="action-button" onClick={handleAddReviewClick}>
                Add Movie
              </button>
              <button class="action-button" onClick={handleDeleteReviewClick}>
                Delete Movie
              </button>
              <button class="action-button" onClick={handleUpdateReviewClick}>
                Update Movie
              </button>
            </div>
          </div>
        )}
        {!isAOpen && isDOpen && isVOpen && isUOpen && (
          <div className="acard">
            <h3 className="movie-quotes">"Movies are like an expensive form of therapy for me"</h3>
            <form onSubmit={handleSubmit}>
              <label className="alabel">Movie Name</label>
              <input
                type="text"
                name="name"
                className="ainput-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label className="alabel">Genre</label>
              <input
                type="text"
                name="genre"
                className="ainput-field"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />
              <label className="alabel">Language</label>
              <input
                type="text"
                name="language"
                className="ainput-field"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              />
              <label className="alabel">Rating</label>
              <input
                type="text"
                name="rating"
                className="ainput-field"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
              <label className="alabel">Cast</label>
              <input
                type="text"
                name="cast"
                className="ainput-field"
                value={cast}
                onChange={(e) => setCast(e.target.value)}
              />
              <label className="alabel">Upload Image</label>
              <input
                type="file"
                name="image"
                className="ainput-field"
                onChange={(e) => setImageName(e.target.files[0])}
              />
              <button className="awelcome-submit" type="submit">
                Submit
              </button>
            </form>
          </div>
        )}
        {isAOpen && !isDOpen && isVOpen && isUOpen && (
          <div className="acard">
            <form onSubmit={handleDeleteSubmit}>
              <label className="alabel">Name</label>
              <input
                type="text"
                name="name"
                className="ainput-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <button className="awelcome-submit" type="submit">
                Submit
              </button>
            </form>
          </div>
        )}
        {isAOpen && isDOpen && !isVOpen && isUOpen && (
          <div className="rrreview-container">
            {reviews.map((review, index) => (
              <div key={index} className="rrreview-item">
                <ReviewAccordion review={review} />
              </div>
            ))}
          </div> )}

        {isAOpen && isDOpen && isVOpen && !isUOpen && (
          <div className="acard">
            <form onSubmit={handleUpdateSubmit}>
            <label className="alabel">Name</label>
              <input
                type="text"
                name="name"
                value={name}
                className="ainput-field"
                onChange={(e) => setName(e.target.value)}
              />
              <label className="alabel">Language</label>
              <input
                type="text"
                name="language"
                value={language}
                className="ainput-field"
                onChange={(e) => setLanguage(e.target.value)}
              />
              <label className="alabel">Genre</label>
              <input
                type="text"
                name="Genre"
                value={genre}
                className="ainput-field"
                onChange={(e) => setGenre(e.target.value)}
              />
              <label className="alabel">Rating</label>
              <input
                type="text"
                name="rating"
                value={rating}
                className="ainput-field"
                onChange={(e) => setRating(e.target.value)}
              />
              <label className="alabel">Cast</label>
              <input
                type="text"
                name="cast"
                value={cast}
                className="ainput-field"
                onChange={(e) => setCast(e.target.value)}
              />
              <label className="alabel">Upload Image</label>
              <input
                type="file"
                name="image"
                className="ainput-field"
                onChange={(e) => setImageName(e.target.files[0])}
              />
              <button className="awelcome-submit" type="submit">
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default AWelcome;
