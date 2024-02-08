import PropTypes from "prop-types";
import { useState } from "react";
import { useSelector } from "react-redux"; 
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = () => {
  const movies = useSelector((state) => state.movies.list);
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);

  return (
    <Row className="justify-content-md-center">
      <Col md={7} className="col-12">
        <img src={movie.ImagePath} alt="" className="mx-auto w-100" />
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
          <span className="h6">Director: </span>
          <span>{movie.Director}</span>
        </div>
        <div className="my-1">
          <span className="h6">Genre: </span>
          <span>{movie.Genre}</span>
        </div>
        <Link to="/" className="back-button">Back</Link>
      </Col>
    </Row>
  );
};

MovieView.propTypes = {
  movies: PropTypes.array.isRequired, 
  favoritemovies: PropTypes.array.isRequired,
  setFavoritemovies: PropTypes.func.isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default MovieView;
