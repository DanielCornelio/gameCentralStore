import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap";
import { GameDetailCard, SectionTitle, RatingComments, CommentModal } from "../../../components";
import { CommentCard } from "../../../components/web/CommentCard/CommentCard";
import { useLocation, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { gamesData } from "../../../data/games";

export const GameDetail = () => {
  const [info, setInfo] = useState({})
  const {id} = useParams();

 const location = useLocation();

  useEffect(() => {
    // Scroll al top cuando el componente se monta
    window.scrollTo(0, 0);
  }, [location.pathname]); // Se ejecuta cuando cambia la ruta

  
  useEffect(() => {
    getData()
  }, [id])


  const getData = async () => {
    try {
      const response =  await gamesData.find(game => game.id === parseInt(id));
       if (response) {
        setInfo(response);
      } else {
        toast.error('Juego no encontrado');
      }
    } catch (error) {
      toast.error('No se pudo establecer conexión con el servidor');
    }
  }
  
  return (
    <Container>
      <GameDetailCard {...info} />
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
