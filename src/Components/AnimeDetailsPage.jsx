import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const AnimeDetailsPage = () => {
    const { animeId } = useParams();
    const [animeData, setAnimeData] = useState([]);

    useEffect(() => {
        axios
            .get(`https://kitsu.io/api/edge/anime/${animeId}`)
            .then((res) => {
                setAnimeData(res.data.data);
            })
            .catch((error) => console.log(error));
    }, [animeId]);

    console.log(animeData);

    return (
        <>
            <Link to={"/"} style={{ textDecoration: "none", cursor: "pointer" }} className="text-center mt-5">
                <h1 className="mb-5 text-success">Anime Search</h1>
            </Link>
            <div className="container d-flex">
                {animeData.length !== 0 ? (
                    <>
                        <div className="summary">
                            <img
                                src={animeData.attributes.posterImage.large}
                                alt="anime poster"
                            />
                            <p className="fs-4 text-success">
                                Rating:{" "}
                                {animeData.attributes.averageRating
                                    ? animeData.attributes.averageRating
                                    : "No rating available"}
                            </p>
                        </div>

                        <div className="anime-description">
                            <h1>
                                {Object.values(animeData.attributes.titles)[0]
                                    ? Object.values(
                                          animeData.attributes.titles
                                      )[0]
                                    : Object.values(
                                          animeData.attributes.titles
                                      )[1]}
                            </h1>
                            <p className="fs-4">
                                {animeData.attributes.synopsis
                                    ? animeData.attributes.synopsis
                                    : animeData.attributes.description
                                    ? animeData.attributes.description
                                    : "No description available,"}
                            </p>
                        </div>
                    </>
                ) : (
                    <div
                        className="spinner-border spinner-border-lg"
                        role="status"
                    >
                        <span className="visually-hidden">Loading...</span>
                    </div>
                )}
            </div>
        </>
    );
};

export default AnimeDetailsPage;
