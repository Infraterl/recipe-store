import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import './Create.css'

export default function Create() {
  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [newIngredient, setNewIngredient] = useState('')
  const [ingredients, setIngredients] = useState([])
  const ingInput = useRef(null)
  const navigate = useNavigate()

  const { postData, data} = useFetch('http://localhost:3000/recipes', 'POST')

  const handleSubmit = (e) => {
    e.preventDefault()
    postData({ title, ingredients, method, cookingTime: cookingTime + ' minutes' })
  }

  const handleAdd = (e) => {
    e.preventDefault()
    const ing = newIngredient.trim()
    if(ing && !ingredients.includes(ing)){
      setIngredients(prevIngredients=>[...prevIngredients, ing])
    }
    setNewIngredient('')
    ingInput.current.focus()
  }

  //redirect user after submitting form
  useEffect(() => {
    if (data){
      navigate('/')
    }
  }, [data, navigate])
  

  return (
    <div className="create">
      <h2 className="page-title">Add a New Recipe</h2>

      <form onSubmit={handleSubmit}>

        <label>
          <span>Recipe title:</span>
          <input type="text" onChange={(e)=>setTitle(e.target.value)} value={title} required/>
        </label>

        <label>
          <span>Recipe ingredients:</span>
          <div className="ingredients">
            <input type="text" onChange={(e)=>setNewIngredient(e.target.value)} value={newIngredient} ref={ingInput}/>
            <button className="btn" onClick={handleAdd}>add</button>
          </div>
        </label>
        <p>Ingredients: {ingredients.map(ing => <em key={ing}>{ing}, </em>)}</p>

        <label>
          <span>method:</span>
          <textarea onChange={(e)=>setMethod(e.target.value)} value={method} required/>
        </label>

        <label>
          <span>Cooking time (minutes):</span>
          <input type="number" onChange={(e)=>setCookingTime(e.target.value)} value={cookingTime} required/>
        </label>

        <button className="btn">submit</button>

      </form>
    </div>
  );
}




