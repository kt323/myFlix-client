import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Navigate, Link, BrowserRouter } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import NavigationBar from "../navigation-bar/navigation-bar";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ProfileView from "../profile-view/profile-view";
import { API_URL } from "../../CONST_VARS";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const tokenRef = useRef(storedToken ? storedToken : null);

  const handleLoggedIn = (user, token) => {
  setUser(user);
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
};


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${tokenRef.current}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error("Failed to fetch users data");
        }
      } catch (error) {
        console.error("Error fetching users data:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${API_URL}/movies`, {
          headers: {
            Authorization: `Bearer ${tokenRef.current}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          const moviesFromApi = data.map((movie) => {
            return {
              title: movie.Title,
              releaseYear: movie.ReleaseYear,
              description: movie.Description,
              genre: {
                Name: movie.Genre.Name,
                Description: movie.Genre.Description,
              },
              director: {
                Name: movie.Director.Name,
                Bio: movie.Director.Bio,
                Birth: movie.Director.Birth,
                Death: movie.Director.Death,
              },
              imagePath: movie.ImagePath,
              featured: movie.Featured,
              id: movie._id,
            };
          });
          setMovies(moviesFromApi);
        } else {
          console.error("Failed to fetch movies data");
        }
      } catch (error) {
        console.error("Error fetching movies data:", error);
      }
    };

    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) => {
    if (searchQuery) {
      return movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    }
  });

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
        filteredMovies={filteredMovies} />
        
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
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
                  <Col md={5}>
                    <LoginView onLoggedIn={(user, token) => {
                      setUser(user)
                      setToken(token)
                    }
                    } />
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
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
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
                  <Col>The list is empty!</Col>
                ) : searchQuery ? (
                  <>
                    <Row>
                      {filteredMovies.map((movie) => (
                        <Col className="mb-4" key={movie._id} md={3} >
                          <MovieCard
                            user={user}
                            setUser={setUser}
                            movie={movie} />
                        </Col>
                      ))}
                    </Row>
                  </>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie._id} md={3}>
                        <MovieCard movie={movie} setUser={setUser} />
                      </Col>
                    ))}
                  </>
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
                  ) : (
                    <Col md={5}>
                      <ProfileView user={user} token={token} movies={movies} onDelete={onDelete}/>
                    </Col>
                  )}
                </>
              }
            />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

export default MainView;