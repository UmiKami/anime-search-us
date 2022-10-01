import React from 'react'
import { Link } from 'react-router-dom';
import "../styles/Navbar.css"

const Navbar = () => {
  return (
      <h1 className="mb-5 ">
          <Link
              to={"/"}
              style={{ textDecoration: "none", width: "contain" }}
            className="navhead-color"
          >
              Anime Search
          </Link>
      </h1>
  );
}

export default Navbar