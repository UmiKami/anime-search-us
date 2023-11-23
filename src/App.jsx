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
import FeedbackReport from "./Components/FeedbackReport";
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
    const [sortOrder, setSortOrder] = useState("-")

    // feedback loop
    const [issueDescription, setIssueDescription] = useState("")
    const [sendReport, setSendReport] = useState(false)
    
    const { animeTitle } = useParams();
    // console.log(animeTitle);
    const {loading, count} = useAnimeLoad(setAnimeList, animeTitle, offset, setOffset, genre, year, type, sortOrder);

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


    const observer = useRef()

    const lastAnimePost = useCallback(node=>{
        if(loading)return
        if(observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting){
                if (offset <= count){
                    setOffset(prevOffset => prevOffset + 20)
                }
            }
        }, {threshold: 1})

        if(node) observer.current.observe(node)
    }, [loading])
   



    return (
        <div className="App">
            <section className="feedback-report">
                <FeedbackReport
                    description={issueDescription}
                    sendReport={sendReport}
                    setSendReport={setSendReport}
                />
                <div
                    className="modal fade"
                    id="reportForm"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabindex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1
                                    className="modal-title fs-5"
                                    id="staticBackdropLabel"
                                >
                                    Bug Report Form
                                </h1>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form
                                    className="d-flex flex-column align-items-start"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        setSendReport(true);
                                    }}
                                >
                                    <label htmlFor="issue" className="mb-3">
                                        Describe Bug
                                    </label>
                                    <textarea
                                        name="issue"
                                        id="issue"
                                        className="col-12"
                                        rows="10"
                                        value={issueDescription}
                                        onChange={(e) =>
                                            setIssueDescription(e.target.value)
                                        }
                                    />
                                    <div className="d-flex gap-2 mt-2 align-self-end">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            data-bs-dismiss="modal"
                                        >
                                            Close
                                        </button>
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            data-bs-dismiss="modal"
                                        >
                                            Send
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container mt-5">
                <Navbar version="alpha" />
                <form className="d-flex" role="search">
                    <input
                        onChange={handleSubmit}
                        value={animeTitle}
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <button className="btn btn-outline-success">Search</button>
                </form>

                <FilterBar
                    applyFilters={filterAnime}
                    setOffset={setOffset}
                    setSortOrder={setSortOrder}
                    sortOrder={sortOrder}
                />

                <div className="row mx-0 mt-4" style={{ maxWidth: "100%" }}>
                    {animeList.length ? (
                        animeList.map((anime, index) => {
                            if (animeList.length === index + 1) {
                                return (
                                    <AnimeCard
                                        forwardRef={lastAnimePost}
                                        anime={anime}
                                        key={uuidv4()}
                                    />
                                );
                            } else {
                                return (
                                    <AnimeCard anime={anime} key={uuidv4()} />
                                );
                            }
                        })
                    ) : (
                        <NothingFound />
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
