import React, { useState } from 'react';
import { Navbar, Container, Nav, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import './TopBar.scss';

export const TopBar = ({ cartCount = 0 }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Buscar:', searchTerm);
    
  };

  return (
    <Navbar expand="lg" className="topbar navbar-dark bg-dark-base" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
          GameCentral
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="topbar-navbar-nav" />
        <Navbar.Collapse id="topbar-navbar-nav">
          <Nav className="me-auto my-2 my-lg-0 gap-2" navbarScroll>
            <Nav.Link as={NavLink} to="/" end>Inicio</Nav.Link>
            <Nav.Link as={NavLink} to="/offers">Ofertas</Nav.Link>
            <Nav.Link as={NavLink} to="/games">Juegos</Nav.Link>
            <NavDropdown title={<><FaUser /> Perfil</>} id="navbarScrollingDropdown">
              <NavDropdown.Item as={NavLink} to="/profile">Mi perfil</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/settings">Configuración</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} to="/logout">Cerrar sesión</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Form className="d-flex me-3" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Buscar juegos..."
              className="me-2"
              aria-label="Buscar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" variant="outline-light">Buscar</Button>
          </Form>

          <Nav>
            <Nav.Link as={NavLink} to="/cart" className="position-relative">
              <FaShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
