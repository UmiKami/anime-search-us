import axios from "axios";
import "../styles/AnimeDetails.css"
import { useState } from "react";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Maintenance from "../Components/Maintenance";
import useWindowDimensions from "../Hooks/WindowDimensions";

const AnimeDetailsPage = () => {
    const { animeId } = useParams();
    const {width} = useWindowDimensions();
    const [animeData, setAnimeData] = useState([]);

    console.log(width);

    // JSON.parse() turns string true or false into boolean 
    const underMaintenance = JSON.parse(process.env.REACT_APP_MAINTENANCE);

    useEffect(() => {
        // change when updating the page or when it is broken
        axios
            .get(`https://kitsu.io/api/edge/anime/${animeId}`)
            .then((res) => {
                setAnimeData(res.data.data);
            })
            .catch((error) => console.log(error));
    }, [animeId]);

    // console.log(animeData);

    return (
        <main className="mainContainer">
            {!underMaintenance ? (
                <>
                    {" "}
                    <Link
                        to={"/"}
                        style={{ textDecoration: "none", cursor: "pointer" }}
                        className="text-center mt-5"
                    >
                        <h1 className="mb-5 text-success">Anime Search</h1>
                    </Link>
                    <div className="container-fluid d-flex custom-container">
                        {animeData.length !== 0 ? (
                            <div className="row row-custom justify-content-center">
                                <div className={"summary col-lg-" + (width > 1700 && width <= 1920? "2" : width <= 1200 ? "5" : width > 1921 ? "3" : "3")}>
                                    <img
                                        src={
                                            animeData.attributes.posterImage
                                                .medium
                                        }
                                        alt="anime poster"
                                        className="poster col-12"
                                    />
                                    <div className="summary-details col-12">
                                        <p>
                                            Rating:{" "}
                                            <span className="badge badge-success"></span>
                                        </p>
                                        <p>
                                            Type:{" "}
                                            <span className="summary-details-vals"></span>
                                        </p>
                                        <p>
                                            Status:{" "}
                                            <span className="badge badge-danger"></span>
                                        </p>
                                        <p>
                                            Start Date:{" "}
                                            <span className="summary-details-vals"></span>
                                        </p>
                                        <p>
                                            End Date:{" "}
                                            <span className="summary-details-vals"></span>
                                        </p>
                                    </div>
                                </div>

                                <div className="anime-description ms-5 col-lg-7">
                                    <h1 className="anime-description-header mb-4">
                                        {Object.values(
                                            animeData.attributes.titles
                                        )[0]
                                            ? Object.values(
                                                  animeData.attributes.titles
                                              )[0]
                                            : Object.values(
                                                  animeData.attributes.titles
                                              )[1]}
                                    </h1>
                                    <p className="fs-5 anime-description-p">
                                        {animeData.attributes.synopsis
                                            ? animeData.attributes.synopsis
                                            : animeData.attributes.description
                                            ? animeData.attributes.description
                                            : "No description available,"}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div
                                className="spinner-border spinner-border-lg"
                                role="status"
                            >
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <Maintenance />
            )}
        </main>
    );
};

export default AnimeDetailsPage;
