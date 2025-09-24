import React from 'react';
import { Container, Row, Col, Stack, Nav } from 'react-bootstrap';
import { FaFacebook, FaApple, FaInstagram, FaGooglePlay } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { MarketplaceCard } from '../../../components/web/MarketplaceCard/MarketplaceCard';
import { NavLink } from 'react-router-dom';
import './Footer.scss'; 


export const Footer = () => {
  return (
    <footer className="footer bg-dark-base text-light">
      <Container className="py-4">
        <Row>
          {/* Logo y descripción */}
          <Col md={3} className="mb-3">
            <Stack gap={2}>
              <h5>Game Central Store</h5>
              <p>Tu punto de encuentro para la aventura</p>
            </Stack>
          </Col>

          {/* Enlaces útiles */}
          <Col md={3} className="mb-3">
            <h5 className='mb-3'>Enlaces útiles</h5>
            <Nav className="flex-column footer__links">
              <Nav.Link as={NavLink} to="/" end className='px-0'>Inicio</Nav.Link>
              <Nav.Link as={NavLink} to="/login" className='px-0'>Login</Nav.Link>
              <Nav.Link as={NavLink} to="/service" className='px-0'>Servicios</Nav.Link>
            </Nav>
          </Col>

          {/* Descarga de app */}
          <Col md={3} className="mb-3">
            <h5 className='mb-4'>Descarga nuestra app</h5>
            <Stack gap={3}>
              <MarketplaceCard icono={FaGooglePlay} titulo="Get it now!" tienda="Google Play" />
              <MarketplaceCard icono={FaApple} titulo="Get it now!" tienda="App Store" />
            </Stack>
          </Col>

          {/* Redes sociales */}
          <Col md={3} className="mb-3">
            <h5 className='mb-4'>Síguenos</h5>
            <Nav className="d-flex gap-3 footer__social">
              <Nav.Link className='px-0'><FaFacebook size={30} /></Nav.Link>
              <Nav.Link className='px-0'><FaXTwitter size={30} /></Nav.Link>
              <Nav.Link className='px-0'><FaInstagram size={30} /></Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>

      <div className="footer__bottom text-center py-3 border-top border-secondary">
        <Container>
          <span>© {new Date().getFullYear()} Game Central Store. Todos los derechos reservados</span>
        </Container>
      </div>
    </footer>
  );
};
