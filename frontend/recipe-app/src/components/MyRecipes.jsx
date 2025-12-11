import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { HiHeart } from 'react-icons/hi';
import { HiOutlinePencilAlt } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";
import API_URL from '../config/api';
function MyRecipes() {
  const [recipes, setRecipes] = React.useState([]);
useEffect(()=>{
  const fetchMyRecipes=async()=>{
const user =JSON.parse(localStorage.getItem("user"));
if(!user)return

const {data}=await axios.get(`${API_URL}/api/recipes`)
const MyRecipes =data.filter(recipe=>recipe.createdBy===user._id)
setRecipes(MyRecipes)
  }
  fetchMyRecipes();
},[])
const onDeleteRecipe=async(id)=>{
  await axios.delete(`${API_URL}/api/recipes/${id}`)
   .then((res) => {

     console.log("Recipe deleted successfully:", res);
   });
   setRecipes(prev => prev.filter(r=> r._id !== id));
}
  return (
   <div className='recipes-container'>
         <h2>All Recipes</h2>
         <div className="cards-wrapper">
           {recipes.map((recipe,index) => (
             <div key={index} className='recipe-card'>
               <img className='w-100' src={`${API_URL}/public/images/${recipe.coverImage}`} alt={recipe.title} />
               <h4>{recipe.title}</h4>
               <p>{recipe.ingredients.join(", ")}</p>
               <small>{recipe.instructions}</small>
               <div className="icons">
                 <HiHeart />
                 <div className="mt-2 icons-down">
                 <a href={`/EditRecipe/${recipe._id}`}><HiOutlinePencilAlt className='icon' /></a>
                 <MdDeleteOutline onClick={()=>onDeleteRecipe(recipe._id)} className='icon' /></div>
               </div>
             </div>
           ))}
         </div>
       </div>
  )
}

export default MyRecipes
