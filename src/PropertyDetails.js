import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import properties from './new/properties.json'; // Importing property data
import './PropertyDetails.css';
import "leaflet/dist/leaflet.css";
import LeafletMap from "./LeafletMap"; // Importing the custom Leaflet map component


const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = properties.properties.find((prop) => prop.id.toString() === id);
  const [selectedImage, setSelectedImage] = useState(property?.images[0] || ''); // State for the selected property image
  const [activeTab, setActiveTab] = useState('photos');

  // Map configuration
  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const center = {
    lat: property?.coordinates?.lat || 51.5074,
    lng: property?.coordinates?.lng || -0.1278
  };

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // If the property is not found, display a "Property not found" message
  if (!property) {
    return (
      <div className="property-details-page">
        <h2>Property not found</h2>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'photos':
        return (
          <div className="property-image-gallery">
            {/* Main Image */}
            <img 
              src={require(`../src${selectedImage.substring(1)}`)} 
              alt="Selected property" 
              className="property-main-image" 
            />
            {/* Thumbnails Grid */}
            <div className="property-thumbnails">
              {Array.from({ length: 6 }, (_, index) => {
                const image = property.images[index];
                if (!image) return null;
                return (
                  <img
                    key={index}
                    src={require(`../src${image.substring(1)}`)}
                    alt={`Property view ${index + 1}`}
                    className={`property-thumbnail ${selectedImage === image ? 'active' : ''}`}
                    onClick={() => setSelectedImage(image)}
                  />
                );
              })}
            </div>
          </div>
        );
      case 'floorplan':
        return (
          <div className="floorplan-container">
            <h4>Floor Plan</h4>
            {/* Using property ID to determine floor plan image */}
            <img 
              src={require(`../src/assets/floorplan${property.id}.jpg`)}
              alt="Floor Plan"
              className="floorplan-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'path/to/placeholder-image.jpg'; 
                e.target.alt = 'Floor plan not available';
              }}
            />
          </div>
        );
      case "map":
      return (
        <div className="map-container">
          {/* Leaflet map component with the property's coordinates */}
          <LeafletMap
            latitude={property?.coordinates?.lat || 51.5074}
            longitude={property?.coordinates?.lng || -0.1278}
          />
        </div>
      );
      default:
        return null;
    }
  };

  return (
    <div className="property-details-page">
      {/* Back Button */}
      <button className="back-button-details-page" onClick={() => navigate(-1)}>
        Go Back
      </button>

      <h2>{property.type} in {property.location}</h2>

      {/* Navigation Tabs */}
      <div className="property-nav-tabs">
        <button 
          className={`tab-button ${activeTab === 'photos' ? 'active' : ''}`}
          onClick={() => setActiveTab('photos')}
        >
          Photos
        </button>
        <button 
          className={`tab-button ${activeTab === 'floorplan' ? 'active' : ''}`}
          onClick={() => setActiveTab('floorplan')}
        >
          Floor Plan
        </button>
        <button 
          className={`tab-button ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => setActiveTab('map')}
        >
          Map
        </button>
      </div>

      {/* Content Area */}
      <div className="property-content-area">
        {renderContent()}
      </div>

      {/* Property Information */}
      <div className="property-info">
        <p><strong>Price:</strong> £{property.price.toLocaleString()}</p>
        <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
        <p><strong>Tenure:</strong> {property.tenure}</p>
        <p><strong>Added:</strong> {property.added.day} {property.added.month} {property.added.year}</p>
      </div>

      {/* Property Description */}
      <div className="property-description">
        <h3>Description</h3>
        <p>{property.description}</p>
      </div>
    </div>
  );
};

export default PropertyDetails;