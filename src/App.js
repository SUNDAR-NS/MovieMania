import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Components/Home.js";
import Login from "./Components/Login.js";
import Register from "./Components/Register.js";
import AWelcome from "./Components/AWelcome.js";
import VWelcome from "./Components/VWelcome.js";
import ReviewAccordion from "./Components/ReviewAccordion.js";
import ReviewModal from "./Components/ReviewModal.js";
import RWelcome from "./Components/RWelcome.js";
import Banner from "./Components/Banner.js";
import Movies from "./Components/Movies.js";
import About from "./Components/About.js";
import WatchlistMovie from "./Components/WatchlistMovie.js"; // Import Watchlist component

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home /> <Banner /> <Movies />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/About" element={<About />} />
        <Route path="/AWelcome" element={<AWelcome />} />
        <Route path="/VWelcome" element={<VWelcome />} />
        <Route path="/RWelcome" element={<RWelcome />} />
        <Route path="/About" element={<About />} />
        <Route path="/reviews/:id" element={<ReviewModal />} />
        <Route path="/watchlistMovie" element={<WatchlistMovie />} /> {/* Add route for Watchlist component */}
      </Routes>
    </Router>
  );
}

export default App;
