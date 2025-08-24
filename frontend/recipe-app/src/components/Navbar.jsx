import React from 'react'
import image_1 from '../assets/image_3.png'
import Modal from './Modal';
import InputForm from './InputForm';
import { useEffect } from 'react';



function Navbar() {
const [isNavOpen, setIsNavOpen] = React.useState(false);



    const [isOpen, setIsOpen] = React.useState(false);
    let token = localStorage.getItem("token");
    const [isLogin, setIsLogin] = React.useState(token ? true : false);
    
    useEffect(() => {
      setIsLogin(token ? true : false);
    }, [token]);
    const checklogin = () => {
      if (token) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsLogin(false);
      } else {
        setIsOpen(true);
      }
}
const closeModal = () => {
    setIsOpen(false);
  }
  const handleProtectedRoute = (e) => {
    if (!isLogin) {
      e.preventDefault();
      setIsOpen(true);
    }
  };
  return (
    <div>
        <header>
         <nav className="navbar navbar-expand-lg mt-3">
  <a className="logo" href="#">
    <img src={image_1} />
  </a>
 <button 
  className="navbar-toggler" 
  type="button" 
  onClick={() => setIsNavOpen(!isNavOpen)} 
  aria-label="Toggle navigation"
>
  <span className="navbar-toggler-icon"></span>
</button>

  <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="navbarSupportedContent">

    <ul className="navbar-nav ms-auto">
      <li className="nav-item active">
        <a className="nav-link" onClick={handleProtectedRoute} href="/">Home <span className="sr-only"></span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" onClick={handleProtectedRoute} href={isLogin ? "/MyFavourites" : "/"}>My favourites</a>
      </li>

      <li className="nav-item">
        <a className="nav-link" onClick={handleProtectedRoute} href={isLogin ? "/MyRecipes" : "/"}>My Recipes</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" onClick={handleProtectedRoute} href={isLogin ? "/Contact" : "/"}>contact</a>
      </li>
      <li className="nav-item">
        <button  onClick={checklogin}>{isLogin ? "Logout" : "Login"}</button>
      </li>
    </ul>
    
  </div>
  
</nav>
        </header>
      {(isOpen) && <Modal onClose={closeModal}> <InputForm /></Modal>}
    </div>
  )
}

export default Navbar
