// import React from 'react';
// import { useParams } from 'react-router-dom';
// import properties from './properties.json'; // JSON file with property data
// import './PropertyCard.css';
// import { FaHeart } from 'react-icons/fa';

// const PropertyDetails = () => {
//   const { id } = useParams();
//   const property = properties.find((prop) => prop.id.toString() === id);
  
//   if (!property) {
//     return (
//       <div className="property-details-page">
//         <h2>Property not found</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="property-details-page">
//       <h2>{property.type} in {property.location}</h2>

//       {/* Image Gallery */}
//       <div className="property-image-gallery">
//         {property.images.map((image, index) => (
//           <img
//             key={index}
//             src={require(`${image}`)}
//             alt={`${property.type} ${index + 1}`}
//             className="property-gallery-image"
//           />
//         ))}
//       </div>

//       {/* Property Information */}
//       <div className="property-info">
//         <p><strong>Price:</strong> £{property.price.toLocaleString()}</p>
//         <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
//         <p><strong>Tenure:</strong> {property.tenure}</p>
//         <p><strong>Added:</strong> {property.added.day} {property.added.month} {property.added.year}</p>
//       </div>

//       {/* Property Description */}
//       <div className="property-description">
//         <h3>Description</h3>
//         <p>{property.description}</p>
//       </div>
//     </div>
//   );
// };

// export default PropertyDetails;
