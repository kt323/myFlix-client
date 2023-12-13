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

  BookCard.propTypes = {
    book: PropTypes.shape({
      title: PropTypes.string
    }).isRequired,
    onBookClick: PropTypes.func.isRequired
  };
  