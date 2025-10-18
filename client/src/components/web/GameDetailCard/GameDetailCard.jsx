import React, { useState } from "react";
import { Button, Card, Col, Image, Row, Stack } from "react-bootstrap";
import "./GameDetailCard.scss";
import { Chip } from "../Chip/Chip";
import { FaWindows } from "react-icons/fa";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";


export const GameDetailCard = ({ portada_url, titulo, genero,fecha_lanzamiento, descripcion, plataforma, precio, desarrollador}) => {
  const [like, setLike] = useState(false);

  const handleLike = () => {
    setLike(!like)
  }

  return (
    <Row className="mt-5">
      <Col md={9}>
        <Card className="p-3 game-detail-card">
          <Row>
            <Col md={3}>
              <Image
                src={portada_url}
                className="w-100"
                rounded
              />
            </Col>
            <Col>
              <Stack gap={3}>
                <Stack direction="horizontal" className="justify-content-between align-content-center">
                  <h3 className="m-0">{titulo}</h3>
                  <i onClick={handleLike}>{like ? <IoHeartSharp size={30} className="heart-outline" /> : <IoHeartOutline size={30} className="heart-outline" />}</i>
                </Stack>
                <Stack direction="vertical" gap={3}>
                  <span><Chip title={genero} /></span>
                  <p className="mb-0"><span className="fw-bold">Fecha de lanzamiento:</span> {new Date(fecha_lanzamiento).toLocaleDateString()}</p>
                  <p className="mb-0">{descripcion}</p>
                </Stack>
              </Stack>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col>
        <Stack className="box pt-3 ">
          <div>
            <h5>Plataformas disponibles</h5>
            {plataforma}
            <p>Desarrollador: {desarrollador}</p>
          </div>
          <div className="">
            <Stack>
              <p>Precio</p>
              <h2>$ {precio}</h2>
            </Stack>
            <Stack className="d-grid" gap={3}>
              <Button size="lg">
                Comprar ahora
              </Button>
              <Button size="lg" className="btn-secondary">Agregar al Carrito</Button>
            </Stack>
          </div>
        </Stack>
      </Col>
    </Row>
  );
};
