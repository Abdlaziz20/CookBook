import React from 'react'
import  image_2  from '../assets/image_2.png'
import "../App.css"
import AllRecipes from '../components/AllRecipes'
function Home() {
  return (
    <div>
      <section>
     <div className="left">
        <h1>Share your favorite recipes with the world!</h1>
        <p>Join our community of food lovers and share your your favorite recipes with the world whether it's a family recipe or a new creation, we want to see it.</p>
        <button>Share your recipe</button>
     </div>
      <div className="right">
        <img src={image_2} width="350px" height="350px" />
      </div>
     </section>
     <div className="bg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ff5500" fill-opacity="0.5" d="M0,160L48,165.3C96,171,192,181,288,176C384,171,480,149,576,128C672,107,768,85,864,96C960,107,1056,149,1152,160C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
     </div>
     
    </div>
  )
}

export default Home
