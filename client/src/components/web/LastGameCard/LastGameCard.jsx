import React, { useState } from "react";
import { Button, Card, Col, Image, Row, Stack } from "react-bootstrap";
import "./LastGameCard.scss";
import { Chip } from "../Chip/Chip";
import { FaWindows } from "react-icons/fa";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";


export const LastGameCard = ({ title, image, descripcion, genero, imgSrc }) => {
  const [like, setLike] = useState(false);

  const handleLike = () => setLike(!like);

  return (
    <Card className="p-3 game-detail-card">
      <Row>
        <Col md={5}>
          <Image src={image} className="game-card-img" rounded />
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
