
import React from 'react';
import './GameCard.scss';

export const GameCard = ({ game, onGameClick }) => {
  return (
    <div className="game-card" onClick={() => onGameClick && onGameClick(game)}>
      <div className="game-image">
        <img src={game.image || '/placeholder-game.jpg'} alt={game.title} />
      </div>
      <div className="game-info">
        <h3 className="game-title">{game.title}</h3>
        <p className="game-genre">{game.genre}</p>
        <p className="game-platform">{game.platform}</p>
        <div className="game-price">${game.price}</div>
      </div>
    </div>
  );
};
