import { useState, useEffect } from "react";
import { BookCard } from "../book-card/book-card";
import { BookView } from "../book-view/book-view";
import { LoginView } from "../login-view/login-view"; 
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import { Col, Form, Button } from "react-bootstrap";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://myflixdb-8tdc.onrender.com", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const moviesFromApi = data.docs.map((movie) => { 
          return {
            id: movie._id,
            Title: movie.Title,
            Description: movie.Description,
            Year: movie.Year,
            Genre: {
              Name: movie.Genre.Name,
            },
            Director: {
              Name: movie.Director.Name,
            },
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

return (
  <Row>

  {!user ? (
    <>
      <LoginView onLoggedIn={(user) => setUser(user)} />
        or
      <SignupView />
      </>
    ) : selectedMovie ? (
      <BookView
        book={selectedMovie}
        onBackClick={() => setSelectedMovie(null)} />
    ) : books.length === 0 ? (
      <div>The list is empty!</div>
    ) : (
      <>
      {books.map((book) => (
        <Col className="mb-5" md={3}>
          <BookCard
            key={book.id}
            book={book}
            onBookClick={(newSelectedBook) => {
            setSelectedBook(newSelectedBook);
      }}
      />
        </Col>
            ))}
      </>
    )}
    </Row>
  );
};

  // return (
  //   <div>
  //     <button onClick={handleLogout}>Logout</button>
  //     {movies.map((movie) => (
  //       <BookCard
  //         key={movie.id}
  //         book={movie}
  //         onBookClick={(newSelectedMovie) => {
  //           setSelectedMovie(newSelectedMovie);
  //         }}
  //       />
  //     ))}
  //   </div>
  // );
