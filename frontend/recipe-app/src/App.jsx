import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"

import MyRecipes from "./components/MyRecipes";
import MyFavRecipes from "./components/MyFavRecipes";
import AddRecipes from "./components/AddRecipes";
import EditRecipe from "./pages/EditRecipe";
import './App.css';
import { MdAllInbox } from "react-icons/md";
import AllRecipes from "./components/AllRecipes";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/MyRecipes" element={<MyRecipes />} />
         <Route path="/MyFavRecipes" element={<MyFavRecipes />} />
         <Route path="/AddRecipes" element={<AddRecipes/>} />
         <Route path="/EditRecipe/:id" element={<EditRecipe />} />
       </Routes>
    </BrowserRouter>
    <Footer />
    <AllRecipes />

    </>
    
    
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);