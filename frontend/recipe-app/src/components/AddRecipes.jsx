import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config/api';

function AddRecipes() {
    const navigate = useNavigate();
const [recipe ,setRecipe]=useState({});
const onHandleChange = (e) => {
   console.log(e.target.files ? e.target.files[0] : e.target.value);

  let value;
  if (e.target.name === "ingredients") {
    // نحول النص إلى array
    value = e.target.value.split(",");
  } else if (e.target.name === "coverImage") {
    // نخزن الـ file object
    value = e.target.files[0];
  } else {
    value = e.target.value;
  }

  setRecipe(prev => ({ ...prev, [e.target.name]: value }));
  console.log(recipe); // ⚠️ هذا يطبع القيمة القديمة موش الجديدة
  }
const onHandleSubmit = async (e) => {
    e.preventDefault();
   try{
    const formData=new FormData();
    formData.append("title", recipe.title);
    formData.append("ingredients", JSON.stringify(recipe.ingredients));
    formData.append("instructions", recipe.instructions);
    if(recipe.coverImage) {
        formData.append("coverImage", recipe.coverImage);
    }
    console.log("sending recipe data",recipe)
    await axios.post(`${API_URL}/api/recipes/`, formData, {
       headers: {
           "Content-Type": "multipart/form-data",
           'Authorization': `Bearer ${localStorage.getItem("token")}`
       }
       
   })
   navigate("/");

  }catch(err){
   console.error("Error adding recipe:", err);
   alert("Error adding recipe");
}
}    
  return (
    <div>

      <form  className="input-form w-50 m-auto" onSubmit={onHandleSubmit}>
        <input onChange={onHandleChange} className="form-control mt-3" type="text" name="title" id="" placeholder="Title" />
        <textarea onChange={onHandleChange} rows={4} className="form-control mt-3" name="ingredients" id="" placeholder="Ingredients"></textarea>
        <textarea onChange={onHandleChange} rows={4} className="form-control mt-3" name="instructions" id="" placeholder="Instructions"></textarea>
         <label className='mt-4'>Upload Image</label>
         <input onChange={onHandleChange} type="file" name="coverImage" className='form-control mt-3' placeholder='Image URL' />

        <button type="submit" className="button mt-5 w-100">Add Recipe</button>
        </form>
    </div>
  )
}

export default AddRecipes
