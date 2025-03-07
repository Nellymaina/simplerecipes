import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const Appcontext = createContext();

export default function AppProvider({ children }) {
    const [restaurants, setRestaurants] = useState([]);
    const [user, setUser] = useState(null);
    
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

    

    
  
    useEffect(() => {
      const storedUser = localStorage.getItem("user");
    
      if (storedUser) {
        setUser(JSON.parse(storedUser)); // Load user from localStorage if available
      } else {
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
    




    
    useEffect(() => {
      const checkLogin = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/api/auth`, { withCredentials: true });
  
          if (res.data.user) {
            setUser(res.data.user);
            localStorage.setItem("user", JSON.stringify(res.data.user)); // Store user
          } else {
            setUser(null);
            localStorage.removeItem("user");
          }
        } catch (error) {
          console.error("Auth check failed:", error);
          setUser(null);
          localStorage.removeItem("user");
        }
      };
  
      checkLogin();
    }, [])
    
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
