import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Toaster, toast } from 'react-hot-toast';
import { genres, platforms } from '../../../data/games';
import { useGameFilters } from '../../../hooks/useGameFilters';
import { SearchAndFilters, GameCard } from '../../../components/web';
import gamesService from '../../../api/games';
import './Games.scss';
import { SectionTitle } from '../../../components';

export const Games = () => {
  const [gamesData, setGamesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    searchTerm,
    setSearchTerm,
    filters,
    updateFilter,
    sortBy,
    setSortBy,
    filteredGames,
  } = useGameFilters(gamesData);

  // Función para obtener los juegos desde la API (como en home.jsx)
  const getGames = async () => {
    try {
      setLoading(true);
      const data = await gamesService.getAllGames();
      setGamesData(data);
    } catch (error) {
      toast.error("Error al cargar los juegos");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect para cargar los juegos cuando el componente se monta
  useEffect(() => {
    getGames();
  }, []);

  return (
    <Container className="games-page">
      <Toaster position="top-right" reverseOrder={true} />
      
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

      {/* Manejo del estado de carga */}
      {loading && (
        <Row>
          <Col>
            <p className="text-center">Cargando juegos...</p>
          </Col>
        </Row>
      )}

      {/* Renderizado de juegos con filtros aplicados */}
      {!loading && (
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
      )}
    </Container>
  );
};