import React from 'react'
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { setUser } from "../../redux/reducers/user";
import { useDispatch, useSelector } from "react-redux";
import favoriteheart from "./favoriteheart.svg"
import dislike from "./dislike.svg"
export const FavouriteToggle = ({ movie }) => {

    const { user, token } = useSelector((state) => state.user);
    const [isFavorite, setIsFavorite] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        if (user.FavouriteMovies && user.FavouriteMovies.includes(movie.id)) {
            setIsFavorite(true);
        }
    }, [user]);

    const addFavoriteMovie = () => {
        fetch(
            `https://myflix-app-jpox.onrender.com${user.Username}/movies/${movie.id}`,
            { method: "POST", headers: { Authorization: `Bearer ${token}` } }
        )
            .then((response) => {
                console.log(response);
                if (response.ok) {
                    return response.json();
                } else {
                    console.log("Failed to add");
                }
            })
            .then((responseUser) => {
                if (responseUser) {
                    localStorage.setItem("user", JSON.stringify(responseUser));
                    dispatch(setUser({ user: responseUser, token: token }));
                    setIsFavorite(true);
                    console.log("Succesfully added");
                }
            })
            .catch((err) => {
                console.log(`Error: ${err}`);
            });
    };

    const removeFavoriteMovie = () => {
        fetch(
            `https://myflix-app-jpox.onrender.com${user.Username}/movies/${movie.id}`,
            { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();

                } else {
                    console.log("failed to remove fav movie");
                    return undefined;
                }
            })
            .then((user) => {
                if (user) {
                    localStorage.setItem("user", JSON.stringify(user));
                    dispatch(setUser({ user: user, token: token }));
                    setIsFavorite(false);
                }
            })
            .catch((err) => {
                console.log(`Error: ${err}`);
            });
    };
    return (
        <>{isFavorite ? (
            <Button
                variant="link"
                onClick={removeFavoriteMovie}
            >
                <img src={dislike} alt="" />
            </Button>
        ) : (
            <Button
                variant="link"
                onClick={addFavoriteMovie}
            >
                <img src={favoriteheart} alt="" />
            </Button>
        )}
        </>
    )
}