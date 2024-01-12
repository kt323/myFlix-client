import PropTypes from "prop-types";
<<<<<<< Updated upstream:src/components/book-card/book-card.jsx

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
      author: PropTypes.string
    }).isRequired,
    onBookClick: PropTypes.func.isRequired
  };
=======
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./book-card.scss";

export const BookCard = ({ book }) => {
  return (
    <Card>
      <Card.Img variant="top" src={book.image} />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>{book.author}</Card.Text>
        <Link to={`/books/${encodeURIComponent(book.id)}`}>
          <Button variant="link">Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    author: PropTypes.string
  }).isRequired
};

  <>
  {books.map((book) => (
    <Col key={book.id} md={3}>
      <BookCard
        book={book}
        onBookClick={(newSelectedBook) => {
          setSelectedBook(newSelectedBook);
        }}
      />
    </Col>
  ))}
</>
>>>>>>> Stashed changes:src/components/movie-card/movie-card.jsx
