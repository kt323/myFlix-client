import PropTypes from "prop-types";

export const MovieCard = ({ movie, onFavoriteClick }) => {
  return (
    <div>
      <h2>{movie.Title}</h2>
      <p>{movie.Description}</p>
      <button onClick={() => onFavoriteClick(movie)}>Favorite</button>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    // Add other movie properties here
  }).isRequired,
  onFavoriteClick: PropTypes.func.isRequired,
};