
function MealCard({ meal, isFavorite, onToggleFavorite }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-lg transition duration-300">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-56 object-cover"
      />

      <div className="p-5">
        <h2 className="text-lg font-bold text-gray-800 mb-2">
          {meal.strMeal}
        </h2>

        <p className="text-sm text-gray-500 mb-4">
          {meal.strCategory} · {meal.strArea}
        </p>

        <button
          onClick={onToggleFavorite}
          className={`w-full py-2 rounded-lg font-medium transition ${
            isFavorite
              ? 'bg-orange-500 text-white hover:bg-orange-600'
              : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
          }`}
        >
          {isFavorite ? 'Saved ♥' : 'Save ♡'}
        </button>
      </div>
    </div>
  )
}

export default MealCard
