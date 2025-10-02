import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { gamesData, genres, platforms } from '../../../data/games';
import { useGameFilters } from '../../../hooks/useGameFilters';
import { SearchAndFilters, GameCard } from '../../../components/web';
import './Games.scss';
import { SectionTitle } from '../../../components';

export const Games = () => {
  const {
    searchTerm,
    setSearchTerm,
    filters,
    updateFilter,
    sortBy,
    setSortBy,
    filteredGames,
  } = useGameFilters(gamesData);

  return (
    <Container className="games-page">
      <SectionTitle title="Store" />
      <SearchAndFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={filters}
        updateFilter={updateFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        genres={genres}
        platforms={platforms}
      />
      <Row>
        {filteredGames.length > 0 ? (
          filteredGames.map((game) => (
            <Col key={game.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <GameCard game={game} />
            </Col>
          ))
        ) : (
          <Col>
            <p>No se encontraron juegos con esos criterios.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};
