import { useGlobalContext } from "@/context/context";

const Modal = () => {

  const {closeModal,selectedMeal} = useGlobalContext()

  const { strMealThumb: imageURL, strMeal: title, strInstructions: text, strSource: source}=selectedMeal

  return (
    <aside className="modal-overlay"> 
      <div className="modal-container">
        <img src={imageURL} className="img modal-img" alt="meal not found"  />
        <div className="modal-content">
          <h4>{title}</h4>
          <p>Cooking Instructions</p>
          <p>{text}</p>
          <a href={source} target="_blank">Original Source</a>
          <button 
          className="btn close-btn"
          onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Modal