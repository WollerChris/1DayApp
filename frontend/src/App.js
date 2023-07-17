import react, { useState } from 'react';
import './App.css';
import { useEffect} from 'react';

// const movies = [
//   {title: 'Mean Girls'},
//   {title: 'Hackers'},
//   {title: 'The Grey'},
//   {title: 'Sunshine'},
//   {title: 'Ex Machina'},
// ];


function App() {

  const [movies, setMovieInfo] = useState({})

  useEffect(() => {
    fetch('http://localhost:8081/movielist')
      .then((res) => res.json())
      .then(data => {setMovieInfo(data)})
      .catch(error=>console.log(error))
  },[])


  console.log(movies)

  return (
    <div className="App">
      <h1>Below is the hard coded list of movies</h1>
      {movies.map(movie => {
        return (
        <p>{movie.title}</p>
        )
      })}

    </div>
  );
}

export default App;
