import React, { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";
import { FaShoppingCart, FaUser, FaSignInAlt } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import "./TopBar.scss";

export const TopBar = ({ cartCount = 0 }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { isAuthenticated, user, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Buscar:", searchTerm);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar
      expand="lg"
      className="topbar navbar-dark bg-dark-base"
      sticky="top"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
          GameCentral
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="topbar-navbar-nav" />
        <Navbar.Collapse id="topbar-navbar-nav">
          <Nav className="me-auto my-2 my-lg-0 gap-2" navbarScroll>
            <Nav.Link as={NavLink} to="/" end>
              Inicio
            </Nav.Link>
            <Nav.Link as={NavLink} to="/offers">
              Ofertas
            </Nav.Link>
            <Nav.Link as={NavLink} to="/games">
              Juegos
            </Nav.Link>
            <Nav.Link as={NavLink} to="/products">
              Registrar juegos
            </Nav.Link>
          </Nav>

          {isAuthenticated && (
            <NavDropdown
              title={
                <>
                  <FaUser /> Hola, {user?.name}
                </>
              }
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item as={NavLink} to="/profile">
                Mi perfil
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/settings">
                Configuración
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>
                Cerrar sesión
              </NavDropdown.Item>
            </NavDropdown>
          )}

          <Nav.Link as={NavLink} to="/cart" className="position-relative">
            <FaShoppingCart size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Nav.Link>

          <Nav className="d-flex align-items-center gap-2 ms-4">
            {!isAuthenticated && (
              <>
                <Button
                  as={Link}
                  to="/login"
                  variant="outline-light"
                  size="sm"
                  className="ms-2"
                >
                  <FaSignInAlt className="me-1" />
                  Iniciar Sesión
                </Button>
                <Button as={Link} to="/register" variant="primary" size="sm">
                  Registrarse
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
