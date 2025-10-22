import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, FloatingLabel, Button } from "react-bootstrap";
import { Toaster, toast } from "react-hot-toast";
import { GameCard } from "../../../components/web";
import gamesService from "../../../api/games";
import "./Games.scss";
import { SectionTitle } from "../../../components";
import { useForm } from "react-hook-form";

export const Games = () => {
  const [games, setGames] = useState([]);
  const [filter, setFilter] = useState({});

  const {
    register,
    handleSubmit,
    watch
  } = useForm();

  // Función para obtener los juegos desde la API (como en home.jsx)
  const getGames = async () => {
    try {
      const data = await gamesService.getGamesFilters();
      setGames(data.games);
    } catch (error) {
      toast.error("Error al cargar los juegos", error);
    }
  };

  // useEffect para cargar los juegos cuando el componente se monta
  useEffect(() => {
    getGames();
  }, []);

  const onSubmit=(async(data) => {
    try {
      setFilter(data)
      debugger
      const response = await gamesService.getGamesFilters(data)
      console.log(response.games)
      setGames(response.games)
    } catch (error) {
      console.log(error)
    }
  })

  const handleChangeLimit = async(l) => {
      
      await onSubmit({...filter, limit:l})
  }



  return (
    <Container className="games-page">
      <Toaster position="top-right" reverseOrder={true} />

      <SectionTitle title="Store" />

      <Row className="mb-5">
        <Form onSubmit={handleSubmit((data)=>{onSubmit(data)})}>
          <div className="mb-4">
            <FloatingLabel label="Titulo">
              <Form.Control
                type="text"
                placeholder=""
                {...register("titulo")}
              />
            </FloatingLabel>
          </div>
          <div className="d-flex gap-4">
          <Col>
            <FloatingLabel label="Plataforma">
              <Form.Select {...register("plataforma")}>
                <option value="">Selecciona una opción</option>
                <option value="PC">PC</option>
                <option value="PlayStation">PlayStation</option>
                <option value="Xbox">Xbox</option>
                <option value="Nintendo">Nintendo</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel label="Genero">
              <Form.Select {...register("genero")}>
                <option value="">Selecciona una opción</option>
                <option value="accion">Acción</option>
                <option value="aventura">Aventura</option>
                <option value="rpg">RPG</option>
                <option value="estrategia">Estrategia</option>
                <option value="deportes">Deportes</option>
                <option value="shooter">Shooter</option>
                <option value="horror">Horror</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel label="Ordenar">
              <Form.Select {...register("order_by")}>
                <option value="">Selecciona una opción</option>
                <option value="precio_ASC">Menor Precio</option>
                <option value="precio_DESC">Mayor Precio</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col><Button  type="submit">Filtrar</Button></Col>
          </div>
        </Form>
      </Row>
      <Row className="d-flex justify-content-end mb-5">
        <Col md={1}>
            <FloatingLabel label="Mostrar">
              <Form.Select onChange={(e)=>handleChangeLimit(e.target.value)} className="text-center">
                <option value="10">10</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
      </Row>

      <Row>
        {games?.length > 0 ? (
          games?.map((game) => (
            <Col key={game.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <GameCard {...game} />
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
