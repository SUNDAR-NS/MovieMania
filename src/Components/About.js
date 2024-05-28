import React from 'react';
import { useNavigate } from 'react-router-dom';
import './About.css';

const About = () => {

    const navigate = useNavigate();

    const AHome = () => {

        navigate('/');
    
      };
    
      const AAbout = () => {
    
          navigate('/About')
      };

      const Register = () => {
        navigate('/Register');
      };

  return (
    <div>
        <header className="navbar">
        <h1 className="navbar-title">Movie Mania</h1>
        <button className="a-home" onClick={AHome}>Home</button>
        <button className="a-about" onClick={AAbout}>About</button>
        <button className="a-logout" onClick={Register}>Register</button>
        </header>
    <div className="about-page">
      <h1>About Movie Mania</h1>
      <p>Welcome to Movie Mania, your ultimate destination for all things movies! Whether you're a cinephile searching for your next cinematic adventure, a dedicated reviewer eager to share your thoughts, or simply someone looking for a good flick to watch, Movie Mania has got you covered.</p>
      
      <h2>Our Mission</h2>
      <p>At Movie Mania, we're passionate about connecting movie enthusiasts from all walks of life. Our mission is to provide a platform where users can discover, discuss, and delve into the world of cinema like never before. We aim to create an inclusive community where everyone can share their love for movies and explore new favorites together.</p>

      <h2>Key Features</h2>
      <ul>
        <li><strong>Comprehensive Movie Database:</strong> Dive into our extensive collection of movies, complete with detailed information including plot summaries, cast and crew details, release dates, and more.</li>
        <li><strong>User Roles:</strong> With distinct roles for Admins, Reviewers, and Viewers, Movie Mania ensures that everyone has a tailored experience suited to their preferences and interests.</li>
        <li><strong>Admin Tools:</strong> Admins have the power to add new movies to the database, update existing movie details, and remove outdated entries, ensuring that our library stays up-to-date and relevant.</li>
        <li><strong>Review and Ratings:</strong> Reviewers can share their insights and opinions on movies, along with star ratings, helping other users make informed decisions about what to watch next.</li>
        <li><strong>Sorting and Searching:</strong> Viewers can easily explore our vast collection of movies, sorting them by rating to discover the highest-rated gems or using our search functionality to find specific titles.</li>
      </ul>

      <h2>Meet the Team</h2>
      <p>Movie Mania is made possible by a dedicated team of developers, designers, and movie enthusiasts who are passionate about delivering the best possible experience to our users. Get to know the faces behind the scenes and discover the expertise and creativity that drives Movie Mania forward.</p>

      <h2>Our Technology Stack</h2>
      <p>Powered by cutting-edge technologies such as React.js for frontend development and Node.js for backend functionality, Movie Mania is built to deliver a seamless and intuitive user experience. Learn more about our technology stack and how it enables us to provide innovative features and robust performance.</p>

      <h2>Future Plans</h2>
      <p>We're just getting started on our journey, and there's so much more in store for Movie Mania! From enhancing existing features to introducing exciting new functionalities, we're committed to continuously improving and evolving to meet the needs of our growing community.</p>

      <h2>Get in Touch</h2>
      <p>Have questions, feedback, or suggestions? We'd love to hear from you! Reach out to us via email at <a href="mailto:contact@moviemania.com">contact@moviemania.com</a> or connect with us on social media to stay updated on the latest news and updates from Movie Mania.</p>

      <p>Thank you for joining us on this cinematic adventure. Let's explore the magic of movies together with Movie Mania!</p>
    </div>
    </div>
  );
}

export default About;
