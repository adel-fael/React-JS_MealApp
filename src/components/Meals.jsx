import { useGlobalContext } from "@/context/context";
import { BsHandThumbsUp } from "react-icons/bs";



const Meals = () => {

  const { loading, meals, selectMeal, addToFavorites } = useGlobalContext()

  if (loading) {
    return (
      <section className="section">
        <h4>Loading 123</h4>
      </section>
    )
  }

  if (meals.length < 1) {
    return (
      <section className="section">
        <h4>No meals matched your search term. Please Try Again</h4>
      </section>
    )
  }

  return (
    <section className="section-center">
      
      {
        meals.map(
          (singleMeal) => {
            // we destructure here
            const { 
              idMeal, strMeal: title, strMealThumb: imageUrl 
            } = singleMeal

            return (
              <article key={idMeal} className="single-meal">
                <img 
                  src={imageUrl} 
                  className="img"
                  // if we did'nt put the anonymous arrow func the selectMeal() will invoke directly when the app starts
                  onClick={() => selectMeal(idMeal)}
                />
                <footer>
                  <h5>{title}</h5>
                  <button 
                    className="like-btn"
                    onClick={() => addToFavorites(idMeal)}
                  >
                    <BsHandThumbsUp/>
                  </button>
                </footer>
              </article>
            )
          }
        )
      }
    </section>
  )
}
export default Meals