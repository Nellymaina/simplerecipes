import React, {useContext, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Appcontext} from './authorization'
import TimerIcon from '@mui/icons-material/Timer';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';


export default function Cuisines() {
  const { restaurants }=useContext(Appcontext)
  const [filter, setFilter]=useState("all")
  const [sortOrder, setSortOrder] = useState("default");
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
        <div className="flex text-yellow-500">
          {[...Array(fullStars)].map((_, i) => <StarIcon key={i} fontSize="small"/>)}
          {halfStar === 1 && <StarIcon className="opacity-50" fontSize="small" />}
          {[...Array(emptyStars)].map((_, i) => <StarBorderIcon key={i + fullStars + halfStar} fontSize="small"/>)}
        </div>
      );
    };

    let filteredRecipes = filter === "all" ? restaurants : restaurants.filter(item => item.cuisine === filter);
    const convertToMinutes = (timeStr) => {
      let minutes = 0;
      const hrMatch = timeStr.match(/(\d+)\s*hr/);
      const minMatch = timeStr.match(/(\d+)\s*min/);
    
      if (hrMatch) minutes += parseInt(hrMatch[1]) * 60;
      if (minMatch) minutes += parseInt(minMatch[1]);
    
      return minutes;
    };
    if (sortOrder === "asc") {
      filteredRecipes = [...filteredRecipes].sort((a, b) => convertToMinutes(a.duration) - convertToMinutes(b.duration));
    } else if (sortOrder === "desc") {
      filteredRecipes = [...filteredRecipes].sort((a, b) => convertToMinutes(b.duration) - convertToMinutes(a.duration));
    }
  
  return (
    <div className='h-auto p-2'>
    <div class="p-4 pt-[15vh]">
    <div class="flex flex-col md:flex-row gap-4 mb-4">
    <label class="font-medium ">Filter by Cuisine:</label>
    <select id="filter" className="border border-gray-300 p-2 roundedbg-white shadow-md" value={filter}
        onChange={(e) => setFilter(e.target.value)}>
      <option value="all">All</option>
      <option value="British">British</option>
      <option value="Indian">Indian</option>
      <option value="French">French</option>
      <option value="Jamaican">Jamaican</option>
      <option value="American">American</option>
      <option value="Malaysian">Malaysian</option>


    </select>

    <label class="font-medium">Sort by Duration:</label>
    <select id="sort" class="border border-gray-300 p-2 rounded bg-white shadow-md" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
      <option value="default">Default</option>
      <option value="asc">Shortest to Longest</option>
      <option value="desc">Longest to Shortest</option>
    </select>
  </div>

</div>
      <div className=" block sm:grid sm:grid-cols-2 md:grid-cols-5 gap-1 ">
      {filteredRecipes.filter(item=>item.category!=="Dessert" && item.category!=="Starter").map((item, index) => (
                    <div key={index} className="w-auto border-1 border-gray-100 shadow-md rounded-2xl shadow-gray-100">
                      <Link to={`/recipe/${item._id}`}>
                        <img className="w-full " src={item.image} alt=""/>
                        <div className='p-2 flex justify-between'>
                        <div className='h-auto flex align-center'>
                <TimerIcon className='text-[2px] text-pink-400'/>
              <p className="text-[12px] sm:text-[13px] text-blue-400 font-medium"> {item.duration}</p>
              </div>
                            {renderStars(getAverageRating(item._id))}
</div>

                        <div className='p-2 h-auto flex justify-center align-center font-bold'><p className="text-[16px] sm:text-[16px]">{item.name}</p></div>

                        </Link>
                        
                        </div>
                        
      )
                )
            }</div>
    </div>
  );
}
