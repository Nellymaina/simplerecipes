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
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser) {
            setUser(parsedUser);
          }
        } catch (error) {
          console.error("Error parsing stored user:", error);
          setUser(null);
          localStorage.removeItem("user");
        }
      } else {
        const checkLogin = async () => {
          try {
            const res = await axios.get(`${BASE_URL}/api/auth`, { withCredentials: true });
    
            console.log("API Response:", res.data); // Debug API response
    
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
