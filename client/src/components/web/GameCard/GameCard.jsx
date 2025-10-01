import React, { useContext } from 'react';
import './GameCard.scss';
import { useNavigate } from "react-router-dom";
import { Button, Stack } from 'react-bootstrap';
import { CartContext } from '../../../contexts/CartContext';


export const GameCard = ({ game} ) => {
  const {id, image, title, genre, platform, price} = game;
   const navigate = useNavigate();
  const goToGame = () => navigate(`/games/${game.id}`)

  const { addToCart, cart } = useContext(CartContext);
  const gameAdded = { id, image, title, genre, platform, price}
  
  return (
    <div className="game-card" >
      <div className="game-image">
        <img src={image || '/placeholder-game.jpg'} alt={title} />
      </div>
      <div className="game-info">
        <h3 className="game-title">{title}</h3>
        <p className="game-genre">{genre}</p>
        <p className="game-platform">{platform}</p>
        <div className="game-price">${price}</div>
      </div>
      <Stack direction='horizontal' className='p-3 justify-content-between'>
        <Button variant="secondary"onClick={() => goToGame(game)}>Ver más</Button>
        <Button onClick={()=>{addToCart(gameAdded)}}>Agregar al carrito</Button>
      </Stack>
    </div>
  );
};
