import { useGlobalContext } from '@/context/context'


const Favorites = () => {
  const { favorites, selectMeal, removeFromFavorites } = useGlobalContext()

  return (
    <section className="favorites">
      <div className="favorites-content">
        <h5>Favorites</h5>
        <div className="favorites-container">
          {
            favorites.map((item) => {
              const { idMeal, strMealThumb: imageURL } = item;

              return (
                <div key={idMeal} className="favorite-item" >
                  <img 
                    src={imageURL} 
                    className="favorites-img img"
                    onClick={() => selectMeal(idMeal, true)} />
                  <button 
                    className='remove-btn'
                    onClick={() => removeFromFavorites(idMeal)}
                  >
                  Remove
                  </button>
                </div>
              )
            })
          }
        </div>
      </div>
    </section>
  )
}

export default Favorites