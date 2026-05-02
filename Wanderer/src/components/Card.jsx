import React from "react"
import { useFavorites } from "../context/FavoritesContext"

function Card({ place }) {
  if (!place || !place.properties) return null

  const { addFavorite } = useFavorites()

  const name = place.properties.name || "No Name"
  const kind = place.properties.kinds
    ? place.properties.kinds.split(",")[0]
    : "No Kind"

  return (
    <div className="border rounded-xl p-4 shadow-md m-2 hover:scale-105 transition">
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-sm text-gray-600">{kind}</p>

      <button onClick={() => addFavorite(place)}className="mt-2 bg-pink-500 text-white px-2 py-1 rounded">❤️ Favorite</button>
    </div>
  )
}

export default Card
