import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const Appcontext = createContext();

export default function AppProvider({ children }) {
    const [restaurants, setRestaurants] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
      const storedUser = localStorage.getItem("user");
    
      if (storedUser && storedUser !== "undefined") {
        try {
          setUser(JSON.parse(storedUser)); // Only parse valid JSON
        } catch (error) {
          console.error("Error parsing user from localStorage:", error);
          setUser(null);
          localStorage.removeItem("user"); // Remove corrupted data
        }
      }
      else {
        const checkAuth = async () => {
          try {
            const res = await axios.get(`${BASE_URL}/api/auth`, { withCredentials: true });
            setUser(res.data.user); // Save authenticated user in state
            localStorage.setItem("user", JSON.stringify(res.data.user)); // Store in localStorage
          } catch (err) {
            setUser(null); // User is not authenticated
            localStorage.removeItem("user"); // Clear localStorage if auth fails
          }
        };
    
        checkAuth();
      }
    }, []);
    
const BASE_URL="https://simplerecipesbackend.onrender.com"
    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const detailedPlaces = await axios.get(`${BASE_URL}/api/restaurants`);
                setRestaurants(detailedPlaces.data);
                console.log("mounts")
            } catch (error) {
                console.error("Error fetching restaurants:", error);
            }

        };
        fetchRestaurants();
    }, []);

    

    
  
    
    


const loginUser = (userData) => {
  setUser(userData);
  localStorage.setItem("user", JSON.stringify(userData));
};
    

    const logoutUser = () => {
        setUser(null);
        localStorage.removeItem("user");
    };


    return (
        <Appcontext.Provider value={{ restaurants, user ,loginUser, logoutUser }}>
            {children}
        </Appcontext.Provider>
    );
}
