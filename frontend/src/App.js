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
  const [newMovie, setNewMovie ] = useState('')
  const [loading, setLoading] = useState('true')
  const [movieUpdateName, setMovieUpdateName] = useState('')

  useEffect(() => {
    fetch('http://localhost:8081/movielist')
      .then((res) => res.json())
      .then(data => {return setMovieInfo(data), setLoading(false)})

      .catch(error=>console.log(error))
  },[])



  const handleSubmit = (e) => {
    // e.preventDefault();
    const Update = newMovie;
    console.log(Update);

    fetch('http://localhost:8081/movielist', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
              },
              body: JSON.stringify({title: Update})
    })
    .then(response => response.json()
    ).then(function (data) {
      console.log(data)
      window.location.reload();
    })
  };

  const handleUpdate = (e) => {
    const movieName = newMovie;
    const UpdateName = movieUpdateName;
    console.log(movieName, UpdateName);

    fetch(`http://localhost:8081/movielist`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
                },
                body: JSON.stringify({title: movieName, update: UpdateName})
      })
      .then(response => response.json()
      ).then(function (data) {
        console.log(data)
        window.location.reload();
      });
    };


  if (loading){
    return <p>loading</p>
  }
  return (
    
    <div className="App">

      {/* <div className='searchContainer'id="searchContainer>">
        <input className='searchInput' id="searchInput" type="text" name="search" 
          placeholder="Search..." onChange={()=>{setSearchText(document.getElementById("searchInput").value)}}></input>
      </div> */}

      <h1>Below is the list of movies</h1>
      <div>
        {movies.map(movie => {
          return (
          <p>{movie.title}</p>
          )},
        )}
      </div>


<div className='FormInput'>
                  <div className='FormHeader'>
                    <h1 className='FormTitle'>Details for new Movie</h1>
                  </div>
                  <div className='FormDetails'>
                      <form id='myForm' onSubmit = {handleSubmit}>
                            <label> Name of Movie:</label> 
                            <input
                              type='text'
                              value={ newMovie }
                              onChange={(e) => setNewMovie(e.target.value)}
                              />
                            <label> Name Change:</label> 
                            <input
                              type='text'
                              value={ movieUpdateName }
                              onChange={(e) => setMovieUpdateName(e.target.value)}
                              />
                      </form>
                            
                  </div>
                  <div className='Footer'>
                    <button className='AddBtn' onClick={() => {handleSubmit()}}>ADD</button>
                    <button className='UpdateBtn' onClick={() => {handleUpdate()}}>UPDATE</button>
                    {/* <button className='DeleteBtn' onClick={() => {handleDelete()}}>DELETE USER</button> */}
                  </div>
          </div>


    </div>
  );
}


export default App;
