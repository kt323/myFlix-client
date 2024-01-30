import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./login-view.scss";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password
    };

    try {
      const response = await fetch("https://movie-api-vudt.onrender.com/movie_api/users", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        if (responseData.user && responseData.token) {
          sessionStorage.setItem("user", JSON.stringify(responseData.user));
          sessionStorage.setItem("token", responseData.token);
          onLoggedIn(responseData.user, responseData.token);
        } else {
          setError("No such user");
        }
      } else {
        setError("Login failed");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while logging in.");
    }
  };

  return (
    <div>
      <p className="text-center mt-4 mb-5">Welcome aboard <span className="login-title text-center">myFlix</span></p>
      
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control 
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            minLength="5"
            required 
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="my-3">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength="2"
            required
          />
        </Form.Group>
        <div className="d-flex justify-content-between">
          <Button
            type="submit"
            className="login-button"
          >
            Sign In
          </Button>
          <Link to="/signup">
            <Button variant="link" >
              New user? Create an account!
            </Button>
          </Link>
        </div>
      </Form>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};
