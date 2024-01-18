import React, { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import "./signup-view.scss";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    }

    fetch("https://myflix-app-jpox.onrender.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Signup successful");
          window.location.reload();
        } else {
          alert("Signup failed");
        }
      })
      .catch((error) => {
        console.error("Error during signup:", error);
        alert("Signup failed");
      });
  };

  return (
    <Container className="signupBox">
        <h2>Signup</h2>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="signUpFormUsername" className="formBox">
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="3"
                // autoComplete="off"
                />
                <Form.Label>Username</Form.Label>
            </Form.Group>

            <Form.Group controlId="signUpFormPassword" className="formBox">

                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="password"
                />
                <Form.Label>Password</Form.Label>
            </Form.Group>
            <Form.Group controlId="signUpFormEmail" className="formBox">
                <Form.Control
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    // autoComplete="off"
                    required
                />
                <Form.Label>Email</Form.Label>
            </Form.Group>
            <Form.Group controlId="signUpFormBirthday" className="formBox">
                <Form.Control
                    type="date"
                    value={birth_date}
                    onChange={(e) => setBirth_Date(e.target.value)}
                    required
                />
                <Form.Label className="birthdayLabel">Birthday</Form.Label>

            </Form.Group>
            <Button id="signupBtn" type="submit">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Signup
            </Button>
        </Form>
    </Container>
);
};
export default SignupView;