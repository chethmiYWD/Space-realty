import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import properties from './properties.json';
import './Favourites.css';

const Favourites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadFavorites = () => {
      const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      console.log('Saved favorites in localStorage:', savedFavorites); // Debug log
    
      const favoriteProperties = properties.properties.filter((property) =>
        savedFavorites.includes(String(property.id)) // String comparison
      );
      console.log('Matched favorite properties:', favoriteProperties); // Debug log
    
      setFavorites(favoriteProperties);
    };

    loadFavorites();
    window.addEventListener('favoritesUpdated', loadFavorites);
  
    return () => window.removeEventListener('favoritesUpdated', loadFavorites);
  }, []);

  const handleDelete = (id) => {
    const updatedFavorites = favorites.filter((property) => property.id !== id);
    setFavorites(updatedFavorites);

    // Save updated favorites to localStorage
    const updatedFavoriteIds = updatedFavorites.map((property) => property.id);
    localStorage.setItem('favorites', JSON.stringify(updatedFavoriteIds));

    // Dispatch event to notify favorites updated
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  const handleClearFavorites = () => {
    setFavorites([]); // Clear favorites state
    localStorage.removeItem('favorites'); // Remove favorites from localStorage

    // Dispatch event to notify favorites updated
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="favorites-page">
      <button onClick={handleBack} className="back-button">Go Back</button> {/* Back Button */}
      <h2>Your Favorites ({favorites.length})</h2> {/* Show number of favorites */}
      
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
