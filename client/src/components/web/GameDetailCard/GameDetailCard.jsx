import React, { useState } from "react";
import { Button, Card, Col, Image, Row, Stack } from "react-bootstrap";
import "./GameDetailCard.scss";
import { Chip } from "../Chip/Chip";
import { FaWindows } from "react-icons/fa";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";


export const GameDetailCard = (info) => {
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
                src={info.image}
                className="w-100"
                rounded
              />
            </Col>
            <Col>
              <Stack gap={3}>
                <Stack direction="horizontal" className="justify-content-between align-content-center">
                  <h3 className="m-0">{info.title}</h3>
                  <i onClick={handleLike}>{like ? <IoHeartSharp size={30} className="heart-outline" /> : <IoHeartOutline size={30} className="heart-outline" />}</i>
                </Stack>
                <Stack direction="vertical">
                  <p className="fw-bold">
                    Género:
                  </p>
                  <div>
                    <Chip title={info.genre} />
                  </div>
                </Stack>
                <Stack direction="vertical">
                  <p className="fw-bold">Fecha de lanzamiento:</p>
                  <p>{info.release}</p>
                </Stack>
                <p>
                  Resident Evil 0 revela el misterio que se oculta tras el incidente
                  en la mansión, evento que pone en marcha todos los sucesos de la
                  serie de Resident Evil. Esta versión remasterizada presenta la
                  historia y el juego originales con gráficos asombrosos de calidad
                  HD, sonido envolvente de 5.1 canales, controles opcionales
                  modernizados y compatibilidad con TV de pantalla ancha. Prepárate
                  para descubrir los terribles secretos que se ocultan en el origen
                  del mal.
                </p>
              </Stack>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col>
        <Stack className="box">
          <div>
            <p>Plataformas disponibles</p>
            <FaWindows size={25} />
          </div>
          <div className="">
            <Stack>
              <p>Precio</p>
              <h2>$ 850.00 MXN</h2>
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
