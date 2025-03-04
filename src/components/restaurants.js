import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Appcontext } from "./authorization";
import { motion } from "framer-motion";
import TimerIcon from '@mui/icons-material/Timer';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function Restaurants() {
  const { restaurants } = useContext(Appcontext);
  const [expanded, setExpanded] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const allReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    setReviews(allReviews);
  }, []);

  const getAverageRating = (recipeId) => {
    const recipeReviews = reviews.filter(review => review.recipeId === recipeId);
    if (recipeReviews.length === 0) return 0;
    return (recipeReviews.reduce((acc, curr) => acc + curr.rating, 0) / recipeReviews.length).toFixed(1);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    return (
      <div className="flex text-green-300">
        {[...Array(fullStars)].map((_, i) => <StarIcon key={i} fontSize="small"/>)}
        {halfStar === 1 && <StarIcon className="opacity-50" fontSize="small" />}
        {[...Array(emptyStars)].map((_, i) => <StarBorderIcon key={i + fullStars + halfStar} fontSize="small"/>)}
      </div>
    );
  };

  const convertToMinutes = (timeStr) => {
    let minutes = 0;
    const hrMatch = timeStr.match(/(\d+)\s*hr/);
    const minMatch = timeStr.match(/(\d+)\s*min/);
    
    if (hrMatch) minutes += parseInt(hrMatch[1]) * 60;
    if (minMatch) minutes += parseInt(minMatch[1]);
    
    return minutes;
  };

  return (
    <div className="w-full min-h-screen pt-[10vh] md:pt-[15vh] bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <div className="text-center py-[20vh] bg-cover bg-center relative" style={{ backgroundImage: "url('https://zahramediagroup.com/wp-content/uploads/2021/09/Blog-september.jpg')" }}>
        <div className="bg bg-opacity-1 py-10 px-4">
          <h1 className="text-4xl font-bold text-white mb-4">Discover Your Next Favorite Meal</h1>
          <p className="text-lg text-gray-200">Find quick and delicious recipes tailored to your taste.</p>
          <Link to='/meals'><button className="mt-4 bg-green-100 p-4 rounded-2xl hover:bg-yellow-600 font-semibold">Explore Now</button>
        </Link></div>
      </div>
      
      {/* Quick Fix Section */}
      <div className="flex items-center justify-center py-8">
        <h2 className="text-3xl font-bold text-purple-600">Quick </h2>
        <h2 className="text-3xl font-bold text-pink-500 ml-2">Fix</h2>
        <p className="text-lg text-gray-600 ml-4">(~30 mins or less)</p>
      </div>
      
      {/* Restaurants Grid */}
      <div className="px-4 lg:px-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {restaurants.filter((item) => convertToMinutes(item.duration) <= 30).map((item, index) => (
          <motion.div 
            key={index} 
            className="bg-white rounded-lg shadow-lg overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            
            <Link to={`/recipe/${item._id}`}>
              <motion.img className="w-full h-40 object-cover" src={item.image} alt={item.name} 
                whileHover={{ scale: 1.1 }} 
                transition={{ duration: 0.3 }}
              />
              <div className="p-4 flex items-center">
                <TimerIcon className='text-pink-400 mr-2' />
                <p className="text-sm text-blue-400">{item.duration}</p>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      
      {/* Category Expandable Grid */}
      <div className="flex justify-center my-6">
        <motion.button 
          className="mx-2 px-6 py-2 bg-green-500 text-white font-bold rounded-lg shadow-lg hover:bg-green-600 transition-transform transform hover:scale-110"
          onClick={() => setExpanded(expanded === "left" ? null : "left")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >Vegetarian</motion.button>
        <motion.button 
          className="mx-2 px-6 py-2 bg-red-500 text-white font-bold rounded-lg shadow-lg hover:bg-red-600 transition-transform transform hover:scale-110"
          onClick={() => setExpanded(expanded === "right" ? null : "right")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >Non-Vegetarian</motion.button>
      </div>
      
      <div className="px-4 lg:px-20 grid grid-cols-2 md:grid-cols-5 gap-4">
        {expanded === "left" && restaurants.filter(item => item.category === "Vegetarian").map((item, index) => (
          <motion.div 
            key={index} 
            className="bg-white rounded-lg shadow-md overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Link to={`/recipe/${item._id}`}>
              <motion.img className="w-full h-60 object-cover" src={item.image} alt={item.name} 
                whileHover={{ scale: 1.1 }} 
                transition={{ duration: 0.3 }}
              />
                 {renderStars(getAverageRating(item._id))}

              <div className="p-4 text-center font-semibold">{item.name}</div>
            </Link>
          </motion.div>
        ))}
        {expanded === "right" && restaurants.filter(item => item.category !== "Vegetarian").map((item, index) => (
          <motion.div 
            key={index} 
            className="bg-white rounded-lg shadow-md overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Link to={`/recipe/${item._id}`}>
              <motion.img className="w-full h-60 object-cover" src={item.image} alt={item.name} 
                whileHover={{ scale: 1.1 }} 
                transition={{ duration: 0.3 }}
              />
                {renderStars(getAverageRating(item._id))}

              <div className="p-4 text-center font-semibold">{item.name}</div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
