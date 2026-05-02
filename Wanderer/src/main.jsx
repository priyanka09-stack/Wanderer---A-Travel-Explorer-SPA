import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from "./context/ThemeContext"
import { FavoritesProvider } from "./context/FavoritesContext"
import { PlacesProvider } from './context/PlacesContext.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
    <ThemeProvider>
      <FavoritesProvider>
        <PlacesProvider>
          <App />
        </PlacesProvider>
      </FavoritesProvider>
    </ThemeProvider>
  </StrictMode>
)
