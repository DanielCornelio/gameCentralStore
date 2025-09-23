import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaShoppingCart } from "react-icons/fa";
import { Link, NavLink } from 'react-router-dom';
import { Button, Form, NavDropdown } from 'react-bootstrap';
import './TopBar.css'



export const TopBar = () => {
  return (
    <Navbar expand="lg" className="bg-dark-base">
      <Container>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 gap-2"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={NavLink} to="/">Inicio</Nav.Link>
            <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
            <NavDropdown title="Perfil" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link}>Action</NavDropdown.Item>
              <NavDropdown.Item as={Link}>
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link}>
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-secondary">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
