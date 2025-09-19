import { Container, Row, Col, Stack, Card, Nav, Navbar } from 'react-bootstrap';
import { FaFacebook, FaApple, FaInstagram, FaGooglePlay } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { MarketplaceCard } from '../../web/MarketplaceCard/MarketplaceCard';
import { NavLink } from 'react-router-dom';
import './Footer.css'


export const Footer = () => {
  return (
    <footer className="footer text-light" style={{ backgroundColor: '#191C1F' }}>
      <Container className="py-4">
        <Row>
          <Col md={3} className="mb-3">
            <Stack gap={2}>
              <h5>Game Central Store</h5>
              <p>Tu punto de encuentro para la aventura</p>
            </Stack>
          </Col>

          <Col md={3} className="mb-3">
            <h5 className='mb-3'>Enlaces útiles</h5>
            <Nav  className="flex-column text-light">
              <Nav.Link as={NavLink} to="/" end className='px-0'>Inicio</Nav.Link>
              <Nav.Link as={NavLink} to="/login" className='px-0'>Login</Nav.Link>
              <Nav.Link as={NavLink} to="/service" className='px-0'>Servicios</Nav.Link>
            </Nav>
          </Col>

          <Col md={3} className="mb-3">
            <h5 className='mb-4'>Descarga nuestra app</h5>
            <Stack gap={3}>
              <MarketplaceCard icono={FaGooglePlay} titulo="Get it now!" tienda="Google Play" />
              <MarketplaceCard icono={FaApple} titulo="Get it now!" tienda="App Store" />
            </Stack>
          </Col>

          <Col md={3} className="mb-3">
            <h5 className='mb-4'>Síguenos</h5>
            <Nav className="flex gap-3 text-light">
              <Nav.Link className='px-0'><FaFacebook size={30} /></Nav.Link>
              <Nav.Link className='px-0'><FaXTwitter size={30} /></Nav.Link>
              <Nav.Link className='px-0'><FaInstagram size={30} /></Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container >

      <div className="text-center py-3 border-top border-secondary">
        <Container>
          <span>© {new Date().getFullYear()} Game Center Store. Todos los derechos reservados</span>
        </Container>
      </div>
    </footer >
  );
};
