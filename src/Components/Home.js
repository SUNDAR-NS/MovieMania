import React from 'react';
import { Link } from "react-router-dom";
import './Home.css';

function Home() {
    return (
        <div className="home-container">
            <div className="navbar">
                <h1 className="title-project">Movie Mania</h1>
                <div className="navbar-buttons">
                    <Link to="/About" className="button-link">
                        <button className="logreg">About</button>
                    </Link>
                    <Link to="/login" className="button-link">
                        <button className="logreg">Login</button>
                    </Link>
                    <Link to="/register" className="button-link">
                        <button className="logreg">Register</button>
                    </Link>
                </div>
            </div>
            <div className="explore-container">
                <Link to="/VWelcome" className="explore-link">
                    <button className="explore">Explore Movies</button>
                </Link>
            </div>
        </div>
    );
}

export default Home;
