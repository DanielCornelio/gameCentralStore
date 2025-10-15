import React, { useContext, useState } from "react";
import { Button, Card, Col, Image, Row, Stack } from "react-bootstrap";
import "./LastGameCard.scss";
import { Chip } from "../Chip/Chip";
import { FaWindows } from "react-icons/fa";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { FavoriteContext } from "../../../contexts/FavoriteContext";
import favoritesService from "../../../api/favorites";
import { UserContext } from "../../../contexts/UserContext";


export const LastGameCard = ({ id, portada_url, titulo, genero, descripcion, plataforma, precio }) => {
  const [like, setLike] = useState(false);
  const {addFavorite} = useContext(FavoriteContext)
  const {user} = useContext(UserContext);

  const data = {
    usuario_id: user?.id,
    juego_id: id
  }

  console.log("data ", data)
  
  const handleLike = async () => {
    const newLikeState = !like;
    try {
      if(newLikeState){
        const response = await favoritesService.addToFavorite(data)
        setLike(true);
        console.log("Juego agregado a favoritos:", response.data);
      }
    } catch (error) {
      console.error("Error al manejar favoritos:", error);
        
        // 💡 Manejo de errores: Si el error es 401 (No autorizado),
        // quizás quieras redirigir al usuario al login.
        if (error?.response && error?.response.status === 401) {
             alert("Debes iniciar sesión para agregar favoritos.");
        }
        // No actualizamos el estado 'like' si la petición falla
    }
  }

  

  return (
    <Card className="p-3 game-detail-card">
      <Row>
        <Col md={5}>
          <Image src={portada_url} alt={titulo} className="game-card-img" rounded />
        </Col>
        <Col>
          <Stack gap={3}>
            <Stack
              direction="horizontal"
              className="justify-content-between align-content-center"
            >
              <h3 className="m-0">{titulo}</h3>
              <i onClick={handleLike}>
                {like ? (
                  <IoHeartSharp size={30} className="heart-outline" />
                ) : (
                  <IoHeartOutline size={30} className="heart-outline" />
                )}
              </i>
            </Stack>
            <span>
              <Chip title={genero} />
            </span>
            <p>{descripcion}</p>
            <div>
              <Button size="sm" className="btn-primary mt-4">
                Comprar
              </Button>
            </div>
          </Stack>
        </Col>
      </Row>
    </Card>
  );
};
