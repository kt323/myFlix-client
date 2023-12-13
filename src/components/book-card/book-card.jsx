import PropTypes from "prop-types";

export const BookCard = ({ book, onBookClick }) => {
    return (
      <div
        onClick={() => {
          onBookClick(book);
        }}
      >
        {book.title}
      </div>
    );
  };

  //might be diff based on what I need.
  BookCard.propTypes = {
    book: PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      author: PropTypes.string,
      genre: PropTypes.shape({})
    }).isRequired,
    onBookClick: PropTypes.func.isRequired
  };
