import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

import "./book-card.scss";

export const BookCard = ({ book, onBookClick }) => {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={book.image} />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>{book.author}</Card.Text>
        <Button onClick={() => onBookClick(book)} variant="link">
          Open
        </Button>
      </Card.Body>
    </Card>
  );
};

  BookCard.propTypes = {
    book: PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      author: PropTypes.string
    }).isRequired,
    onBookClick: PropTypes.func.isRequired
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