import axios from "axios";
import "../styles/AnimeDetails.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

const AnimeDetailsPage = () => {
    // gets the param from the URL if any
    const { animeId } = useParams();
    // allows us to redirect
    const navigate = useNavigate();
    // stores incoming data about specific anime with animeId
    const [animeData, setAnimeData] = useState([]);

    // JSON.parse() turns string true or false into boolean
    const underMaintenance = JSON.parse(process.env.REACT_APP_MAINTENANCE);

    // formats date string given by the API in| MONTH DD, YYYY | format
    const formatDate = (date) => {
        let dateArr = date.split("-")

        // hasmap for incoming numbered month date format
        let monthsMap = {
            "01": "January",
            "02": "February",
            "03": "March",
            "04": "April",
            "05": "May",
            "06": "June",
            "07": "July",
            "08": "August",
            "09": "September",
            "10": "October",
            "11": "Novemeber",
            "12": "December"
        }

        return `${monthsMap[dateArr[1]]} ${dateArr[2]}, ${dateArr[0]}`
    }

    useEffect(() => {
        // change when updating the page or when it is broken
        if (underMaintenance) {
            navigate("/maintenance");
        }

        axios
            .get(`https://kitsu.io/api/edge/anime/${animeId}`)
            .then((res) => {
                setAnimeData(res.data.data);
            })
            .catch((error) => console.log("Error:", error));
    }, [animeId]);

    return (
        <main className="mainContainer">
            <div className="container-lg py-3 px-0">
                <Navbar />
            </div>
            {animeData.attributes ? (
                <div className="container-lg">
                    <div className="row gx-lg-5">
                        <div
                            className="card col-2 px-0 summary-details"
                            style={{ width: "24rem", height: "min-content" }}
                        >
                            <img
                                src={
                                    animeData.attributes.posterImage
                                        ? animeData.attributes.posterImage
                                              .medium
                                        : animeData.attributes.posterImage
                                              .original
                                }
                                className="card-img-top"
                                alt={
                                    Object.values(
                                        animeData.attributes.titles
                                    )[0]
                                        ? Object.values(
                                              animeData.attributes.titles
                                          )[0] + " poster"
                                        : Object.values(
                                              animeData.attributes.titles
                                          )[1] + " poster"
                                }
                            />
                            <div className="card-body">
                                <h5 className="py-2 text-info-1">
                                    Rating:{" "}
                                    <span
                                        className={`badge rounded-pill fs-6 text-bg-${
                                            animeData.attributes.averageRating
                                                ? parseFloat(
                                                      animeData.attributes
                                                          .averageRating
                                                  ) >= 79
                                                    ? "success light-success"
                                                    : parseFloat(
                                                          animeData.attributes
                                                              .averageRating
                                                      ) >= 59
                                                    ? "warning light-warning"
                                                    : "danger light-danger"
                                                : "secondary"
                                        }`}
                                    >
                                        {animeData.attributes.averageRating
                                            ? animeData.attributes.averageRating
                                            : "Not available"}
                                    </span>
                                </h5>
                                <h5 className="py-2 text-info-1">
                                    Type:{" "}
                                    <span className="anime-attr text-light">
                                        {animeData.attributes.subtype
                                            ? animeData.attributes.subtype
                                            : "Not available"}
                                    </span>
                                </h5>
                                <h5 className="py-2 text-info-1">
                                    Status:{" "}
                                    {animeData.attributes.status ===
                                    "finished" ? (
                                        <span className="badge bg-danger ms-2 fs-6">
                                            Finished
                                        </span>
                                    ) : animeData.attributes.status ===
                                      "current" ? (
                                        <span className="badge bg-success ms-2 fs-6">
                                            Airing
                                        </span>
                                    ) : (
                                        <span className="badge bg-warning ms-2 fs-6">
                                            Coming Soon
                                        </span>
                                    )}
                                </h5>
                                <h5 className="py-2 text-info-1">
                                    Start Date:&nbsp;
                                    <span className="anime-attr text-light">
                                        {animeData.attributes.startDate
                                            ? formatDate(
                                                  animeData.attributes.startDate
                                              )
                                            : "Not available"}
                                    </span>
                                </h5>
                                <h5 className="py-2 text-info-1">
                                    End Date:&nbsp;
                                    <span className="anime-attr text-light">
                                        {animeData.attributes.endDate
                                            ? formatDate(
                                                  animeData.attributes.endDate
                                              )
                                            : "Not available"}
                                    </span>
                                </h5>
                            </div>
                        </div>
                        <div className="col">
                            <h1 className="mb-5 anime-detail-title">
                                {Object.values(animeData.attributes.titles)[0]
                                    ? Object.values(
                                          animeData.attributes.titles
                                      )[0]
                                    : Object.values(
                                          animeData.attributes.titles
                                      )[1]}
                            </h1>
                            <p className="text-light fs-5 lh-lg">
                                {animeData.attributes.synopsis ||
                                animeData.attributes.description
                                    ? animeData.attributes.synopsis ||
                                      animeData.attributes.description
                                    : "(No description available!)"}
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <span className="visually-hidden">Loading...</span>
            )}
        </main>
    );
};

export default AnimeDetailsPage;
