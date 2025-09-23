import React from "react";
import Carrousel from "../../components/Carrousel/Carrousel";
import { Container, Row, Col } from "react-bootstrap";

const Home = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={10}>
          <Carrousel />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
