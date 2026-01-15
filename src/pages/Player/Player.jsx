import React, { useEffect, useState } from 'react'
import './Player.css'
import { ArrowLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [apiData, setApiData] = useState(null)

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNzA4NDlkOWQ2Nzg3ZGQxYWMzMjgxYWZjNWFmYTMzNyIsIm5iZiI6MTc0ODc2MDM5My4zMzEsInN1YiI6IjY4M2JmNzQ5NzVmMTE3NDRkMWZkYWQ3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hSJvirA9dK1_gpo4ALOiMuJx35dpiiN4hTxyl1O60ss',
    },
  }

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then((response) => response.json())
      .then((response) => {
        console.log('Video API response:', response) // <-- Check response here
        if (response.results && response.results.length > 0) {
          setApiData(response.results[0])
        } else {
          setApiData(null)
        }
      })
      .catch((err) => console.error('Error fetching videos:', err))
  }, [id])

  return (
    <div className="player">
      <ArrowLeft size={24} color="white" onClick={() => navigate(-1)} />
      {apiData && apiData.key ? (
        <iframe
          width="90%"
          height="90%"
          src={`https://www.youtube.com/embed/${apiData.key}`}
          title="trailer"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      ) : (
        <p style={{ color: 'white', padding: '20px' }}>
          Sorry, no trailer available for this movie.
        </p>
      )}
      {apiData && (
        <div className="player-info">
          <p>{apiData.published_at ? apiData.published_at.slice(0, 10) : ''}</p>
          <p>{apiData.name}</p>
          <p>{apiData.type}</p>
        </div>
      )}
    </div>
  )
}

export default Player
