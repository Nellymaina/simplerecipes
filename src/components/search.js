import {React, useState, useContext, useEffect} from "react";
import {Link} from 'react-router-dom';
import {Appcontext} from './authorization'
import SearchIcon from '@mui/icons-material/Search';
import TimerIcon from '@mui/icons-material/Timer';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';


export default function Search(){
const [query, setQuery]=useState("")
const { restaurants }=useContext(Appcontext)
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


  const convertToMinutes = (timeStr) => {
    let minutes = 0;
    const hrMatch = timeStr.match(/(\d+)\s*hr/);
    const minMatch = timeStr.match(/(\d+)\s*min/);
  
    if (hrMatch) minutes += parseInt(hrMatch[1]) * 60;
    if (minMatch) minutes += parseInt(minMatch[1]);
  
    return minutes;

  };


  const result= restaurants.filter(item=> item.name.toLowerCase().includes(query.toLowerCase())).map((item, index) => (
    <div key={index} className="w-auto border-1 border-gray-100 shadow-md rounded-2xl shadow-gray-100">
      <Link to={`/recipe/${item._id}`}>
        <img className="w-full" src={item.image} alt=""/>
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

return(
  <div className='pt-[15vh] block w-[100%] p-2'>
    <div className='flex relative justify-center w-full'>

<input type='text' value={query} placeholder="search"  onChange={(e)=>setQuery(e.target.value)} className="border border-gray-300 px-4 w-[50vw] py-1 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 " />

<SearchIcon className="absolute right-[25vw] top-1/2 transform -translate-y-1/2 text-gray-400" />

</div>
{query===""? null: restaurants.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full text-lg">
              No results found
            </p>):
(<div className=" grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1 mt-[5vh]">
  result
      </div>)}</div>
    )
}