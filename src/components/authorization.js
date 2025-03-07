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
      const checkLogin = async () => {
      try {
          const res = await axios.get(`${BASE_URL}/api/me`, { withCredentials: true });
          setUser(res.data.user);
      } catch (error) {
          setUser(null);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
      }
  };

  checkLogin();
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
