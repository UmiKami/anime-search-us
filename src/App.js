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
  const [prevPage, setPrevPage] = useState();

  const { animeTitle, pageId } = useParams();

  const handleChange = (input) => {
    let inputVal = input.target.value;

    if (inputVal.match(/[a-zA-Z0-9]/)) {
      // if when typing input, we are in a page, store the page number to be used later
      if (pageId) {
        setPrevPage(pageId)
      }

      navigate(`/search/${inputVal}`);
    }
    else {
      // if we store a page number, navigate to the page when the inputVal is empty, else navigate to the home page
      prevPage ? navigate(`/page/${prevPage}`) : navigate("/")
    }
  }
  
  let url = `https://kitsu.io/api/edge/anime?page[limit]=20${animeTitle
      ? "&filter[text]=" + animeTitle
      : pageId
        ? "&page[offset]=" + (pageId - 1) * 20
        : ""
      }`

  let cancelToken;
  const getAnimeList = async(url) => {
    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel("Operation canceled due to new request.")
    }

    cancelToken = axios.CancelToken.source()

    try{
      const resp = await axios.get(url, { cancelToken: cancelToken.token })
      setAnimeList(resp.data.data)
    }catch(error){
      console.log(error);
    }
  }

  useEffect(() => {

    getAnimeList(url)

    if(!animeTitle){
      console.log("Executed with url - ", url);
      getAnimeList(url)
    }
    console.log("Current url: ", url);
    console.log("Current list:", animeList);
  }, [animeTitle, pageId, prevPage, url]);

  return (
    <div className="App">
      <div className="container mt-5">
        <Navbar />
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={handleChange}
          />
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
