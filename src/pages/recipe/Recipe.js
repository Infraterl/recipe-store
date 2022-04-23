import { useParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import { useNavigate } from 'react-router-dom'
import './Recipe.css'

import React from 'react';

export default function Recipe() {
  const { id } = useParams()
  const url = 'http://localhost:3000/recipes/' + id
  const { error, isPending, data: recipe } = useFetch(url)
  const navigate = useNavigate()

  const handleDelete = (e) => {
    e.preventDefault()
    fetch(url, {method: 'DELETE'})
    navigate('/')
  }

  return (
  <div className="recipe">
    {error && <p className="error">{error}</p>}
    {isPending && <p className="loading">Loading...</p>}
    {recipe && (
      <>
        <h2 className="page-title">{recipe.title}</h2>
        <p>Takes {recipe.cookingTime} to cook</p>
        <ul>
          {recipe.ingredients.map(ing=> <li key={ing}>{ing}</li>)}
        </ul>
        <p className="method">{recipe.method}</p>
        <button className="btn" onClick={handleDelete}>delete</button>
      </>
    )}
  </div>
  )
}
