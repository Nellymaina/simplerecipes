import React, { useState, useContext } from "react";
import { Appcontext } from "./authorization";

export default function ReviewForm({ recipeId, onReviewAdded }) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const { user } = useContext(Appcontext);



  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!review || rating === 0 ||!user) {
      alert("Please login to add a review and select a rating.");
      return;
    }

    const newReview = {
      recipeId,
      text: review,
      rating,
    };

    // 🔹 Save the review (replace with API call)
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.push(newReview);
    localStorage.setItem("reviews", JSON.stringify(reviews));

    setReview("");
    setRating(0);
    onReviewAdded(); // Refresh reviews
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg">
      <div className="mb-4">
        <p className="text-gray-700">Rate this recipe:</p>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`cursor-pointer text-2xl ${star <= rating ? "text-yellow-500" : "text-gray-400"}`}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>
      </div>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review..."
        className="w-full p-2 border rounded-lg"
      ></textarea>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2">
        Submit Review
      </button>
    </form>
  );
}
