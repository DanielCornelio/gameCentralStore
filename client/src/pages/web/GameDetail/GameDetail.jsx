import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, Card, Col, Container, Row, Stack } from "react-bootstrap";
import { GameDetailCard, SectionTitle, RatingComments, CommentModal } from "../../../components";
import { CommentCard } from "../../../components/web/CommentCard/CommentCard";
import { useLocation, useParams } from "react-router-dom";
import {Toaster, toast} from "react-hot-toast";
import { gamesData } from "../../../data/games";
import gamesService from "../../../api/games";
import ratingsService from "../../../api/ratings";
import { UserContext } from "../../../contexts/UserContext";

export const GameDetail = () => {
  const [game, setGame] = useState({});
  const [ratings, setRatings] = useState([]);
    const [showModal, setShowModal] = useState(false);
  
  const {id} = useParams();


  const {token, user} = useContext(UserContext)
  
  const getGame = async () => { 
    try {
      const data = await gamesService.getGameById(id);
      (data) ? setGame(data) : toast.error("Juego no encontrado");
    } catch (error) {
      toast.error('No se pudo establecer conexión con el servidor');
    }
  }

  const getRatings = async () => {
    try {
      const juego_id = id
      const response = await ratingsService.getRatingsByGameId(juego_id)
      if(response && response.data){
        setRatings(response.data.results)
      }else{
        setRatings([])
      }
    } catch (error) {
      toast.error('Error: No se pudo establecer conexión con el servidor');
    }
  }

  const handleCommentAdded = () =>{
    getRatings();
    setShowModal(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getGame()
    getRatings()
  }, [id])

  return (
    <Container>
      <Toaster position="top-right" reverseOrder={true} />
      <GameDetailCard {...game} />
      <SectionTitle title="Comentarios" />
      <Row className="mb-5">
        {
            token && user &&(
        <Col md={3}>
             <Button size="lg" onClick={() => setShowModal(true)}>Agregar Comentario</Button>
        </Col>
        )}
        <Col md={9}>
          <Stack gap={4}>
            {
              ratings.length > 0 ? (
                ratings.map(rating => (
                  <CommentCard key={rating.id} {...rating}/>
                ))
              ):(
                <Alert variant="info">
                No hay comentarios para este juego aún.
                </Alert>
              )
            }
            
          </Stack>
        </Col>
      </Row>
      {
        user && (
          <CommentModal showModal={showModal} setShowModal={setShowModal} usuario_id={user.id} juego_id={id} onCommentAdded={handleCommentAdded}/>
        )
      }

    </Container>
  );
};
