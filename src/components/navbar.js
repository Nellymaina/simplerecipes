import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu"; // Menu icon
import CloseIcon from "@mui/icons-material/Close";
import image from "../images/Easy2.png";
import { motion } from "framer-motion";


export default function Navbar() {
  const [toggle, setToggle] = useState(false);

  function handleMenu() {
    setToggle((prevState) => !prevState);
  }

  return (
    <div className="fixed top-0 left-0 w-full bg-black h-auto px-2 py-6 sm:p-3 flex items-center justify-between z-50">
      {/* Menu Button (Shown only on Mobile) */}
      <motion.button
        onClick={handleMenu}
        className="text-white md:hidden"
        whileTap={{ scale: 0.9, rotate: toggle ? 90 : 0 }} // Rotation effect
        transition={{ type: "spring", stiffness: 300 }}
      >
        {toggle ? <CloseIcon fontSize="medium" className="text-red-600 border-none" /> : <MenuIcon fontSize="medium" className='text-blue-600 border-none' />}
      </motion.button>

      {/* Logo - Centered on Mobile, Left on Larger Screens */}
      <div className="md:hidden absolute left-1/2 transform -translate-x-1/2">
        <img src={image} alt="Logo" className="h-[7vh] sm:h-[11vh]" />
      </div>
      <div className="hidden md:block">
        <img src={image} alt="Logo" className="h-[11vh]" />
      </div>

      {/* Navigation Menu */}
      <motion.ul
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: toggle ? 0 : -100, opacity: toggle ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`absolute top-full left-0 w-full bg-black text-white flex flex-col items-center py-4 space-y-4 transition-all duration-300 text-[14px] md:text-[16px] ${
          toggle ? "block" : "hidden"
        } md:flex md:justify-center  md:space-x-6 md:space-y-0 md:w-auto`}
      >
        
        <NavLink onClick={handleMenu} to="/" className={({ isActive }) => `pr-4 ${isActive ? "text-blue-600 font-bold" : "text-white"}`}>Home</NavLink>
        <NavLink onClick={handleMenu} to="/meals" className={({ isActive }) => `pr-4 ${isActive ? "text-blue-600 font-bold" : "text-white"}`}>Meals</NavLink>
        <NavLink onClick={handleMenu} to="/desserts" className={({ isActive }) => `pr-4 ${isActive ? "text-blue-600 font-bold" : "text-white"}`}>Desserts</NavLink>
        <NavLink onClick={handleMenu} to="/starter" className={({ isActive }) => `pr-4 ${isActive ? "text-blue-600 font-bold" : "text-white"}`}>Starter</NavLink>
        <NavLink onClick={handleMenu}to='/login'><button className='w-auto px-6 py-1 rounded-lg bg-red-600 text-white underline hover:bg-blue-600'>login</button></NavLink>
        </motion.ul>
<ul className=" hidden md:flex">
<NavLink to="/" className={({ isActive }) => `pr-4 ${isActive ? "text-blue-600 font-bold" : "text-white"}`}>Home</NavLink>
        <NavLink to="/meals" className={({ isActive }) => `pr-4 ${isActive ? "text-blue-600 font-bold" : "text-white"}`}>Meals</NavLink>
        <NavLink to="/desserts" className={({ isActive }) => `pr-4 ${isActive ? "text-blue-600 font-bold" : "text-white"}`}>Desserts</NavLink>
        <NavLink to="/starter" className={({ isActive }) => `pr-4 ${isActive ? "text-blue-600 font-bold" : "text-white"}`}>Starter</NavLink></ul>
      {/* Search Icon (Right-Aligned) */}
      <div className='flex  w-[20v]'>
      <Link to='/login'><button className='hidden md:visible w-auto px-6 py-1 rounded-lg bg-red-600 text-white underline hover:bg-blue-600'>login</button></Link>
      <Link to="/search" className="">
        <SearchIcon className="text-white ml-8" fontSize="medium" />
      </Link>
      </div>
    </div>
  );
}
