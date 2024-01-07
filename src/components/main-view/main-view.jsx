import { useState, useEffect } from "react";
import { BookCard } from "../book-card/book-card";
import { BookView } from "../book-view/book-view";
import { LoginView } from "../login-view/login-view"; // Corrected import statement
import { SignupView } from "../signup-view/signup-view"; // Added import statement for SignupView

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
      headers: { Authorization: `Bearer ${token}` }, // Corrected string interpolation
    })
      .then((response) => response.json())
      .then((data) => {
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

        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [token]);

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
  );
};
