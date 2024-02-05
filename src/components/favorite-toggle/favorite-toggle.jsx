import React from "react";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { setUser } from "../redux/reducers/user";
import { useDispatch, useSelector } from "react-redux";

export const FavoriteToggle = ({ movie }) => {
  const { user, token } = useSelector((state) => state.user);
  const isFav = user.FavoriteMovies.includes(movie.id);
  const dispatch = useDispatch();

  const addFavoriteMovie = () => {
    fetch(
      `https://movie-api-vudt.onrender.com/users/${user.Username}/movies/${movie.id}`,
      { method: "POST", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed to add movie!");
        }
      })
      .then((updatedUser) => {
        if (updatedUser) {
          localStorage.setItem('user', JSON.stringify(updatedUser));
          dispatch(setUser({ user: updatedUser, token: token }));
        }
      })
      .catch(error => {
        console.error('Error: ', error);
      });
  };

  const removeFavoriteMovie = () => {
    fetch(
      `https://movie-api-vudt.onrender.com/users/${user.Username}/movies/${movie.id}`,
      { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed to remove movie!");
        }
      })
      .then((updatedUser) => {
        if (updatedUser) {
          localStorage.setItem('user', JSON.stringify(updatedUser));
          dispatch(setUser({ user: updatedUser, token: token }));
        }
      })
      .catch(error => {
        console.error('Error: ', error);
      });
  };

  return (
    <>
      {isFav ? (
        <Button onClick={removeFavoriteMovie}>👎🏻</Button>
      ) : (
        <Button onClick={addFavoriteMovie}>❤️</Button>
      )}
    </>
  )
};
