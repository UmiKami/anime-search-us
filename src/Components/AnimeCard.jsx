import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const AnimeCard = ({ anime }) => {
    const [loading, setLoading] = useState(true);
    const [imgError, setImgError] = useState(false);
    
    const handleImgError = (error) => {
        console.log(error);
        setImgError(true)
    }

    const handleTitleEnter = (hoverEvent) => {
        hoverEvent.target.scroll(0, 41);
    };

    const handleTitleOut = (hoverEvent) => {
        hoverEvent.target.scroll(0, 0);
    };

    useEffect(()=>{
        setTimeout(()=>{
            setLoading(false)
        }, 800)

    }, [])

    // console.log(loading);

    return (
        <div className="d-flex flex-column col-md-3 mb-4 position-relative">
            {!loading ? (
                <>
                    {anime.attributes.status === "finished" ? (
                        <span className="badge bg-danger position-absolute m-2 fs-6">
                            Finished
                        </span>
                    ) : anime.attributes.status === "current" ? (
                        <span className="badge bg-success position-absolute m-2 fs-6">
                            Airing
                        </span>
                    ) : (
                        <span className="badge bg-warning position-absolute m-2 fs-6">
                            Coming Soon
                        </span>
                    )}
                    <Link
                        to={`/anime/${anime.id}`}
                        style={{ textDecoration: "none" }}
                    >
                        {!imgError ? (
                            <img
                                src={anime.attributes.posterImage.large}
                                alt="anime poster"
                                className="col-12"
                                onError={handleImgError}
                            />
                        ) : (
                            <img
                                src={require("../img/posterPlaceholder.webp")}
                                className="col-12"
                                alt="placeholder for anime poster"
                            />
                        )}
                        <p
                            className="fs-4 bg-primary text-light mb-0 anime-title"
                            onMouseEnter={handleTitleEnter}
                            onMouseOut={handleTitleOut}
                        >
                            {Object.values(anime.attributes.titles)[0]
                                ? Object.values(anime.attributes.titles)[0]
                                : Object.values(anime.attributes.titles)[1]}
                        </p>
                    </Link>
                    <p className="bg-secondary text-light card-description">
                        {anime.attributes.description}
                    </p>
                </>
            ) : (
                <div className="d-flex justify-content-center">
                    <div
                        className="spinner-border"
                        role="status"
                        style={{
                            color: "darkorange",
                        }}
                    >
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnimeCard;
