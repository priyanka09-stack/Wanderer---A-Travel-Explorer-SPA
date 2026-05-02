import { createContext, useContext, useState } from "react"

const PlacesContext = createContext()

export const PlacesProvider = ({ children }) => {
  const [places, setplaces] = useState([])
  const [favorites, setFavorites] = useState([])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const addFavorite = (place) => {
    setFavorites((prev) => [...prev, place])
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <PlacesContext.Provider
      value={{
        places,
        setplaces,
        favorites,
        addFavorite,
        removeFavorite,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </PlacesContext.Provider>
  )
}

export const usePlaces = () => useContext(PlacesContext)