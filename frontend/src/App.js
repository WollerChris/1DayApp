import react from 'react';
import './App.css';

const movies = [
  {title: 'Mean Girls'},
  {title: 'Hackers'},
  {title: 'The Grey'},
  {title: 'Sunshine'},
  {title: 'Ex Machina'},
];


function App() {
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
