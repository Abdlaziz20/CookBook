import React from 'react'
import image_1 from '../assets/image_3.png'

function Navbar() {
  return (
    <div>
        <header>
            <nav className='navbar'> 
                <div className="logo">
                    <img src={image_1} alt="logo" />
                </div>
                <ul className='nav-links'>
                    <li><a href="/">Home</a></li>
                    <li><a href="/recipes">Recipes</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    </div>
  )
}

export default Navbar
