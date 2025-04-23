import React, { useState } from "react";
import axios from "axios";

const LocationSearch = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchLocations = async (input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${input}`
      );
      setSuggestions(response.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const handleChange = (event) => {
    const input = event.target.value;
    setQuery(input);
    fetchLocations(input);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Enter location..."
        className="border p-2 w-full"
      />
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border w-full mt-1 shadow-lg">
          {suggestions.map((place) => (
            <li key={place.place_id} className="p-2 hover:bg-gray-200 cursor-pointer">
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationSearch;
