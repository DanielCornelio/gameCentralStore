import React, { useContext, useEffect, useState } from 'react';
import './FavoriteGameCard.scss';
import { useNavigate } from "react-router-dom";
import { Button, Card, Image, Stack } from 'react-bootstrap';
import { CartContext } from '../../../contexts/CartContext';
import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5';
import { Chip } from '../Chip';
import { FavoriteContext } from '../../../contexts/FavoriteContext';
import { UserContext } from '../../../contexts/UserContext';
import toast, { Toaster } from 'react-hot-toast';


export const FavoriteGameCard = ({ id, usuario_id, juego_id, portada_url, titulo, genero, plataforma, precio }) => {
  // const {id, portada_url, titulo, genero, plataforma, precio} = game;
  const navigate = useNavigate();
  const goToGame = () => navigate(`/games/${juego_id}`)

  const { addToCart, cart } = useContext(CartContext);
  const gameAdded = { id, portada_url, titulo, genero, plataforma, precio }

 const [isLiked, setIsLiked] = useState(false);
  const { addFavorite, removeFavorites, listFavorites, setListFavorites} = useContext(FavoriteContext);
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
      juego_id: juego_id
    };
    try {
      if (isLiked) {
        // Remover de favoritos
        const response = await removeFavorites(data);
        setListFavorites(listFavorites)
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
    <div className="game-card" >
      <div className="game-image position-relative">
        <img src={portada_url || '/placeholder-game.jpg'} alt={titulo} />
        <i className='z-3 position-absolute'
          onClick={handleLike}
          style={{ cursor: 'pointer', zIndex:'10', right:'20px'}}
          title={isLiked ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          {isLiked ? (
            <IoHeartSharp size={30} className="heart-outline" />
          ) : (
            <IoHeartOutline size={30} className="heart-outline" />
          )}
        </i>
      </div>
      <div className="game-info">
        <h3 className="game-title text-truncate">{titulo}</h3>
        <p className="game-genre"><Chip title={genero} /></p>
        <p className="game-platform">{plataforma}</p>
        <div className="game-price">${precio}</div>
      </div>
      <Stack direction='horizontal' className='p-3 justify-content-between' gap={2}>
        <Button variant="secondary" onClick={() => goToGame(juego_id)} className='lh-1'>Ver más</Button>
        <Button onClick={() => { addToCart(gameAdded) }} className='lh-1'>Agregar al carrito</Button>
      </Stack>
    </div>
  );
};
