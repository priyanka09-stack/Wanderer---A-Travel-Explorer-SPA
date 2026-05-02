import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useTheme } from "./context/ThemeContext"
import { Suspense, lazy } from "react"

import Header from './components/Header'
import NavBar from './components/NavBar'
import PlacesChart from './pages/PlacesChart'
import Favorites from './pages/Favorites'
import Footer from "./components/Footer"


const Home = lazy(() => import("./pages/Home"))

function App() {
  const { dark } = useTheme();

  return (
    <BrowserRouter>
      <div className={dark ? "bg-black text-white min-h-screen" : "bg-blue-100 text-black min-h-screen"}>

        <Header />
        <NavBar />

      
        <Suspense >
          <Routes>
            <Route path="/charts" element={<PlacesChart />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Suspense>
        <Footer />

      </div>
    </BrowserRouter>
  )
}

export default App