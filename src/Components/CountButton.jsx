import React, { useState } from "react";
import "../styles/CountButton.css";

const CountButton = ({ favoritesCount, episodeCount, type, liked }) => {
    const [hasLiked, setHasLiked] = useState(liked);

    let rightContainerStyle =
        type === "fav"
            ? "btn-fav-logo" + (hasLiked ? " btn-fav-logo-active-bg" : "")
            : "btn-episode-count";

    return (
        <main className="count-btn-container d-flex">
            <p className="mb-0 align-self-center me-auto ms-auto">
                {type === "fav" ? favoritesCount : "Episodes"}
            </p>
            <div
                className={rightContainerStyle}
                onClick={() => setHasLiked((state) => !state)}
            >
                {type === "fav" ? (
                    <span
                        className={`fa-solid fa-heart ${
                            hasLiked && "btn-fav-logo-active"
                        }`}
                    ></span>
                ) : (
                    episodeCount
                )}
            </div>
        </main>
    );
};

export default CountButton;