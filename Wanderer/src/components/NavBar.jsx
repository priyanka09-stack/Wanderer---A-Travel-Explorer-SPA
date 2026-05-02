import React from 'react'
import { Link } from "react-router-dom"
import { useTheme } from "../context/ThemeContext"

function NavBar() {
  const { dark, toggleTheme } = useTheme()

  return (
    <nav className={dark ? "flex justify-between items-center px-6 py-4 bg-gray-900 text-white shadow-md sticky top-0 z-50 bg-black m-4 rounded -xl transition-all duration-300 rounded-xl" : "flex justify-between items-center px-6 py-4 bg-white text-gray-900 shadow-md sticky top-0 z-50 bg-white m-4 rounded -xl transition-all duration-300 rounded-xl"}>
      
      <div className="flex gap-6">
        <Link to="/" className="font-semibold transition-all duration-200 hover:text-blue-500 hover:scale-105">Home</Link>
        <Link to="/favorites" className="font-semibold transition-all duration-200 hover:text-blue-500 hover:scale-105">Favorites</Link>
        <Link to="/charts" className="font-semibold transition-all duration-200 hover:text-blue-500 hover:scale-105">Charts</Link>
      </div>

      <button 
        onClick={toggleTheme} 
        className="p-2 rounded bg-gray-800 text-white"
      >
        {dark ? "Light Mode" : "Dark Mode"}
      </button>

    </nav>
  )
}

export default NavBar