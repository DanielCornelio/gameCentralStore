import React from "react";
import Carrousel from "../../components/Carrousel/Carrousel";
import { SectionTitle, LastGameCard, PremierGameCard } from "../../components";
import { Container, Row, Col } from "react-bootstrap";

export const Home = () => {
  return (
    <Container>
      <Row>
        <Col xs={12}>
          <Carrousel />
        </Col>
      </Row>
      <SectionTitle title="ÚLTIMAS PUBLICACIONES DE ESTE MES" />
      <LastGameCard />
      <SectionTitle title="Juegos destacados" />
      <PremierGameCard />
    </Container>
  );
};
