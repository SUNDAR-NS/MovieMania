import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./WatchlistMovie.css";

function WatchlistMovie() {
  const [watchlist, setWatchlist] = useState([]);
  const navigate = useNavigate();
  const [openForm, setOpenForm] = useState(false);
  const [wname, setWName] = useState('');

  useEffect(() => {
    fetchWatchlist();
  }, []);

  const fetchWatchlist = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/watchlist");
      setWatchlist(response.data);
    } catch (error) {
      console.error("Error fetching watchlist", error);
    }
  };

  const openMovies = () => {
    navigate('/VWelcome');
  };

  const openAbout = () => {
    navigate('/About');
  };

  const home = () => {
    navigate('/');
  };

  const deleteWatchlist = () => {
    setOpenForm(true);
  };

  const handleDeleteWatchlist = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('http://localhost:5000/api/delete-watchlist', { wname });
      console.log(result.data);
      fetchWatchlist();
      setOpenForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <header className="navbar">
        <h1 className="navbar-title">Movie Mania</h1>
        <button className="a-home" onClick={home}>Home</button>
        <button className="a-about" onClick={openAbout}>About</button>
        <button className="a-logout" onClick={openMovies}>View Movies</button>
      </header>
      <div className="watchlist-container">
        {openForm && (
          <div className="acard">
            <form onSubmit={handleDeleteWatchlist}>
              <label className="alabel">Name</label>
              <input
                type="text"
                name="name"
                className="ainput-field"
                value={wname}
                onChange={(e) => setWName(e.target.value)}
              />
              <button className="awelcome-submit" type="submit">Submit</button>
            </form>
          </div>
        )}
        {!openForm && (
          <>
            <h1 className="watchlist-title">Here are Your Favorite Movies to Watch!!!</h1>
            <div className="watchlist-info">
              <span>Feel Free to Remove watched movies from watchlist.</span>
              <button className="watchlist-delete" onClick={deleteWatchlist}>Delete</button>
            </div>
            <div className="watchlist-movies">
              {watchlist.map((movie) => (
                <div key={movie._id} className="watchlist-movie">
                  <img src={`http://localhost:5000/uploads/${movie.wimageName}`} alt={movie.wname} className="watchlist-image" />
                  <div className="watchlist-overlay"></div>
                  <div className="watchlist-info">
                    <h2 className="watchlist-name">{movie.wname}</h2>
                    <p className="watchlist-genre">Genre: {movie.wgenre}</p>
                    <p className="watchlist-cast">Cast: {movie.wcast}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default WatchlistMovie;
