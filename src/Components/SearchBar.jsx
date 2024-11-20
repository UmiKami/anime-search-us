import React from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ animeTitle }) => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        let inputVal = e.target.value;

        console.log(inputVal);

        inputVal = inputVal.replace(/\//g, "⧸");
        inputVal = inputVal.replace(/\s/g, "%20") // without this we cannot represent a space in the Url bar which would prevent us from adding spaces at the end of the query string

        if (inputVal.length) {
            navigate(`/search/${inputVal}`);
        } else {
            navigate("/");
        }
    };

    return (
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
    );
};

export default SearchBar;
