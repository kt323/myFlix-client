import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const movieView = ({ movies, favoritemovies, setFavoritemovies }) => {
  const { movieId } = useParams();
  const movie = movies.find((b) => b.id === movieId);
  const [isFavorited, setIsFavorited] = useState(favoritemovies.includes(movieId));

  const toggleFavorite = () => {
    if (isFavorited) {
      
      const updatedFavorites = favoritemovies.filter((favmovieId) => favmovieId !== movieId);
      setFavoritemovies(updatedFavorites);
    } else {
      
      const updatedFavorites = [...favoritemovies, movieId];
      setFavoritemovies(updatedFavorites);
    }

    setIsFavorited(!isFavorited); 
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

movieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    releaseYear: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string
    }).isRequired,
    director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string,
      Birth: PropTypes.string,
      Death: PropTypes.string
    }).isRequired,
    imagePath: PropTypes.string.isRequired,
    featured: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};