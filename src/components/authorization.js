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
        try {
          setUser(JSON.parse(storedUser)); // Load user from localStorage if available
        } catch (error) {
          console.error("Error parsing stored user:", error);
          setUser(null);
          localStorage.removeItem("user");
        }
      } else {
        const checkLogin = async () => {
          try {
            const res = await axios.get(`${BASE_URL}/api/auth`, { withCredentials: true });
    
            // Check if user data exists before setting
            if (res.data && res.data.user) {
              setUser(res.data.user);
              localStorage.setItem("user", JSON.stringify(res.data.user));
            } else {
              throw new Error("Invalid response: Missing user data");
            }
          } catch (error) {
            console.error("Login check failed:", error);
            setUser(null);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
          }
        };
    
        checkLogin();
      }
    }, []);
    
    console.log("API Response:", res.data);

    
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
