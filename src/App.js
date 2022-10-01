import "./styles/App.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useEffect } from "react";
import AnimeCard from "./Components/AnimeCard";
import { useNavigate, useParams, Link } from "react-router-dom";
import Navbar from "./Components/Navbar";

function App() {
    const navigate = useNavigate();
    const [animeList, setAnimeList] = useState([]);

    const { animeTitle, pageId } = useParams();

    const handleSubmit = (submitEvent) => {
        submitEvent.preventDefault();
        let inputVal = submitEvent.target[0].value;
        navigate(`/search/${inputVal}`);
    };

    useEffect(() => {
        console.log(
            `https://kitsu.io/api/edge/anime?page[limit]=20${
                animeTitle
                    ? "&filter[text]=" + animeTitle
                    : pageId
                    ? "page[offset]=" + pageId * 20
                    : ""
            }`
        );
        axios
            .get(
                `https://kitsu.io/api/edge/anime?page[limit]=20${
                    animeTitle
                        ? "&filter[text]=" + animeTitle
                        : pageId
                        ? "&page[offset]=" + (pageId - 1) * 20
                        : ""
                }`
            )
            .then((res) => {
                setAnimeList(res.data.data);
            })
            .catch((error) => console.log(error));
    }, [animeTitle, pageId]);

    // console.log(animeList);

    return (
        <div className="App">
            <div className="container mt-5">
                <Navbar />
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
                              return <AnimeCard anime={anime} key={uuidv4()} />;
                          })
                        : ""}
                </div>
                <nav
                    aria-label="Page navigation example"
                    className="d-flex justify-content-center"
                >
                    <ul className="pagination">
                        <li
                            className={
                                "page-item " +
                                (parseInt(pageId) === 1 && "disabled")
                            }
                        >
                            <Link
                                className="page-link"
                                to={
                                    "/page/" +
                                    (pageId > 1 ? parseInt(pageId) - 1 : 1)
                                }
                                aria-label="Previous"
                            >
                                <span aria-hidden="true">&laquo;</span>
                            </Link>
                        </li>
                        <li className="page-item">
                            <Link
                                className="page-link active"
                                to={"/page/" + (pageId ? pageId : 1)}
                            >
                                {pageId ? pageId : 1}
                            </Link>
                        </li>
                        <li className="page-item">
                            <Link
                                className="page-link"
                                to={
                                    "/page/" +
                                    (pageId ? parseInt(pageId) + 1 : 2)
                                }
                            >
                                {pageId ? parseInt(pageId) + 1 : 2}
                            </Link>
                        </li>
                        <li className="page-item">
                            <Link
                                className="page-link"
                                to={
                                    "/page/" +
                                    (pageId ? parseInt(pageId) + 2 : 3)
                                }
                            >
                                {pageId ? parseInt(pageId) + 2 : 3}
                            </Link>
                        </li>
                        <li className="page-item">
                            <Link
                                className="page-link"
                                to={
                                    "/page/" +
                                    (pageId ? parseInt(pageId) + 1 : 2)
                                }
                                aria-label="Next"
                            >
                                <span aria-hidden="true">&raquo;</span>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default App;
