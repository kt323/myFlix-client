<<<<<<< Updated upstream
import { useState, useEffect } from "react";
import { BookCard } from "../book-card/book-card";
import { BookView } from "../book-view/book-view";
import { LoginView } from "../login-view/login-view"; // Corrected import statement
import { SignupView } from "../signup-view/signup-view"; // Added import statement for SignupView
=======
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, Link, BrowserRouter } from "react-router-dom";
import { movieCard } from "../movie-card/movie-card";
import { movieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import NavigationBar from "../navigation-bar/navigation-bar.jsx";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
>>>>>>> Stashed changes

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://myflixdb-8tdc.onrender.com", {
      headers: { Authorization: `Bearer ${token}` }, // Corrected string interpolation
    })
      .then((response) => response.json())
      .then((data) => {
<<<<<<< Updated upstream
        const moviesFromApi = data.docs.map((movie) => { // Corrected variable name from 'doc' to 'movie'
          return {
            id: movie._id, // Corrected variable name from 'movies' to 'movie'
            Title: movie.Title,
            Description: movie.Description,
            Genre: {
              Name: movie.Genre.Name,
            },
            Director: {
              Name: movie.Director.Name,
            },
          };
        });

=======
        const moviesFromApi = data.docs.map((movie) => ({
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
        }));
>>>>>>> Stashed changes
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [token]);

<<<<<<< Updated upstream
  const handleLogin = (data) => {
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setToken(data.token);
    } else {
      alert("No such user");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
  };

  if (!user) {
    return (
      <>
        <LoginView onLoggedIn={handleLogin} />
        or
        <SignupView onLoggedIn={handleLogin} />
      </>
    );
  }

  if (selectedMovie) {
    return (
      <>
        <button onClick={handleLogout}>Logout</button>
        <BookView
          book={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
      </>
    );
  }

  if (movies.length === 0) {
    return (
      <>
        <button onClick={handleLogout}>Logout</button>
        <div>The list is empty!</div>
      </>
    );
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      {movies.map((movie) => (
        <BookCard
          key={movie.id}
          book={movie}
          onBookClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
=======
  return (
    <BrowserRouter>
      <NavigationBar user={user} onLogout={() => setUser(null)} />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              user ? <Navigate to="/" /> : <Col md={5}><SignupView /></Col>
            }
          />
          <Route
            path="/login"
            element={
              user ? <Navigate to="/" /> : <Col md={5}><LoginView onLoggedIn={(user) => setUser(user)} /></Col>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              !user ? <Navigate to="/login" replace /> :
              movies.length === 0 ? <Col>The list is empty!</Col> :
              <Col md={8}><movieView movies={movies} /></Col>
            }
          />
          <Route
            path="/"
            element={
              !user ? <Navigate to="/login" replace /> :
              movies.length === 0 ? <Col>The list is empty!</Col> :
              movies.map((movie) => (
                <Col className="mb-4" key={movie.id} md={3}>
                  <Link to={`/movies/${movie.id}`} style={{ textDecoration: 'none' }}>
                    <movieCard movie={movie} />
                  </Link>
                </Col>
              ))
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
>>>>>>> Stashed changes
  );
};
