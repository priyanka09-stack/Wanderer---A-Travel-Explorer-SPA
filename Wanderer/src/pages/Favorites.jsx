import React from "react"
import Card from "../components/Card"
import { useFavorites } from "../context/FavoritesContext"
import { useTheme } from "../context/ThemeContext"

function Favorites() {
  const { favorites, removeFavorite } = useFavorites()
  const { dark } = useTheme()

  return (
    <div className={dark ? "bg-black text-white min-h-screen p-4" : "bg-blue-100 text-black min-h-screen p-4"}>
      
      <h2 className="text-2xl font-bold mb-4">Your Favorite Places ❤️</h2>

      {favorites.length === 0 ? (
        <p>No Favorites Added Yet </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {favorites.map((place, index) => (
            <div key={index}>
              <Card place={place} />
              <button onClick={() => removeFavorite(place.id)}className="mt-2 p-2 bg-red-500 text-white rounded">Remove ❌</button>
            </div>
          ))}

        </div>
      )}
    </div>
  )
}

export default Favorites