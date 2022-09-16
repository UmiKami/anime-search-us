import './App.css';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

function App() {
  const [animeList, setAnimeList] = useState([]);

  const handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();
    let inputVal = submitEvent.target[0].value;

    axios.get(`https://kitsu.io/api/edge/anime?filter[text]=${inputVal}`)
      .then(res => {
        console.log(res.data.data)
        setAnimeList(res.data.data)
      })
      .catch(error => console.log(error))
  }

  return (
    <div className="App">
      <div className="container mt-5">
        <form className="d-flex" role="search" onSubmit={handleSubmit}>
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>

        <div className="row mx-0 mt-4" style={{maxWidth: "100%"}}>
          {
            animeList.length !== 0 ? animeList.map((anime) => {
              return (
                <div className="d-flex flex-column col-3 mb-4" key={uuidv4()}>
                  <img src={anime.attributes.posterImage.medium} alt="anime poster" />
                  <p>{Object.values(anime.attributes.titles)[0]}</p>
                </div>
              )
            })
              : ""
          }
        </div>

      </div>
    </div>
  );
}

export default App;
