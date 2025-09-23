import { Container, Row, Col, Stack, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaGooglePlay, FaApple, FaFacebook, FaXTwitter, FaInstagram } from 'react-icons/fa6';
import MarketplaceCard from '../MarketplaceCard/MarketplaceCard';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-sticky bg-dark text-light mt-5">
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
            <Nav className="flex-column">
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
            <Nav className="d-flex gap-3">
              <Nav.Link><FaFacebook size={30} /></Nav.Link>
              <Nav.Link><FaXTwitter size={30} /></Nav.Link>
              <Nav.Link><FaInstagram size={30} /></Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>

      <div className="text-center py-3 border-top border-secondary">
        <Container>
          <span>© {new Date().getFullYear()} Game Central Store. Todos los derechos reservados</span>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;

