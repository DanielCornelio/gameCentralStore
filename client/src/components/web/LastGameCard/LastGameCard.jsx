import React, { useState } from "react";
import { Button, Card, Col, Image, Row, Stack } from "react-bootstrap";
import "./LastGameCard.scss";
import { Chip } from "../Chip/Chip";
import { FaWindows } from "react-icons/fa";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import residentImg from "../../../assets/img/resident-evi-0.jpg";
import legendImg from "../../../assets/img/mobile_legend.jpg";

const GameCard = ({ title, descripcion, genero, imgSrc }) => {
  const [like, setLike] = useState(false);

  const handleLike = () => setLike(!like);

  return (
    <Card className="p-3 game-detail-card">
      <Row>
        <Col md={5}>
          <Image src={imgSrc} className="game-card-img" rounded />
        </Col>
        <Col>
          <Stack gap={3}>
            <Stack
              direction="horizontal"
              className="justify-content-between align-content-center"
            >
              <h3 className="m-0">{title}</h3>
              <i onClick={handleLike}>
                {like ? (
                  <IoHeartSharp size={30} className="heart-outline" />
                ) : (
                  <IoHeartOutline size={30} className="heart-outline" />
                )}
              </i>
            </Stack>
            <p>{descripcion}</p>
            <Stack direction="vertical">
              <p className="fw-bold">Género:</p>
              <div>
                <Chip title={genero} />
              </div>
            </Stack>
            <Stack>
              <div>
                <Button size="sm" className="btn-primary mt-4">
                  Comprar
                </Button>
              </div>
            </Stack>
          </Stack>
        </Col>
      </Row>
    </Card>
  );
};

export const LastGameCard = () => {
  const games = [
    {
      title: "Resident Evil 0",
      descripcion:
        "Resident Evil 0 revela el misterio que se oculta tras el incidente en la mansión, evento que pone en marcha todos los sucesos de la serie de Resident Evil.",
      genero: "Terror",
      imgSrc: residentImg,
    },
    {
      title: "Resident Evil 0",
      descripcion:
        "Resident Evil 0 revela el misterio que se oculta tras el incidente en la mansión, evento que pone en marcha todos los sucesos de la serie de Resident Evil.",
      genero: "Terror",
      imgSrc: legendImg,
    },
    {
      title: "Resident Evil 0",
      descripcion:
        "Resident Evil 0 revela el misterio que se oculta tras el incidente en la mansión, evento que pone en marcha todos los sucesos de la serie de Resident Evil.",
      genero: "Terror",
      imgSrc: residentImg,
    },
  ];

  return (
    <Row className="mt-5">
      {games.slice(0, 2).map((game, index) => (
        <Col md={6} key={index}>
          <GameCard {...game} />
        </Col>
      ))}
    </Row>
  );
};
