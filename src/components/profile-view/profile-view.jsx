import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { MovieCard } from "../movie-card/movie-card";
import "./profile-view.scss";
import { API_URL } from "../../CONST_VARS";

export const ProfileView = ({ user, token, setUser, movies, onDelete }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);
  const storedToken = localStorage.getItem("token");

  const handleUpdate = async (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    try {
      const response = await fetch(`${API_URL}/users/${user.Username}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Profile updated successfully");
        const updatedUser = await response.json();
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        window.location.reload();
      } else {
        alert("Unable to update profile.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while updating the profile.");
    }
  };

  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/users/${user.Username}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (response.ok) {
        onDelete();
        alert("Account deleted successfully");
        window.location.replace("https://cf-myflix-client.netlify.app/login");
      } else {
        alert("Unable to delete account");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while deleting the account.");
    }
  };

  const favoriteMovies = movies.filter((movie) =>
    user.FavoriteMovies.includes(movie.id)
  );

  return (
    <>
      <Row className="pv-content-center">
        <Col md={6}>
          <h3 className="my-3 text-center">Account Info</h3>
          <Form className="update-info-form p-3" onSubmit={handleUpdate}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username: </Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder={user.Username}
                className="mb-3"
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password: </Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength="8"
                required
                className="mb-3"
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email: </Form.Label>
              <Form.Control
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder={user.Email}
                className="mb-3"
              />
            </Form.Group>

            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday: </Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className="mb-4"
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button
                type="submit"
                onClick={handleUpdate}
                className="update-profile-button"
                variant="primary"
              >
                Update Info
              </Button>
              <DeleteAccountModal
                handleDelete={handleDelete}
                className="modal-button"
              />
            </div>
          </Form>
        </Col>
      </Row>

      <Row className="justify-content-around">
        <h3 className="mt-5 mb-3 text-center">My Favorite Movies</h3>
        {favoriteMovies.map((movie) => {
          return (
            <Col key={movie.id} md={4} sm={6} className="mb-4">
              <MovieCard
                movie={movie}
                user={user}
                token={token}
                setUser={setUser}
                onDelete={onDelete}
              />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default ProfileView;
