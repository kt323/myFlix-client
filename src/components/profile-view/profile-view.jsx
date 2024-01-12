import React, { useState, useEffect } from "react";

const ProfileView = ({ user }) => {

  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.email);
  const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth);
  const [favoriteMovies, setFavoriteMovies] = useState([]);


  useEffect(() => {
    
    const favoriteMoviesFromApi = movies.filter((movie) =>
      user.favoriteMovieIds.includes(movie.id)
    );
    setFavoriteMovies(favoriteMoviesFromApi);
  }, [user, movies]);

  
  const updateUser = () => {
    
  };

  const deregisterUser = () => {

  };

  return (
    <div>
      <h2>User Profile</h2>
      <form>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </div>
        <button type="button" onClick={updateUser}>
          Update Profile
        </button>
        <button type="button" onClick={deregisterUser}>
          Deregister
        </button>
      </form>
      <h3>Favorite Movies</h3>
      <ul>
        {favoriteMovies.map((movie) => (
          <li key={movie.id}>{movie.Title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileView;
