import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [trucks, setTrucks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTruck, setSelectedTruck] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/foodtrucks")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTrucks(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredTrucks = trucks.filter((truck) =>
    truck.Applicant.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectTruck = (truck) => {
    setSelectedTruck(truck);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Food Trucks</h1>
        <input
          type="text"
          placeholder="Search food trucks"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </header>
      <div className="content">
        <ul className="truck-list">
          {filteredTrucks.map((truck) => (
            <li
              key={truck.locationid}
              className="truck-item"
              onClick={() => handleSelectTruck(truck)}
            >
              {truck.Applicant} - {truck.Address}
            </li>
          ))}
        </ul>
        {selectedTruck && (
          <div className="truck-details">
            <h2>{selectedTruck.Applicant}</h2>
            <p><strong>Address:</strong> {selectedTruck.Address}</p>
            <p><strong>Facility Type:</strong> {selectedTruck.FacilityType}</p>
            <p><strong>Location Description:</strong> {selectedTruck.LocationDescription}</p>
            <p><strong>Permit:</strong> {selectedTruck.permit}</p>
            <p><strong>Status:</strong> {selectedTruck.Status}</p>
            <p><strong>Food Items:</strong> {selectedTruck.FoodItems}</p>
            <p><strong>Coordinates:</strong> {selectedTruck.Location}</p>
            <p><strong>Schedule:</strong> <a href={selectedTruck.Schedule} target="_blank" rel="noopener noreferrer">View Schedule</a></p>
          </div>
        )}
      </div>
    </div>
  );
}
