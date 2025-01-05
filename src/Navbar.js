import { useState, useEffect } from 'react';
import './Navbar.css'; // For styling
import { FaHeart } from 'react-icons/fa';   // Heart icon for favorites button
import { useNavigate } from 'react-router-dom'; 
import properties from './properties.json';

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [favCount, setFavCount] = useState(0);
  

  // Add useEffect for favorites count
  useEffect(() => {
    const updateFavCount = () => {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavCount(favorites.length);
    };
    
    updateFavCount();
    window.addEventListener('favoritesUpdated', updateFavCount);
    return () => window.removeEventListener('favoritesUpdated', updateFavCount);
  }, []);

  // Scroll function to smoothly scroll to different sections of the page
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

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over'); // Add visual cue
  };
  
  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-over'); // Remove visual cue
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
  
    const propertyId = Number(e.dataTransfer.getData('text/plain'));
    console.log('Dragged property ID:', propertyId); 
  
    // Validate if the dropped property ID is valid
    const validPropertyIds = properties.properties.map((property) => String(property.id));
    if (validPropertyIds.includes(String(propertyId))) {
    const currentFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!currentFavorites.includes(String(propertyId))) {
      const newFavorites = [...currentFavorites, String(propertyId)];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      window.dispatchEvent(new Event('favoritesUpdated'));
      console.log('Added property ID to favorites:', propertyId); 
    } else {
      console.log('Property ID already in favorites:', propertyId); 
    }
    } else {
    console.log('Invalid property ID:', propertyId); 
    }

  };
  
  

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">Space Realty</h1>
        
        {/* Mobile menu button */}
        <button className={`burger-menu ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          ☰
        </button>
        
        {/* Navigation links */}
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
          {/* Favorites button */}
          <li>
            <button
              onClick={() => navigate('/favourites')}
              className="nav-button favourites-button"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              aria-label="Favorites"
            >
              <FaHeart />
              {favCount > 0 && <span className="fav-count">{favCount}</span>}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;