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
                Anime Search{" "}
                <span
                    className="navbar-version"
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    title="This website is still in alpha. Styling will drastically change towards Beta release."
                >
                    {version}
                </span>
            </Link>
        </h1>
    );
};

export default Navbar;
