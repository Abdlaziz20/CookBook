import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../config/api';

function EditRecipe() {
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
    await axios.put(`${API_URL}/api/recipes/${id}`, formData, {
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
const {id} = useParams();
useEffect(()=>{
const getRecipe = async () => {
 await axios.get(`${API_URL}/api/recipes/${id}`)
 .then(response=>{
    console.log("fetched recipe data", response.data);
    let res =response.data;
     setRecipe({
        title: res.title,
        ingredients: res.ingredients,
        instructions: res.instructions,
        coverImage: res.coverImage
     });
 })
}
getRecipe();

}, [id]);
  return (
    <div>

      <form  className="input-form w-50 m-auto" onSubmit={onHandleSubmit}>
        <input value={recipe.title} onChange={onHandleChange} className="form-control mt-3" type="text" name="title" id="" placeholder="Title" />
        <textarea  value={recipe.ingredients ? recipe.ingredients.join(",") : ""} onChange={onHandleChange} rows={4} className="form-control mt-3" name="ingredients" id="" placeholder="Ingredients"></textarea>
        <textarea value={recipe.instructions} onChange={onHandleChange} rows={4} className="form-control mt-3" name="instructions" id="" placeholder="Instructions"></textarea>
         <label className='mt-4'>Upload Image</label>
         <input  onChange={onHandleChange} type="file" name="coverImage" className='form-control mt-3' placeholder='Image URL' />

        <button type="submit" className="button mt-5 w-100">edit Recipe</button>
        </form>
    </div>
  )
}

export default EditRecipe;
