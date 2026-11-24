
import { useState, useEffect } from 'react'
import axios from 'axios'
import MealCard from './components/MealCard'

function App() {
  // Level 1: State management
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  // Level 2: Search state
  const [search, setSearch] = useState('')

  // Level 3: Favorites state
  const [favorites, setFavorites] = useState([])

  // Level 1: Fetch recipes
  const fetchMeals = async () => {
    try {
      setError('')

      const response = await axios.get(
        'https://api.freeapi.app/api/v1/public/meals?page=1&limit=20'
      )

      setMeals(response.data.data.data)
      setIsLoading(false)
    } catch (err) {
      setError('Failed to load recipes. Please try again.')
      setIsLoading(false)
    }
  }

  // Fetch recipes when app loads
  useEffect(() => {
    fetchMeals()
  }, [])

  // Level 2: Filter recipes by name
  const filteredMeals = meals.filter((meal) =>
    meal.strMeal.toLowerCase().includes(search.toLowerCase())
  )

  // Level 3: Toggle favorites
  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  return (
    <div className="min-h-screen bg-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-orange-600">
              Recipe Finder
            </h1>
            <p className="text-gray-500 mt-1">
              Discover delicious recipes from around the world
            </p>
          </div>

          <div className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-semibold">
            Favorites: {favorites.length} ♥
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search recipes by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-4 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
          />
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="text-center py-16">
            <p className="text-lg text-gray-600">
              Loading recipes...
            </p>
          </div>
        )}

        {/* Error */}
        {!isLoading && error && (
          <div className="text-center py-12">
            <p className="text-red-500 font-medium">
              {error}
            </p>

            <button
              onClick={fetchMeals}
              className="mt-4 bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Recipe grid */}
        {!isLoading && !error && filteredMeals.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMeals.map((meal) => (
              <MealCard
                key={meal.idMeal}
                meal={meal}
                isFavorite={favorites.includes(meal.idMeal)}
                onToggleFavorite={() => toggleFavorite(meal.idMeal)}
              />
            ))}
          </div>
        )}

        {/* Empty search result */}
        {!isLoading && !error && filteredMeals.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl font-medium text-gray-600">
              No recipes match your search.
            </p>
            <p className="text-gray-400 mt-2">
              Try searching with a different recipe name.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm">
        Made with React, Axios & Tailwind CSS
      </footer>
    </div>
  )
}

export default App
