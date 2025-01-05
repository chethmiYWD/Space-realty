Property Listings and Details Application
Overview
This is a real-estate property listing and details application that allows users to view property details, navigate through property images, view floor plans, and explore maps. Users can also mark properties as favorites and access them later. The app includes a virtual tour and drag-and-drop functionality, enhancing the user experience.

Features
Property Listing: Displays a list of properties with details such as type, location, price, bedrooms, and tenure.
Property Details Page: Shows detailed information about the property, including images, floor plans, and maps.
Favorite Properties: Users can mark properties as favorites, which are saved in localStorage.
Drag-and-Drop: Users can drag property cards to perform custom actions (e.g., for future enhancements).
Map View: Displays the location of properties on a map using Leaflet.js or Google Maps API.
Floor Plan View: Allows users to view the floor plan of each property.
Responsive Design: The application is mobile-friendly and adapts to different screen sizes.
Technologies Used
React: A JavaScript library for building user interfaces.
React Router: For navigating between different pages in the app.
React Icons: For using vector icons (e.g., heart icon for favorites).
Leaflet: A mapping library for rendering interactive maps.
Google Maps API: Used for displaying maps in the PropertyDetails page.
CSS: Custom styles for the app's layout and design.
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/property-listings.git
Navigate to the project directory:

bash
Copy code
cd property-listings
Install the dependencies:

bash
Copy code
npm install
Run the application:

bash
Copy code
npm start
The app should now be available at http://localhost:3000.

File Structure
plaintext
Copy code
├── src/
│   ├── components/
│   │   ├── PropertyDetails.js
│   │   ├── PropertyList.js
│   │   ├── LeafletMap.js
│   ├── assets/
│   │   ├── floorplan1.jpg
│   │   ├── floorplan2.jpg
│   ├── data/
│   │   ├── properties.json
│   ├── App.js
│   ├── index.js
│   ├── Listings.css
│   └── PropertyDetails.css
├── public/
│   ├── index.html
└── package.json
Components
1. PropertyList.js
Description: Displays a list of properties with the ability to mark them as favorites.
Props: properties (Array of property objects)
Features:
Displays property details like type, location, price, and number of bedrooms.
Allows users to toggle favorites.
Supports drag-and-drop functionality.
2. PropertyDetails.js
Description: Displays detailed information for a selected property.
Props: id (property ID from the URL)
Features:
Displays main property image and additional photos in a gallery.
Displays floor plan image for each property.
Uses Google Maps or Leaflet to show the property’s location.
Displays property information such as price, tenure, and added date.
3. LeafletMap.js
Description: Renders the map using the Leaflet.js library.
Props:
latitude (Lat of the property)
longitude (Lng of the property)
4. properties.json
Description: A sample JSON file containing an array of properties. Each property object contains details like id, type, price, location, coordinates, images, and floorplan.
5. Listings.css & PropertyDetails.css
Description: Custom CSS files for styling the PropertyList and PropertyDetails components.
Features:
Styling for the property cards and image galleries.
Responsive design to ensure the app looks great on all screen sizes.
Key Functionalities
Property Listing Page
Viewing Properties: Users can view a list of properties with their images, type, location, price, and bedrooms. Clicking on a property card navigates to the property details page.

Adding to Favorites: The app allows users to mark properties as favorites. These preferences are saved in the browser’s localStorage and persist even after page reloads.

Property Details Page
Photos Tab: Displays the main property image and additional thumbnails for a gallery view.

Floor Plan Tab: Displays the property’s floor plan (if available). A placeholder image is shown if the floor plan is not available.

Map Tab: Displays a map (either using Google Maps or Leaflet) showing the property’s location using its latitude and longitude coordinates.

Drag-and-Drop Functionality
Users can drag property cards. This feature can be expanded for additional interactions in future versions of the app.
Responsive Design
The app is fully responsive and will adapt to mobile, tablet, and desktop screen sizes.
Development
Adding a New Property
To add a new property, follow these steps:

Add the property details in the properties.json file (in the data directory).
Ensure you include the id, type, price, location, coordinates, images, and floorplan for each property.
Restart the app to see the new property listed.
Updating Favorites
Favorites are stored in localStorage. The app listens for changes and updates the UI accordingly. You can manually update favorites or use the toggleFavorite function in PropertyList.js to add or remove properties from the favorites list.

Contributing
Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Commit your changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature/your-feature).
Create a new Pull Request.
License
This project is licensed under the MIT License - see the LICENSE file for details.

