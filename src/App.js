import './App.css';
import React, {useEffect, useState} from 'react'
import Restaurants from './components/restaurants';
import {BrowserRouter,Routes,Route } from 'react-router-dom'
import AppProvider from './components/authorization';
import RecipeDetails from './components/details';
import Cuisines from './components/cuisines';
import Navbar from './components/navbar';
import Desserts from './components/desserts';
import Starter from './components/starter';
import Search from './components/search';
import Register from './components/register';
import Login from './components/login';
import ForgotPassword from './components/forgotPassword';
import ResetPassword from './components/resetPassword';
import Footer from './components/footer';
import axios from 'axios'


function App() {
const BASE_URL="https://simplerecipesbackend.onrender.com"
const [user, setUser] = useState(null); // Store logged-in user


useEffect(() => {


  const checkAuth = async () => {
    try {
      const res = await axios.get('/api/auth', { withCredentials: true });
      setUser(res.data.user); // Save user info in state
    } catch (err) {
      setUser(null); // User is not authenticated
    }
  };

  checkAuth();
}, []);




  return (
    
    <BrowserRouter basename="/simplerecipes" >
    <AppProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={< Restaurants />}></Route>
        <Route path="meals" element={<Cuisines />}></Route>
        <Route path="desserts" element={<Desserts />}></Route>
        <Route path="starter" element={<Starter />}></Route>
        <Route path="search" element={<Search/>}></Route>
        <Route path="recipe/:id" element={<RecipeDetails />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
      <Footer/>
      </AppProvider>
      </BrowserRouter>
       
  );
}

export default App;
