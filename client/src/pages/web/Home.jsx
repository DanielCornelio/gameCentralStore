import React from "react";
import Carrousel from "../../components/Carrousel/Carrousel";
import { SectionTitle } from "../../components";
import { GameCard, LastGameCard } from "../../components/web";
import { Container, Row, Col } from "react-bootstrap";
import { gamesData } from "../../data/games";
export const Home = () => {
  // Obtener algunos juegos para mostrar como destacados
  const featuredGames = gamesData.slice(0, 4);
  const recentGames = gamesData.slice(0, 2);

 
  return (
    <Container>
      <Row>
        <Col xs={12}>
          <Carrousel />
        </Col>
      </Row>
      
      <SectionTitle title="ÚLTIMAS PUBLICACIONES DE ESTE MES" />

      <Row className="d-flex justify-content-between">
        {recentGames.map((game) => (
          <Col key={game.id} md={6}>
            <LastGameCard  {...game} />
          </Col>
        ))}
      </Row>
      
      <SectionTitle title="Juegos destacados" />
      <Row>
        {featuredGames.map((game) => (
          <Col key={game.id} xs={12} md={6} lg={3} className="mb-4">
            <GameCard game={game} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
