import React, { version } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = ({ version }) => {


    return (
        <h1 className="mb-5 ">
            <Link
                to={"/"}
                style={{ textDecoration: "none", width: "contain" }}
                className="navhead-color"
            >
                Anime Search <span className="navbar-version">{version}</span>
            </Link>
        </h1>
    );
};

export default Navbar;
