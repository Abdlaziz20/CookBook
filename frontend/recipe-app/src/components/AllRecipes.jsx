import React from 'react'
import axios  from 'axios'
import { useState,useEffect } from 'react';
function AllRecipes() {
    const [recipes, setRecipes] =useState([]);
    useEffect(()=>{
        axios.get("http://localhost:5000/api/recipes")
        .then((response) => {
            setRecipes(response.data);
        })
        .catch((error) => {
            console.error("Error fetching recipes:", error);
        });
    }, []);
  return (
    <div>
     {Array.isArray(recipes) && recipes.length > 0 ? (
        recipes.map((recipe, index) => (
          <div key={recipe._id || index}>
            <h4>{recipe.title}</h4>
            <p>
              {Array.isArray(recipe.ingredients)
                ? recipe.ingredients.join(", ")
                : String(recipe.ingredients || "Pas d’ingrédients")}
            </p>
            <small>{recipe.instructions}</small>
          </div>
        ))
      ) : (
        <p>Aucune recette trouvée</p>
      )}
    </div>
  );
}

export default AllRecipes
