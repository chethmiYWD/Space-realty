import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Listings.css';
import { FaHeart } from 'react-icons/fa';

const PropertyList = ({ properties }) => {  // Accept properties as a prop
  const navigate = useNavigate();

  // State to track favorite properties
  const [favorites, setFavorites] = useState(() => {
    // Retrieve favorites from localStorage (if any)
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const handleCardClick = (propertyId) => {
    navigate(`/property/${propertyId}`);
  };

  const toggleFavorite = (e, propertyId) => {
    e.stopPropagation(); // Prevent card click when clicking the heart
    const updatedFavorites = favorites.includes(propertyId)
      ? favorites.filter((id) => id !== propertyId)
      : [...favorites, propertyId];

    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="listings-grid">
      {properties.map((property) => (
        <div 
          key={property.id} 
          className="property-card"
          onClick={() => handleCardClick(property.id)}
        >
          {/* Property Image with Favorite Icon */}
          <div className="property-image-container">
            <img
              src={require(`../src${property.images[0].substring(1)}`)}
              alt={`${property.type} in ${property.location}`}
              className="property-image"
            />
            <FaHeart
              className={`favorite-icon ${favorites.includes(property.id) ? 'favorited' : ''}`}
              onClick={(e) => toggleFavorite(e, property.id)}
            />
          </div>

          {/* Property Details */}
          <div className="property-details">
            <h3>{property.type} in {property.location}</h3>
            <p>£{property.price.toLocaleString()}</p>
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