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
    
    
      const checkAuth = async () => {
        try {
          const res = await axios.get('/api/auth', { withCredentials: true });
          setUser(res.data.user); // Save user info in state
        } catch (err) {
          setUser(null); // User is not authenticated
        }
      };
    
      checkAuth();
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
        <Appcontext.Provider value={{ restaurants, user, loginUser, logoutUser }}>
            {children}
        </Appcontext.Provider>
    );
}
