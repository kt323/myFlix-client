import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Form, Row, Col } from "react-bootstrap";

const NavigationBar = ({ user, onLogout }) => {

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-title" style={{ color: "#000000", fontWeight: "bold"}}>
          MyFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {!user ? (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup">Create Account</Nav.Link>
              </>
            ): (
              <>
                <Nav.Link as={Link} to="/" className="ms-md-3">Home</Nav.Link>
                <Nav.Link as={Link} to="/profile" className="ms-md-3">Profile</Nav.Link>
                <Nav.Link onClick={onLogout} className="ms-md-3">Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;