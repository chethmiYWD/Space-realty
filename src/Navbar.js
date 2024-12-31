import React, { useState } from 'react';
import './Navbar.css'; // For styling
import { FaHeart } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom'; 

function Navbar() {
  // Initialize the navigate function
  const navigate = useNavigate();

  // State to handle menu open/close
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to scroll smoothly to specific sections
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    const offset = 60; 
    if (section) {
      const top = section.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // Toggle menu for responsive layout
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">Space Realty</h1>
        
        {/* Hamburger Icon for mobile */}
        <button className={`burger-menu ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          ☰
        </button>
        
        {/* Navigation Links */}
        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li>
            <button onClick={() => scrollToSection('home')} className="nav-button">
              Home
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection('listings')} className="nav-button">
              Listings
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection('about')} className="nav-button">
              About
            </button>
          </li>
          <li>
            <button onClick={() => scrollToSection('contact')} className="nav-button">
              Contact
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate('/favourites')} // Navigate to Favorites page
              className="nav-button favourites-button"
              aria-label="Favorites"
            >
              <FaHeart />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
