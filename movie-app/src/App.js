import React, {useEffect, useState} from 'react';
import './App.css';
import MovieBox from './MovieBox';

const API_URL="https://api.themoviedb.org/3/movie/popular?api_key=089b617253e47ebe55e8aeef2a65814f";
function App() {

  const [movies, setMovies]=useState([]);
 
  useEffect(() => {
    fetch(API_URL)
    .then((res)=>res.json())
    .then(data=>{
      console.log(data);
      setMovies(data.results)
    })
  }, [])

  return (
    <div >
      {movies.map((movieReq)=>
      <MovieBox key={movieReq.id} {...movieReq}/>)}
    </div>
  );
}

export default App;
