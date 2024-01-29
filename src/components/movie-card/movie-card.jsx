import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FavoriteToggle } from "../favorite-toggle/favorite-toggle"
import "./movie-card.scss";


export const MovieCard = ({ movie }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.author}</Card.Text>
        <Row>
          <Col>
            <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
              <Button variant="link">Open</Button>
            </Link>
          </Col>
          <Col>
            <ToggleFavs movie={movie} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
    })
  }).isRequired,
};