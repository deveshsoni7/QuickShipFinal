import React, { useState } from "react";
import axios from "axios";

const SearchForm = () => {
    const [fromQuery, setFromQuery] = useState("");
    const [toQuery, setToQuery] = useState("");
    const [fromSuggestions, setFromSuggestions] = useState([]);
    const [toSuggestions, setToSuggestions] = useState([]);

    // Fetch location suggestions from OpenStreetMap API
    const fetchLocations = async (query, setSuggestions) => {
        if (!query) {
            setSuggestions([]);
            return;
        }

        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
            );
            setSuggestions(response.data);
        } catch (error) {
            console.error("Error fetching locations:", error);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className="bg-white p-3 rounded-l-full shadow-lg flex items-center space-x-3 w-[70%] relative">
                
                {/* Leaving From */}
                <div className="relative flex items-center space-x-2 flex-1 border-r pr-4">
                    <span className="text-gray-500 text-lg">📍</span>
                    <input
                        type="text"
                        placeholder="Leaving from"
                        value={fromQuery}
                        onChange={(e) => {
                            setFromQuery(e.target.value);
                            fetchLocations(e.target.value, setFromSuggestions);
                        }}
                        className="outline-none text-gray-700 w-full placeholder-gray-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    />
                    {/* Stylish Dropdown for Leaving From */}
                    {fromSuggestions.length > 0 && (
                        <ul className="absolute top-full left-0 w-full bg-white border shadow-lg mt-1 rounded-xl z-10 max-h-60 overflow-auto">
                            {fromSuggestions.map((place) => (
                                <li
                                    key={place.place_id}
                                    className="flex items-center justify-between p-3 hover:bg-gray-100 cursor-pointer transition-all"
                                    onClick={() => {
                                        setFromQuery(place.display_name);
                                        setFromSuggestions([]);
                                    }}
                                >
                                    <div className="flex items-start space-x-3">
                                        
                                        <div>
                                            <p className="font-semibold">{place.display_name.split(",")[0]}</p>
                                            <p className="text-sm text-gray-500">{place.display_name}</p>
                                        </div>
                                    </div>
                                    <span className="text-gray-400">➜</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Going To */}
                <div className="relative flex items-center space-x-2 flex-1 border-r pr-4">
                    <span className="text-gray-500 text-lg">📍</span>
                    <input
                        type="text"
                        placeholder="Going to"
                        value={toQuery}
                        onChange={(e) => {
                            setToQuery(e.target.value);
                            fetchLocations(e.target.value, setToSuggestions);
                        }}
                        className="outline-none text-gray-700 w-full placeholder-gray-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    />
                    {/* Stylish Dropdown for Going To */}
                    {toSuggestions.length > 0 && (
                        <ul className="absolute top-full left-0 w-full bg-white border shadow-lg mt-1 rounded-xl z-10 max-h-60 overflow-auto">
                            {toSuggestions.map((place) => (
                                <li
                                    key={place.place_id}
                                    className="flex items-center justify-between p-3 hover:bg-gray-100 cursor-pointer transition-all"
                                    onClick={() => {
                                        setToQuery(place.display_name);
                                        setToSuggestions([]);
                                    }}
                                >
                                    <div className="flex items-start space-x-3">
                                        
                                        <div>
                                            <p className="font-semibold">{place.display_name.split(",")[0]}</p>
                                            <p className="text-sm text-gray-500">{place.display_name}</p>
                                        </div>
                                    </div>
                                    <span className="text-gray-400">➜</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Date Picker */}
                <div className="flex items-center space-x-2">
                    <span className="text-gray-500 text-lg">📅</span>
                    <input
                        type="date"
                        className="outline-none text-gray-700 bg-transparent cursor-pointer focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                    />
                </div>
            </div>

            {/* Search Button */}
            <button className="bg-[#496580] text-white px-6 py-3 mx-0 my-0 rounded-r-full font-semibold hover:bg-black transition-all duration-300">
                Search
            </button>
        </div>
    );
};

export default SearchForm;
