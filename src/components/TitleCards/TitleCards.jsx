import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import { useNavigate } from 'react-router-dom'

const Titlecards = ({ title, category }) => {
  const cardsRef = useRef()
  const [apiData, setApiData] = useState([])
  const navigate = useNavigate()

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZWIzNmY0ZWQyYmQ3YWFhOGViMDUzYmU1YWY2MWQ1NyIsIm5iZiI6MTczOTYyMDAzMi4wNjMsInN1YiI6IjY3YjA3ZWMwYjFiZDJmNmU5ZjM1YWEzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SCQSheOMl6ETF8QutXuhAi3Pxa8iJ1D3D8oo3QtMqbc',
    },
  }

  const handleWheel = (event) => {
    event.preventDefault()
    cardsRef.current.scrollLeft += event.deltaY
  }

  const handleCardClick = (id) => {
    console.log('Clicked movie ID:', id) 
    navigate(`/player/${id}`)
  }

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${category || 'now_playing'}?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        console.log('Movie API results:', res.results) 
        if (res.results) {
          setApiData(res.results)
        }
      })
      .catch((err) => console.error('Error fetching movies:', err))

    if (cardsRef.current) {
      cardsRef.current.addEventListener('wheel', handleWheel)
    }
    return () => {
      if (cardsRef.current) {
        cardsRef.current.removeEventListener('wheel', handleWheel)
      }
    }
  }, [category])

  return (
    <div className="title-cards">
      <h2>{title || 'Popular'}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card) => (
          <div
            className="card"
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src={
                card.backdrop_path
                  ? `https://image.tmdb.org/t/p/w500${card.backdrop_path}`
                  : '/placeholder-image.jpg'
              }
              alt={card.original_title || 'Movie poster'}
            />
            <p>{card.original_title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Titlecards
