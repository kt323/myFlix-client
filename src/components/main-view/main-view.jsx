import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, Link, BrowserRouter } from "react-router-dom";
import { movieCard } from "../movie-card/movie-card";
import { movieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import NavigationBar from "../navigation-bar/navigation-bar";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ProfileView from "../profile-view/profile-view";

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
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
      .then((data) => {
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
        setMovies(moviesFromApi);
      });
  }, [token]);

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
          <Route
            path="/profile"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <Col md={8}>
                  <ProfileView user={user} />
                </Col>
              )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};