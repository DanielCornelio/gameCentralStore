import React, { useContext, useState } from "react";
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
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./TopBar.scss";
import { UserContext } from "../../../contexts/UserContext";
import { IoHeartSharp } from "react-icons/io5";
import { CartContext } from "../../../contexts/CartContext";

export const TopBar = ({ cartCount = 0 }) => {
  const { user, token, logout } = useContext(UserContext);
  const {cart} = useContext(CartContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout();
    navigate("/")
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
            <Nav.Link as={NavLink} to="/games">
              Store
            </Nav.Link>
          </Nav>

          {token && (
            <NavDropdown
              title={
                <>
                  <FaUser /> Hola, {user?.username || user?.email}
                </>
              }
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item as={NavLink} to="/profile">Mi perfil</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/admin/profile">Administrar Cuenta</NavDropdown.Item>

              {
                user?.rol == "admin" && (
              <NavDropdown.Item as={NavLink} to="/admin">Admin</NavDropdown.Item>

                )
              }
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>
                Cerrar sesión
              </NavDropdown.Item>
            </NavDropdown>
          )}

          <Nav.Link as={NavLink} to="/favorites" className="mx-3 ">
            <IoHeartSharp size={20} />
          </Nav.Link>

          <Nav.Link as={NavLink} to="/cart" className="position-relative">
            <FaShoppingCart size={20} />
            {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
          </Nav.Link>

          <Nav className="d-flex align-items-center gap-2 ms-4">
            {!token && (
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
