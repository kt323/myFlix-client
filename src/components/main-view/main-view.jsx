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

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  //importing data from API
  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://myflixapi-3voc.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => response.json())
        .then((data) => {
          const moviesFromApi = data.map((movie) => {
            return {
              title: movie.Title,
              releaseYear: movie.ReleaseYear,
              description: movie.Description,
              genre:
              {
                Name: movie.Genre.Name,
                Description: movie.Genre.Description
              },
              director: {
                Name: movie.Director.Name,
                Bio: movie.Director.Bio,
                Birth: movie.Director.Birth,
                Death: movie.Director.Death
              },
              imagePath: movie.ImagePath,
              featured: movie.Featured,
              id: movie._id
            };
          });
          setMovies(moviesFromApi);
        });
  },[token]);

  const filteredMovies = movies.filter(movie => {
    if (searchQuery) {
      return movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    }
  });

  //display on page
  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
        movies={movies}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredMovies={filteredMovies}
      />
      <Row className="justify-content-center">
        <Routes>
          <Route 
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={6}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route 
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={6}>
                    <LoginView 
                      onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route 
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>Loading movies, this should just take a moment. If movies fail to load, check your connection and retry.</Col>
                ) : (
                  <Col sm={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>Loading movies, this should just take a moment. If movies fail to load, check your connection and retry.</Col>
                ) : searchQuery ? (
                  <Row>
                    {filteredMovies.map((movie) => (
                      <Col className="mb-4" key={movie.id} lg={3} md={4} sm={6} xs={10}>
                        <MovieCard 
                          movie={movie}
                          user={user}
                          setUser={setUser} 
                        />
                      </Col>
                    ))}
                  </Row>
                ) : (                
                  <Row>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie.id} lg={3} md={4} sm={6} xs={10}>
                        <MovieCard 
                          movie={movie}
                          user={user}
                          setUser={setUser} 
                        />
                      </Col>
                    ))}
                  </Row>                 
                )}
              </>
            }
          />
          <Route 
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ): (
                  <ProfileView 
                    user={user}
                    setUser={setUser}
                    movies={movies}
                    onDelete={() => {
                      setUser(null);
                      setToken(null);
                      localStorage.clear();
                    }}
                  />
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};