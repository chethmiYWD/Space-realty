import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import PropertyDetails from './PropertyDetails';
import PropertyList from './PropertyList';
import PropertyImage from './assets/bg-image.jpg';
import properties from './properties.json';
import Favourites from './Favourites'; // Import Favourites component
import { DatePicker } from 'react-widgets'; // Import DatePicker from react-widgets
import 'react-widgets/styles.css'; // Import styles for react-widgets
import './styles.css';

function App() {
  const [filters, setFilters] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    postcode: '',
    dateFrom: '',
    dateTo: '',
  });

  const [results, setResults] = useState(properties.properties);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const filtered = properties.properties.filter((property) => {
      const propertyDate = new Date(
        `${property.added.year}-${property.added.month}-${property.added.day}`
      );
      const fromDate = filters.dateFrom ? new Date(filters.dateFrom) : null;
      const toDate = filters.dateTo ? new Date(filters.dateTo) : null;

      return (
        (!filters.type || property.type.toLowerCase() === filters.type.toLowerCase()) &&
        (!filters.minPrice || property.price >= parseInt(filters.minPrice)) &&
        (!filters.maxPrice || property.price <= parseInt(filters.maxPrice)) &&
        (!filters.minBedrooms || property.bedrooms >= parseInt(filters.minBedrooms)) &&
        (!filters.maxBedrooms || property.bedrooms <= parseInt(filters.maxBedrooms)) &&
        (!filters.postcode ||
          property.location.toLowerCase().includes(filters.postcode.toLowerCase().trim())) &&
        (!fromDate || propertyDate >= fromDate) &&
        (!toDate || propertyDate <= toDate)
      );
    });

    if (Object.values(filters).every((value) => value === '')) {
      setResults(properties.properties); // Show all properties by default
    } else {
      setResults(filtered); // Show filtered properties
    }
  };

  const handleReset = () => {
    setFilters({
      postcode: '',
      type: '',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: '',
      dateFrom: '',
      dateTo: '',
    });
    setResults(properties.properties); // Reset results to show all properties
  };

  const handleContactFormSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully!');
  };

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={
              <div>
                {/* Home Section */}
                <section id="home" className="home-section">
                  <div className="home-content">
                    <div className="home-text">
                      <h2>Perfect way to buy your dream property</h2>
                      <p>
                        Discover properties that match your style and budget. Start your journey to
                        a perfect home today.
                      </p>
                    </div>
                    <div className="home-image">
                      <img src={PropertyImage} alt="Property" />
                    </div>
                  </div>
                </section>

                {/* Search Section */}
                <div className="search-container">
                  <h3>Search Properties</h3>
                  <form className="search-form" onSubmit={handleSearch}>
                    <input
                      type="text"
                      placeholder="Postcode Area (e.g., NW1)"
                      name="postcode"
                      value={filters.postcode}
                      onChange={handleInputChange}
                    />
                    <select name="type" value={filters.type} onChange={handleInputChange}>
                      <option value="">Type: Any</option>
                      <option value="house">House</option>
                      <option value="flat">Flat</option>
                      <option value="apartment">Apartment</option>
                      <option value="bungalow">Bungalow</option>
                      <option value="cottage">Cottage</option>
                      <option value="townhouse">Townhouse</option>
                      <option value="duplex">Duplex</option>
                      <option value="penthouse">Penthouse</option>
                    </select>
                    <input
                      type="number"
                      placeholder="Min Price (£)"
                      name="minPrice"
                      value={filters.minPrice}
                      onChange={handleInputChange}
                    />
                    <input
                      type="number"
                      placeholder="Max Price (£)"
                      name="maxPrice"
                      value={filters.maxPrice}
                      onChange={handleInputChange}
                    />
                    <input
                      type="number"
                      placeholder="Min Bedrooms"
                      name="minBedrooms"
                      value={filters.minBedrooms}
                      onChange={handleInputChange}
                    />
                    <input
                      type="number"
                      placeholder="Max Bedrooms"
                      name="maxBedrooms"
                      value={filters.maxBedrooms}
                      onChange={handleInputChange}
                    />
                    <DatePicker
                      name="dateFrom"
                      value={filters.dateFrom ? new Date(filters.dateFrom) : null}
                      onChange={(date) => setFilters({ ...filters, dateFrom: date })}
                      placeholder="Date From"
                    />
                    <DatePicker
                      name="dateTo"
                      value={filters.dateTo ? new Date(filters.dateTo) : null}
                      onChange={(date) => setFilters({ ...filters, dateTo: date })}
                      placeholder="Date To"
                    />
                    <div className="search-buttons">
                      <button type="submit" className="search-button">
                        Search
                      </button>
                      <button type="button" className="reset-button" onClick={handleReset}>
                        Reset
                      </button>
                    </div>
                  </form>
                </div>

                {/* Property Listings */}
                <section id="listings" className="listings-section">
                  <h2>Listings</h2>
                  <div className="results-count">
                    <p>Showing {results.length} properties</p>
                  </div>
                  {results.length > 0 ? (
                    <PropertyList properties={results} />
                  ) : (
                    <p>No properties matching the criteria.</p>
                  )}
                </section>

                {/* About Section */}
                <section id="about" className="about-section">
                  <div className="about-content">
                    <h2>About Us</h2>
                    <p>
                      At Space Realty, we're dedicated to helping you find your perfect home. With
                      years of experience in the property market, our team of experts provides
                      personalized service to meet your unique needs.
                    </p>
                    <div className="about-features">
                      <div className="feature">
                        <h3>Expert Guidance</h3>
                        <p>Professional advice throughout your property journey</p>
                      </div>
                      <div className="feature">
                        <h3>Wide Selection</h3>
                        <p>Extensive portfolio of properties across all price ranges</p>
                      </div>
                      <div className="feature">
                        <h3>Trusted Service</h3>
                        <p>Highly rated by our satisfied customers</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="contact-section">
                  <div className="contact-content">
                    <h2>Contact Us</h2>
                    <div className="contact-info">
                      <div className="contact-form">
                        <h3>Send us a Message</h3>
                        <form onSubmit={handleContactFormSubmit}>
                          <input type="text" placeholder="Your Name" />
                          <input type="email" placeholder="Your Email" />
                          <textarea placeholder="Your Message"></textarea>
                          <button type="submit">Send Message</button>
                        </form>
                      </div>
                      <div className="contact-details">
                        <h3>Get in Touch</h3>
                        <p>Email: info@spacerealty.com</p>
                        <p>Phone: +44 (0)20 1234 5678</p>
                        <p>Address: 123 Property Lane, London, UK</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            }
          />

          {/* Property Details Route */}
          <Route path="/property/:id" element={<PropertyDetails />} />

          {/* Favourites Route */}
          <Route path="/favourites" element={<Favourites />} />
        </Routes>

        {/* Footer */}
        <footer className="footer">
          <p>© 2024 Space Realty. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
