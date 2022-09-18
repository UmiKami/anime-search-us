import "./App.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import AnimeCard from "./Components/AnimeCard";

function App() {
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(false);



    const handleSubmit = (submitEvent) => {
        setLoading(true);
        submitEvent.preventDefault();
        let inputVal = submitEvent.target[0].value;

        axios
            .get(
                `https://kitsu.io/api/edge/anime?page[limit]=20&filter[text]=${inputVal}`
            )
            .then((res) => {
                setAnimeList(res.data.data);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        axios
            .get("https://kitsu.io/api/edge/anime?page[limit]=20")
            .then((res) => {
                setAnimeList(res.data.data);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);

    console.log(animeList);

    return (
        <div className="App">
            <div className="container mt-5">
                <h1 className="mb-5 text-success">Anime Search</h1>

                <form className="d-flex" role="search" onSubmit={handleSubmit}>
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <button className="btn btn-outline-success" type="submit">
                        Search
                    </button>
                </form>

                <div className="row mx-0 mt-4" style={{ maxWidth: "100%" }}>
                    {animeList.length !== 0
                        ? animeList.map((anime) => {
                              return (
                                <AnimeCard loading={loading} anime={anime}/>
                              );
                          })
                        : ""}
                </div>
            </div>
        </div>
    );
}

export default App;
