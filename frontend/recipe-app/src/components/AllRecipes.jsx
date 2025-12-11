import React from 'react'
import axios  from 'axios'
import { HiHeart } from 'react-icons/hi';
import { useState,useEffect } from 'react';
import API_URL from '../config/api';
function AllRecipes() {
    const [recipes, setRecipes] =useState([]);
    useEffect(()=>{
        axios.get(`${API_URL}/api/recipes`)
        .then((response) => {
            setRecipes(response.data);
        })
        .catch((error) => {
            console.error("Error fetching recipes:", error);
        });
    }, []);
  return (
    <div className='recipes-container'>
      <h2>All Recipes</h2>
      <div className="cards-wrapper">
        {recipes.map((recipe,index) => (
          <div key={index} className='recipe-card'>
            <img className='w-100' src={`${API_URL}/public/images/${recipe.coverImage}`} alt={recipe.title} />
            <h4>{recipe.title}</h4>
            <p>{recipe.ingredients.join(', ')}</p>
            <small>{recipe.instructions}</small>
            <div className="icons">
              <HiHeart />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllRecipes
