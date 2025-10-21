import React, { useContext, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Carrousel from "../../components/web/Carrousel/Carrousel.jsx";
import { SectionTitle } from "../../components/common";
import { GameCard, LastGameCard } from "../../components/web";
import { Container, Row, Col } from "react-bootstrap";
import gamesService from "../../api/games.js";
import { FavoriteContext } from "../../contexts/FavoriteContext.jsx";

export const Home = () => {
  const [games, setGames] = useState([]);


  const getGames = async () => {
    try {
      const data = await gamesService.getAllGames();
      setGames(data);
    } catch (error) {
      toast.error("Error al cargar los juegos", error)
    }
  }

  useEffect(() => {
    getGames();
  }, [])

  

  return (
    <Container>
      <Toaster position="top-right" reverseOrder={true} />
      <Row>
        <Col xs={12}>
          <Carrousel />
        </Col>
      </Row>
      
      <SectionTitle title="ÚLTIMAS PUBLICACIONES DE ESTE MES" />

      <Row className="d-flex justify-content-between">
        {games.slice(0,2).map((game) => (
          <Col key={game.id} md={6}>
            <LastGameCard  {...game} />
          </Col>
        ))}
      </Row>
      
      <SectionTitle title="Juegos destacados" />
      <Row>
        {games.map((game) => (
          <Col key={game.id} xs={12} md={6} lg={3} className="mb-4">
            <GameCard {...game} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
