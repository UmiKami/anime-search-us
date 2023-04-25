import "./styles/App.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useCallback, useRef, useState } from "react";
import { useEffect } from "react";
import AnimeCard from "./Components/AnimeCard";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Components/Navbar";
import FilterBar from "./Components/FilterBar";
import NothingFound from "./Components/NothingFound";
import useAnimeLoad from "./Hooks/useAnimeLoad";
document.title = "Anime Search | By Umikami";


function App() {
    // reset title value to original state when at home page

    const navigate = useNavigate();
    const [animeList, setAnimeList] = useState([]);
    const [offset, setOffset] = useState(0)

    // genre
    const [genre, setGenre] = useState("");
    const [year, setYear] = useState(null);
    const [type, setType] = useState("");

    
    const { animeTitle } = useParams();
    console.log(animeTitle);
    const {loading, count} = useAnimeLoad(setAnimeList, animeTitle, offset, setOffset, genre, year, type);

    const handleSubmit = (e) => {
        let inputVal = e.target.value;
        inputVal = inputVal.replace(/\//g, "⧸");

        if(inputVal.length){
            navigate(`/search/${inputVal}`);

        }else{
            navigate("/")
        }
    };

    const filterAnime = (genre, year, animeType) => {
        setGenre(genre);
        setYear(year);
        setType(animeType);
    }


    // console.log(animeList);
    const observer = useRef()

    const lastAnimePost = useCallback(node=>{
        if(loading)return
        if(observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting){
                console.log(entries[0])
                console.log(
                    "%cVisible",
                    "color: green; background: yellow; font-size: 30px"
                );
                if (offset <= count){
                    setOffset(prevOffset => prevOffset + 20)
                }
            }
        }, {threshold: 1})

        if(node) observer.current.observe(node)
    }, [loading])
    console.log("from home: ",loading);

    return (
        <div className="App">
            <div className="container mt-5">
                <Navbar />
                <form className="d-flex" role="search" >
                    <input
                        onChange={handleSubmit}
                        value={animeTitle}
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <button className="btn btn-outline-success">
                        Search
                    </button>
                </form>

                <FilterBar applyFilters={filterAnime} setOffset={setOffset}/>

                <div className="row mx-0 mt-4" style={{ maxWidth: "100%" }}>
                    {animeList.length 
                        ? animeList.map((anime, index) => {
                                if(animeList.length === index + 1){
                                    return <AnimeCard forwardRef={lastAnimePost} anime={anime} key={uuidv4()} />;
                                }else{
                                    return (
                                        <AnimeCard
                                            anime={anime}
                                            key={uuidv4()}
                                            
                                        />
                                    );
                                }
                          })
                        : <NothingFound/>}
                </div>
            </div>
        </div>
    );
}

export default App;
