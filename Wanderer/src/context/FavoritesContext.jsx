import React, { createContext, useContext, useState } from "react"

const FavoritesContext = createContext()

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])

  const addFavorite = (place) => {
    setFavorites((prev) => [...prev, place])
  }

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

const useFavorites = () => {
  return useContext(FavoritesContext)
}

export { FavoritesProvider, useFavorites }