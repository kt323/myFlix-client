import React from "react";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { setUser } from "../../reducers/user";
import { useDispatch, useSelector } from "react-redux";


export const ToggleFavs = ({ movie }) => {
  const { user, token } = useSelector((state) => state.user);
  const isFav = user.FavoriteMovies.includes(movie.id);
  const dispatch = useDispatch();

    const addFavoriteMovie = () => {
        fetch(
            `https://movie-api-vudt.onrender.com${user.Username}/movies/${movie.id}`,
            { method: "POST", headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              alert("Failed to add movie!");
            }
          }).then((user) => {
            if (user) {
              localStorage.setItem('user', JSON.stringify(user));
              dispatch(setUser({ user: user, token: token }));
            }
          }).catch(error => {
            console.error('Error: ', error);
          });
        };
      

    const removeFavoriteMovie = () => {
        fetch(
            `https://movie-api-vudt.onrender.com${user.Username}/movies/${movie.id}`,
            { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              alert("Failed to remove movie!");
            }
          }).then((user) => {
            if (user) {
              localStorage.setItem('user', JSON.stringify(user));
              dispatch(setUser({ user: user, token: token }));
            }
          }).catch(error => {
            console.error('Error: ', error);
          });
        };

        return (
            <>
              {isFav ? (
                <Button onClick={() => remove(movie.id)}>👎🏻</Button>
              ) : (
                <Button onClick={() => favorite(movie.id)}>❤️</Button>
              )}
            </>
          )
        };