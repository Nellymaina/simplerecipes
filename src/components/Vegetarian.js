import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {Appcontext} from './authorization'

export default function Veg(){

    const {restaurants}=useContext(AppContext);
    return(
        
        <div>
            {restaurants.filter(item=>item.category==="Vegetarian").map((item, index) => (
    <div key={index} className="w-auto border-1 border-gray-100 shadow-md shadow-gray-100">
      <Link to={`/recipe/${item._id}`}>
        <img className="w-full " src={item.image} alt=""/>
        <div className='p-6 h-auto flex justify-center align-center'>
        <p className="text-[12px] sm:text-[14px] text-blue-500 font-medium">⏳ {item.duration}</p></div>
        <div className='p-6 h-auto flex justify-center align-center'><p className="text-[14px] sm:text-[16px]">{item.name}</p></div>

        </Link>
        
        </div>
        
)
)
}
            </div>
    )

}

