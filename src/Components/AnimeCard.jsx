import { v4 as uuidv4 } from "uuid";

const AnimeCard = ({ loading, anime }) => {
    const handleTitleEnter = (hoverEvent) => {
        hoverEvent.target.scroll(0, 41);
    };
    const handleTitleOut = (hoverEvent) => {
        hoverEvent.target.scroll(0, 0);
    };

    return (
        <div
            className="d-flex flex-column col-md-3 mb-4 position-relative"
            key={uuidv4()}
        >
            {!loading ? (
                <>
                    {anime.attributes.status === "finished" ? (
                        <span class="badge bg-danger position-absolute m-2 fs-6">
                            Finished
                        </span>
                    ) : anime.attributes.status === "current" ? (
                        <span class="badge bg-success position-absolute m-2 fs-6">
                            Airing
                        </span>
                    ) : (
                        <span class="badge bg-warning position-absolute m-2 fs-6">
                            Coming Soon
                        </span>
                    )}
                    <img
                        src={anime.attributes.posterImage.large}
                        alt="anime poster"
                    />
                    <p
                        className="fs-4 bg-primary text-light mb-0 anime-title"
                        onMouseEnter={handleTitleEnter}
                        onMouseOut={handleTitleOut}
                    >
                        {Object.values(anime.attributes.titles)[0]
                            ? Object.values(anime.attributes.titles)[0]
                            : Object.values(anime.attributes.titles)[1]}
                    </p>
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
