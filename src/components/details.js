import React, { useContext, useState, useEffect } from "react";
import { Appcontext } from "./authorization";
import { useParams } from "react-router-dom";
import ReviewForm from "./reviews";
import { motion, AnimatePresence } from "framer-motion";

export default function RecipeDetails() {
  const { id } = useParams();
  const { user } = useContext(Appcontext);
  const { restaurants } = useContext(Appcontext);
  const [reviews, setReviews] = useState([]);
  const [expandable, setExpandable] = useState(true);

  // Load reviews when the component mounts
  useEffect(() => {
    const allReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    setReviews(allReviews.filter((review) => review.recipeId === id));
  }, [id]);

  // Ensure restaurants is defined before searching
  const recipe = restaurants?.find((item) => item._id === id);


  // Calculate Average Rating
  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
      : "No Ratings Yet";

  return (
    <div
      className="relative h-screen  bg-cover bg-center transition-all duration-500"
      style={{ backgroundImage: `url(${recipe.image})` }}
    >
      {/* Expand/Collapse Button */}
      <button
        onClick={() => setExpandable(!expandable)}
        className="absolute top-4 right-0 bg-white text-black px-4 py-1 rounded-lg shadow-md"
      >
        {expandable ? "Hide Content" : "Show Content"}
      </button>

      {/* Expandable Content with Slide Animation */}
      <AnimatePresence>
        {expandable && (
          <motion.div

            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="h-auto absolute bg-white full mt-[80vh] p-6 shadow-lg w-full"
          >
            {/* Recipe Name */}
            <div className="flex justify-center">
              <p className="text-blue-600 text-[16px] md:text-[18px]">{recipe.name}</p>
            </div>

            {/* ⭐ Average Rating */}
            <div className="flex justify-center my-4">
              <p className="text-[14px] md:text-[16px]">{averageRating} ★</p>
            </div>

            {/* Ingredients */}
            <div className="p-6">
              <p className=" flex justify-center rounded-lg  bg-gray-900 text-[16px] md:text-lg text-red-500 font-bold pb-1">
                Ingredients
              </p>
              <ul className="pt-4 text-center">
                {recipe.ingredients.map((item, index) => (
                  <li key={index} className="text-[14px] md:text-[16px] font-extralight p-1">
                    {item.name} - <span className="font-thin text-red-500">{item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="p-6">
              <p className="flex justify-center  bg-gray-900 text-[16px] md:text-lg rounded-lg text-green-400 font-medium ">
                Instructions
              </p>
              <div className="pt-4">
                {recipe.instructions.map((item, index) => (
                  <p key={index} className="text-[14px] md:text-[16px] p-1 font-extralight">
                     - {item.description}
                  </p>
                ))}
              </div>
            </div>

            {/* Add Review Form */}
            <div className="p-6">
              <p className="flex justify-center bg-yellow-300 text-white rounded-md font-semibold text-[16px] md:text-lg mb-[5vh] pb-1">
                Add a Review
              </p>
              <ReviewForm
                recipeId={id}
                onReviewAdded={() => {
                  
                  const allReviews = JSON.parse(localStorage.getItem("reviews")) || [];
                  setReviews(allReviews.filter((review) => review.recipeId === id));
                }}
              />
            </div>

            {/* Display Reviews */}
            <div className="p-6">
              <p className="flex justify-center bg-yellow-300 rounded-md font-semibold text-[16px] md:text-lg mb-[5vh] text-white pb-1">
                Reviews
              </p>
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={index} className="p-4 border rounded-lg my-2">
                    <div className="flex items-center">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i} className="text-green-500 text-lg">★</span>
                      ))}
                      {[...Array(5 - review.rating)].map((_, i) => (
                        <span key={i} className="text-gray-400 text-lg">★</span>
                      ))}
                    </div>
                    <p className="text-gray-700">{review.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">No reviews yet. Be the first to review!</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
