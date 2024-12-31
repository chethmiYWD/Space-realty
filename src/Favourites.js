import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import properties from './properties.json';
import './Favourites.css';

const Favourites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = window.location.pathname;
    window.scrollTo(0, 0);

    // Reset favorites only when on the main page
    if (currentPath === '/') {
      localStorage.removeItem('favorites'); // Clear favorites
    } else {
      const savedFavorites = localStorage.getItem('favorites');
      if (savedFavorites) {
        const favoriteIds = JSON.parse(savedFavorites);
        const favoriteProperties = properties.properties.filter((property) =>
          favoriteIds.includes(property.id)
        );
        setFavorites(favoriteProperties);
      }
    }
  }, []);

  const handleDelete = (id) => {
    const updatedFavorites = favorites.filter((property) => property.id !== id);
    setFavorites(updatedFavorites);

    // Save updated favorites to localStorage
    const updatedFavoriteIds = updatedFavorites.map((property) => property.id);
    localStorage.setItem('favorites', JSON.stringify(updatedFavoriteIds));
  };

  const handleClearFavorites = () => {
    setFavorites([]); // Clear favorites state
    localStorage.removeItem('favorites'); // Remove favorites from localStorage
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="favorites-page">
      <button onClick={handleBack} className="back-button">Go Back</button> {/* Back Button */}
      <h2>Your Favorites</h2>
      
      {/* Clear Favorites Button */}
      {favorites.length > 0 && (
        <button onClick={handleClearFavorites} className="clear-favorites-button">
          Clear All Favorites
        </button>
      )}
      
      {favorites.length === 0 ? (
        <div className="no-favorites">
          <p>No favorites yet!</p>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((property) => (
            <div key={property.id} className="fav-property-card">
              <img
                src={require(`../src${property.images[0].substring(1)}`)}
                alt={`${property.type} in ${property.location}`}
                className="fav-property-image"
              />
              <div className="fav-property-details">
                <h3>{property.type} in {property.location}</h3>
                <p className="fav-property-name">{property.name}</p>
                <div className="fav-property-actions">
                  <button onClick={() => handleDelete(property.id)} className="delete-button">
                    Delete
                  </button>
                  <button onClick={() => navigate(`/property/${property.id}`)} className="view-details-button">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;
