import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Listings.css';
import { FaHeart } from 'react-icons/fa';

const PropertyList = ({ properties }) => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = () => {
      const saved = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavorites(saved);
    };
    
    loadFavorites();
    window.addEventListener('favoritesUpdated', loadFavorites);
    
    return () => window.removeEventListener('favoritesUpdated', loadFavorites);
  }, []);

  // Function to navigate to the property details page
  const handleCardClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  const handleDragStart = (e, propertyId) => {
    console.log('Drag started:', propertyId); // Debug log
    e.dataTransfer.setData('text/plain', propertyId.toString());
  };

  const toggleFavorite = (propertyId) => {
    const currentFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const isCurrentlyFavorite = currentFavorites.includes(propertyId);
  
    const newFavorites = isCurrentlyFavorite
      ? currentFavorites.filter((id) => id !== propertyId)
      : [...currentFavorites, propertyId];
  
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
    window.dispatchEvent(new Event('favoritesUpdated')); // Notify other components
  };

  return (
    <div className="property-list">
      {properties.map((property) => (
        <div
          key={property.id}
          className="property-card"
          draggable="true"
          onDragStart={(e) => handleDragStart(e, property.id)}
          onClick={() => handleCardClick(property.id)} // Add the onClick to navigate
        >
          <div className="property-image-container">
            <img
              src={require(`../src${property.images[0].substring(1)}`)}
              alt={`${property.type} in ${property.location}`}
              className="property-image"
            />
            <button
              className={`favorite-button ${favorites.includes(property.id) ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the onClick of the card
                toggleFavorite(property.id);
              }}
            >
              <FaHeart />
            </button>
          </div>
          
          <div className="property-details">
            <h3>{property.type} in {property.location}</h3>
            <p className="property-price">£{property.price.toLocaleString()}</p>
            <div className="property-info">
              <span>{property.bedrooms} bed</span>
              <span>{property.tenure}</span>
            </div>
        </div>

        </div>
      ))}
    </div>
  );
};

export default PropertyList;
