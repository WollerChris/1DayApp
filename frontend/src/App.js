import react, { useState } from 'react';
import './App.css';
import { useEffect} from 'react';



function App() {

  const [movies, setMovieInfo] = useState({title: 'Mean Girls'})
  const [newMovie, setNewMovie ] = useState('')
  const [loading, setLoading] = useState('true')
  const [movieUpdateName, setMovieUpdateName] = useState('')
  const [watched, setWatched] = useState(false)
  const [searchText, setSearchText] = useState('')

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
      // window.location.reload();
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
        // window.location.reload();
      });
    };


    const handleDelete = (e) => {
      const movieName = newMovie;
      console.log(movieName);

      fetch(`http://localhost:8081/movielist`, {
           method: 'DELETE',
           headers: {
            'Content-Type': 'application/json'
                },
                body: JSON.stringify({title: movieName})
        })
        .then(response => response.json()
        ).then(function (data) {
          console.log(data)
          // window.location.reload();
        });
      };
  


  const lowerCaseHelper = () => {
    let searchItem = document.getElementById("searchInput").value;
    setSearchText(searchItem.toLowerCase())
  }

  if (loading){
    return <p>loading</p>
  }
  return (
    
    <div className="App">

      <div className='searchContainer'id="searchContainer">
         <input className='searchInput' id="searchInput" type="text" name="search" 
          placeholder="Search..." onChange={lowerCaseHelper}>
          </input>
      </div>

      <h1>Below is the list of movies</h1>

      <div>
        {console.log(movies)}
        {movies.filter(movie => movie.title.toLowerCase().startsWith(searchText))
          .map(title => (
            <div>
              <p>{title.title}</p>
            </div>
          ))
      }
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
                    <button className='DeleteBtn' onClick={() => {handleDelete()}}>DELETE</button>
                  </div>
          </div>


    </div>
  );
}


export default App;
