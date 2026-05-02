import React from 'react'
import { useTheme } from "../context/ThemeContext"

function Header() {
  const { dark, toggleTheme } = useTheme()
  return (
    <div className={`text-4xl font-bold text-center p-4 transition-all duration-300 ${dark ? "bg-black text-white" : "bg-blue-100 text-black"}`}>
        <h1>Wanderer - A Travel Explorer Application </h1>
    </div>
  )
}

export default Header