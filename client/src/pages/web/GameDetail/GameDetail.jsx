import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap";
import { GameDetailCard, SectionTitle, RatingComments, CommentModal } from "../../../components";
import { CommentCard } from "../../../components/web/CommentCard/CommentCard";
import { useLocation, useParams } from "react-router-dom";
import {Toaster, toast} from "react-hot-toast";
import { gamesData } from "../../../data/games";
import gamesService from "../../../api/games";

export const GameDetail = () => {
  const [game, setGame] = useState({});
  const {id} = useParams();
  const location = useLocation();

  const getGame = async () => {
    try {
      const data = await gamesService.getGameById(id);
      (data) ? setGame(data) : toast.error("Juego no encontrado");
    } catch (error) {
      toast.error('No se pudo establecer conexión con el servidor');
      console.log(error)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getGame()
  }, [id, location.pathname])
  console.log(game)
  
  return (
    <Container>
      <Toaster position="top-right" reverseOrder={true} />
      <GameDetailCard {...game} />
      <SectionTitle title="Comentarios" />
      <Row>
        <Col md={3}>
          <RatingComments />
        </Col>
        <Col>
          <Stack gap={4}>
            <CommentCard />
            <CommentCard />
            <CommentCard />
            <CommentCard />
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};
