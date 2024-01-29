import React from 'react';
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Form, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../reducers/user";

export const NavigationBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-title" style={{ color: "#C8B7A6", fontWeight: "bold"}}>
          MyFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
          {!localStorage.user && (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
              </>
            )}
          {localStorage.user && (
              <>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                <Nav.Link onClick={() => dispatch(clearUser())}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;