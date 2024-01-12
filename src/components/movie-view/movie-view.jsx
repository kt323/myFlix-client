import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./movie-view.scss";
import { Row, Col, Button } from "react-bootstrap";

export const movieView = ({ movies, favoritemovies, setFavoritemovies }) => {
  const { movieId } = useParams();
  const movie = movies.find((b) => b.id === movieId);
  const [isFavorited, setIsFavorited] = useState(favoritemovies.includes(movieId));

  const toggleFavorite = () => {
    if (isFavorited) {
      // Remove the movie from favorites
      const updatedFavorites = favoritemovies.filter((favmovieId) => favmovieId !== movieId);
      setFavoritemovies(updatedFavorites);
    } else {
      // Add the movie to favorites
      const updatedFavorites = [...favoritemovies, movieId];
      setFavoritemovies(updatedFavorites);
    }

    setIsFavorited(!isFavorited); // Toggle the favorite status
  };

  return (
    <Row className="justify-content-md-center">
      <Col md={7} className="col-12">
        <img src={movie.image} alt="" className="mx-auto w-100" />
      </Col>
      <Col md={5} className="col-12">
        <div className="my-1">
          <span className="h1">{movie.Title}</span>
        </div>
        <div className="my-1">
          <span className="h6">Description:</span>
          <span>{movie.Description}</span>
        </div>
        <div className="my-1">
          <span className="h6">Author: </span>
          <span>{movie.Author.Name}</span>
        </div>
        <div className="my-1">
          <span className="h6">Genre: </span>
          <span>{movie.Genre.Name}</span>
        </div>
        <div className="my-1">
          <span className="h6">Year: </span>
          <span>{movie.Year}</span>
        </div>
        <button onClick={toggleFavorite} className="my-2">
          {isFavorited ? "Remove from Favorites" : "Add to Favorites"}
        </button>
        <Link to="/" className="back-button">
          Back
        </Link>
      </Col>
    </Row>
  );
};
