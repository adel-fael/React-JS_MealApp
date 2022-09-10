import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"

const getFavoritesFromLocalStorage = () => {
  let favorites = localStorage.getItem('favorites')
  if (favorites) {
    favorites = JSON.parse(localStorage.getItem('favorites'))
  }
  else {
    favorites = []
  }
  return favorites
}

const AppContext = createContext()

const AppProvider = ({ children }) => {

  // For the meals Array
  const [meals, setMeals] = useState([])

  // pay attention here, look in fetchMeals()
  const [loading, setLoading] = useState(false)

  // For the search functionality
  const [searchTerm, setSearchTerm] = useState('')

  // For the modal component
  const [showModal, setShowModal] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState(null)

  // For the Favorites component, 1st set it to an empty array
  const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage())

  const allMealsUrl =
    'https://www.themealdb.com/api/json/v1/1/search.php?s='
  const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php"

  const fetchMeals = async (url) => {
    setLoading(true)
    try {
      //
      //* don't use this use destructuring
      // const res = await axios(url)
      // console.log(res.data);
      const { data } = await axios(url)
      // in case of no items or when u enter a wrong url or search unknown meal
      if (data.meals) {
        setMeals(data.meals)
      }
      else {
        setMeals([])
      }

    } catch (e) {
      console.log(e.response)
    }
    setLoading(false)
  }

  const fetchRandomMeal = () => {
    fetchMeals(randomMealUrl)
  }

  const selectMeal = (idMeal, favoriteMeal) => {
    // console.log(idMeal);
    let meal;
    if (favoriteMeal) {
      meal = favorites.find((meal) => meal.idMeal === idMeal)
    }
    else {
      meal= meals.find((meal) => meal.idMeal === idMeal)
    }

    setSelectedMeal(meal)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const addToFavorites = (idMeal) => {
    const alreadyFavorite = favorites.find((meal) => meal.idMeal === idMeal)
    
    if (alreadyFavorite) return 
    const meal = meals.find((meal) => meal.idMeal === idMeal)
    const updatedFavorites = [...favorites, meal]
    setFavorites(updatedFavorites)

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }
  const removeFromFavorites = (idMeal) => {
    const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal)
    setFavorites(updatedFavorites)

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
  }

  //you can have multiple useEffects the 1st to start when the app starts and the 2nd to for the surprise me function
  useEffect(() => {
    fetchMeals(allMealsUrl)
  }, [])

  useEffect(() => {
    if (!searchTerm) return 
    
    fetchMeals(`${allMealsUrl}${searchTerm}`)
  }, [searchTerm])

  return (
      <AppContext.Provider 
        value={
          {loading,meals,setSearchTerm,fetchRandomMeal,showModal,selectMeal,selectedMeal,closeModal,addToFavorites,removeFromFavorites,favorites}
        }
      >
        {children}
      </AppContext.Provider>
    )
}

export { AppContext, AppProvider }

//* this our custom hook to write less code
export const useGlobalContext = () => {
  return useContext(AppContext)
}
