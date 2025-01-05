import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import properties from './properties.json';
import './Favourites.css';

const Favourites = () => {
  // State to store favorite properties
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  // Load the favorite properties
  useEffect(() => {
    const loadFavorites = () => {
      // Retrieve the saved favorite property IDs from localStorage
      const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
      // Find the properties that match the saved favorite IDs
      const favoriteProperties = properties.properties.filter((property) =>
        savedFavorites.includes(String(property.id)) // String comparison
      );
    
      // Update the favorites state with the matched properties
      setFavorites(favoriteProperties);
    };

    // Function to load favourites
    loadFavorites();
    window.addEventListener('favoritesUpdated', loadFavorites);
  
    return () => window.removeEventListener('favoritesUpdated', loadFavorites);
  }, []);

  // Handle removing a property from favorites
  const handleDelete = (id) => {
    const updatedFavorites = favorites.filter((property) => property.id !== id);
    setFavorites(updatedFavorites);

    // Save updated favorites to localStorage
    const updatedFavoriteIds = updatedFavorites.map((property) => property.id);
    localStorage.setItem('favorites', JSON.stringify(updatedFavoriteIds));

    // Dispatch event to notify favorites updated
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  // Handle clearing all favorites
  const handleClearFavorites = () => {
    setFavorites([]); // Clear favorites state
    localStorage.removeItem('favorites'); // Remove favorites from localStorage

    // Dispatch event to notify favorites updated
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  // Handle the back button click
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
      
      {/* Display message if no favorites are present */}
      {favorites.length === 0 ? (
        <div className="no-favorites">
          <p>No favorites yet!</p>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((property) => (
            <div key={property.id} className="fav-property-card">
              {/* Display property image */}
              <img
                src={require(`../src${property.images[0].substring(1)}`)}
                alt={`${property.type} in ${property.location}`}
                className="fav-property-image"
              />
              <div className="fav-property-details">
                {/* Display property details */}
                <h3>{property.type} in {property.location}</h3>
                <p className="fav-property-name">{property.name}</p>
                <div className="fav-property-actions">
                  {/* Delete button to remove property from favorites */}
                  <button onClick={() => handleDelete(property.id)} className="delete-button">
                    Delete
                  </button>
                  {/* View Details button to navigate to property details page */}
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
