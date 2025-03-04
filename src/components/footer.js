import React from 'react';
import {Link} from 'react-router-dom'
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer(){
    return(
    <div class="bg-gray-900 text-white py-10 px-5">
  <div class="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
    <div>
        <h2 className="text-xl font-semibold">Socials</h2>
      <FacebookIcon className="text-blue-500" />
      <XIcon className="text-black"/>
<InstagramIcon className="text-red-500" />
    </div>
    
    <div>
      <h2 class="text-xl font-semibold">Quick Links</h2>
      <ul class="mt-2 space-y-2">
        <li><Link to="/" class="text-gray-400 hover:text-white">Home</Link></li>
        <li><Link to="/meals" class="text-gray-400 hover:text-white">Meals</Link></li>
        <li><Link to="/desserts" class="text-gray-400 hover:text-white">Desserts</Link></li>
        <li><Link to="/starter" class="text-gray-400 hover:text-white">Starter</Link></li>
      </ul>
    </div>
    
    <div>
      <h2 class="text-xl font-semibold">Contact</h2>
      <p class="text-gray-400 mt-2">Email: <a href="mailto:your@email.com" class="hover:text-white">easyrecipes@gmail.com</a></p>
      <p class="text-gray-400">Phone: +254 0700 070 070</p>
    </div>
    
    <div>
      <h2 class="text-xl font-semibold">Subscribe to Newsletter</h2>
      <form class="mt-2">
        <input type="email" placeholder="Enter your email" class="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none"/>
        <button class="mt-2 w-full bg-blue-600 py-2 rounded hover:bg-blue-500">Subscribe</button>
      </form>
    </div>
  </div>
  
  <div class="mt-10 text-center border-t border-gray-700 pt-5">
    
    <p class="text-gray-500 mt-3">&copy; 2025 easyrecipes. All rights reserved.</p>
  </div>
</div>
)}