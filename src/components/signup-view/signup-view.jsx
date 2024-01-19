import React, { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./signup-view.scss";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    try {
      const response = await fetch("https://myflix-app-jpox.onrender.com/users", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Signup failed");
    }
  };

  return (
    <Container className="signupBox">
  <h2>Signup</h2>
  <Form onSubmit={handleSubmit}>
    <div className="formBox">
      <Form.Group controlId="signUpFormUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3"
          placeholder="Username must only contain letters"
        />
      </Form.Group>
      
      <Form.Group controlId="signUpFormPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="password"
          placeholder="Password must be at least 6 characters long"
        />
      </Form.Group>

      <Form.Group controlId="signUpFormEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Must enter email"
        />
      </Form.Group>

      <Form.Group controlId="signUpFormBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>
    </div>

    <div className="d-flex justify-content-between">
      <Button type="submit" className="signup-button" variant="primary">
        Create Account
      </Button>
      <Link to="/login">
        <Button variant="link">Have an account? Sign in</Button>
      </Link>
    </div>
  </Form>
</Container>

  );
};

export default SignupView;
