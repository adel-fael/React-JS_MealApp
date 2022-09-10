import { useState } from "react"
import { useGlobalContext } from "../context/context"

const Search = () => {

  const {setSearchTerm, fetchRandomMeal} = useGlobalContext()

  const [text, setText] = useState('')

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text) {
      setSearchTerm(text)
      // this is if you want to keep the text after you click in the search button
      // setText('')
    }
  }

  const handleRandomMeal = () => {
    setSearchTerm('')
    setText('')
    fetchRandomMeal()
  }
  return (
    <header className="search-container">
      <form onSubmit={handleSubmit} >
        <input 
          type="text" 
          placeholder="type your favorite meal"
          className="form-input"
          onChange={handleChange} 
          value={text}
        />
        <button 
          className="btn" 
          type="submit"
        >
          search
        </button>
        <button 
          className="btn btn-hipster"
          type="button"
          onClick={handleRandomMeal}>
          surprise me!
        </button>
      </form>
    </header>
  )
}

export default Search