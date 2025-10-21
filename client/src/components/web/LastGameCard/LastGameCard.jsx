import React, { useContext, useState, useEffect } from "react";
import { Button, Card, Col, Image, Row, Stack } from "react-bootstrap";
import "./LastGameCard.scss";
import { Chip } from "../Chip/Chip";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { FavoriteContext } from "../../../contexts/FavoriteContext";
import { UserContext } from "../../../contexts/UserContext";
import toast, { Toaster } from "react-hot-toast";

export const LastGameCard = ({ id, portada_url, titulo, genero, descripcion, plataforma, precio }) => {
  const [isLiked, setIsLiked] = useState(false);
  const { addFavorite, removeFavorites, listFavorites} = useContext(FavoriteContext);
  const { user, token } = useContext(UserContext);


  // Verificar si el juego está en favoritos al cargar el componente
  useEffect(() => {
    if (user && listFavorites) {
      const isGameLiked = listFavorites.some(fav => 
        fav.juego_id === id || fav.id === id
      );
      setIsLiked(isGameLiked);
    }
  }, [listFavorites, user, id]);

  const handleLike = async () => {
    if (!user || !token) {
      toast.error('Debes iniciar sesión para gestionar favoritos');
      return;
    }

    const data = {
      usuario_id: user.id,
      juego_id: id
    };
    console.log(data)
    try {
      if (isLiked) {
        // Remover de favoritos
        const response = await removeFavorites(data);
        if (!response.error) {
          setIsLiked(false);
          toast.success("El juego se ha eliminado de tus favoritos")
        }
      } else {
        // Agregar a favoritos
        const response = await addFavorite(data);
        if (!response.error) {
          setIsLiked(true);
          toast.success("El juego se ha agregado a tus favoritos")

        }
      }
    } catch (error) {
      console.error('Error en la gestión de favoritos:', error);
      // Revertir el estado en caso de error
      setIsLiked(!isLiked);
    }
  };

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
              <h3 className="m-0 text-truncate" style={{width:'260px'}}>{titulo}</h3>
              <i 
                onClick={handleLike} 
                style={{ cursor: 'pointer' }}
                title={isLiked ? "Quitar de favoritos" : "Agregar a favoritos"}
              >
                {isLiked ? (
                  <IoHeartSharp size={30} className="heart-outline"  />
                ) : (
                  <IoHeartOutline size={30} className="heart-outline" />
                )}
              </i>
            </Stack>
            <span>
              <Chip title={genero} />
            </span>
            <p className="mb-0" style={{height: 165,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 7, // Número de líneas que quieres mostrar
              textOverflow: 'ellipsis',
              whiteSpace: 'normal'}}>{descripcion}</p>
            <div>
            </div>
          </Stack>
        </Col>
      </Row>
    </Card>
  );
};