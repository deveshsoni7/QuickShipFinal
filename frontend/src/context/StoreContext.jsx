// context/StoreContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [rides, setRides] = useState([]);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUserId = localStorage.getItem("userId");
    if (savedToken) setToken(savedToken);
    if (savedUserId) setUserId(savedUserId);
  }, []);

  const fetchRides = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:4000/api/rides/myRides/${userId}`);
      setRides(response.data.data || []);
    } catch (error) {
      console.error("Error fetching rides: ", error);
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    token,
    setToken,
    userId,
    setUserId,
    rides,
    setRides,
    fetchRides,
    loading,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
