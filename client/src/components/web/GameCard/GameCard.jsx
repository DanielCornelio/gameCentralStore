import React, { useContext } from 'react';
import './GameCard.scss';
import { useNavigate } from "react-router-dom";
import { Button, Stack } from 'react-bootstrap';
import { CartContext } from '../../../contexts/CartContext';


export const GameCard = ( {id, portada_url, titulo, genero, plataforma, precio} ) => {
  // const {id, portada_url, titulo, genero, plataforma, precio} = game;
   const navigate = useNavigate();
  const goToGame = () => navigate(`/games/${id}`)

  const { addToCart, cart } = useContext(CartContext);
  const gameAdded = { id, portada_url, titulo, genero, plataforma, precio}
  
  const handleAddToCart = () => {
    
  }

  return (
    <div className="game-card" >
      <div className="game-image">
        <img src={portada_url || '/placeholder-game.jpg'} alt={titulo} />
      </div>
      <div className="game-info">
        <h3 className="game-title">{titulo}</h3>
        <p className="game-genre">{genero}</p>
        <p className="game-platform">{plataforma}</p>
        <div className="game-price">${precio}</div>
      </div>
      <Stack direction='horizontal' className='p-3 justify-content-between'>
        <Button variant="secondary"onClick={() => goToGame(id)}>Ver más</Button>
        <Button onClick={()=>{addToCart(gameAdded)}}>Agregar al carrito</Button>
      </Stack>
    </div>
  );
};
