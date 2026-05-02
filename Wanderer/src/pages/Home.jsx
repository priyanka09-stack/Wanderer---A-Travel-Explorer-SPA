import {useState} from 'react'
import React from 'react'
import Card from '../components/Card'
import { useTheme } from "../context/ThemeContext"
import { usePlaces } from "../context/PlacesContext"



function Home() {
    const[city,setcity] = useState("")
    const { places, setplaces } = usePlaces()
    const [currentpage ,setcurrentpage]=useState(1)
    const [filter,setfilter]=useState('all')
    const itemsperpage =6
    const startindex=(currentpage-1)*itemsperpage
    const { dark } = useTheme()
    const [favorites, setFavorites] = useState([])
    const addFavorite = (place) => {setFavorites((prev) => [...prev, place])}
    const removeFavorite = (id) => {setFavorites((prev) => prev.filter(p => p.id !== id))}
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    
    
    const filteredplaces = places.filter((place) => {
                if (filter === 'all') return true
                return place.properties.kinds?.includes(filter)
            })
    const [sort,setsort]=useState("None")
    const sortedplaces = [...filteredplaces].sort((a, b) => {if (sort === "rating") {
        return (b.properties.rate || 0) - (a.properties.rate || 0)
    }return 0})

    const currentplaces=sortedplaces.slice(startindex,startindex+itemsperpage)
    

    const handleSubmit=(e)=>{e.preventDefault()
        handleSearch()
    }

    const handleSearch=async()=>{
        setLoading(true)
        

        const url = `https://opentripmap-places-v1.p.rapidapi.com/en/places/geoname?name=${city}&country=IN`;
        try{
            const API_KEY="aa29c66804mshb4ac65bc8ff4c11p1d408bjsnb416c64a2081"
            const response=await fetch(url, {
                headers: {
                    "x-rapidapi-host": "opentripmap-places-v1.p.rapidapi.com",
                    "X-RapidAPI-Key": API_KEY
                    
                }
            })
            const data= await response.json()
            console.log(data)

            if (!data || !data.lat || !data.lon) {setError("City not found ")
                setPlaces([])
                
            return
        }


            const lat=data.lat
            const lon=data.lon


            const placesurl=`https://opentripmap-places-v1.p.rapidapi.com/en/places/radius?radius=3000&lon=${lon}&lat=${lat}`
            const placeResponse=await fetch(placesurl,{
                headers:{
                    "x-rapidapi-host": "opentripmap-places-v1.p.rapidapi.com",
                    "X-RapidAPI-Key": API_KEY,
                }
            })
            const placesdata =await placeResponse.json()
            console.log(placesdata)

            setplaces(placesdata.features)
            setcurrentpage(1)
        }catch (err) {setError("Failed to load places. Try again!")

        }finally{
            setLoading(false)
        }
        
    }




  return (
    <div className={dark ? "bg-black text-white min-h-screen" : "bg-blue-100  text-black min-h-screen"}>

        
        
        <form onSubmit={handleSubmit}className="flex flex-col md:flex-row gap-3 items-center justify-center my-6">
            <input type="text"placeholder="Search City"value={city} onChange={(e)=>setcity(e.target.value)}className="w-full md:w-1/3 px-4 py-2 rounded-xl border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"/>
            <button type="submit"className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl transition-all" >Search</button>

        </form>

        {error && <div className="text-center text-red-500 font-semibold my-2 bg-red-100 p-2 rounded">{error}</div>}

        {loading && (
         <div className="text-center text-blue-500 font-semibold my-4">
         Loading places... ⏳
        </div>)}

        

        <div className="flex flex-wrap gap-3 justify-center my-4">
            <button onClick={()=>{setfilter("all"); setcurrentpage(1)}} className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700">All</button>
            <button onClick={()=>{setfilter("museum"); setcurrentpage(1)}} className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700">Museums</button>
            <button onClick={()=>{setfilter("park"); setcurrentpage(1)}} className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700">Parks</button>

        </div>

        <div className="flex flex-wrap justify-center gap-3 my-4">
            <button onClick={()=>setsort("rating")}className="px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition shadow">Sort By Rating</button>
            <button onClick={()=>setsort("None")}className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700">No Sort</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {currentplaces.map((place, index) => (
                <Card key={index} place={place}/>
                    
               
            ))}

        </div>

        <div className="flex justify-center gap-4 my-6">
            <button onClick={()=>setcurrentpage(currentpage-1)} disabled={currentpage===1}  className="px-4 py-2 bg-gray-300 rounded disabled:opacity-100 ">Previous</button>
            <button onClick={()=>setcurrentpage(currentpage+1)}className="px-4 py-2 bg-blue-500 text-white rounded">Next</button>
        </div>

            
    </div>
  )
}

export default Home