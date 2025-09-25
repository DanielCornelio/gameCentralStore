import React, { useState } from "react";
import { Button, Card, Col, Image, Row, Stack } from "react-bootstrap";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import squadImg from "../../../assets/img/suicide_squad.jpg";
import legendImg from "../../../assets/img/mobile_legend.jpg";
import rivalImg from "../../../assets/img/rivals.png";
import "./PremiereGameCard.scss";

const PremierCard = ({ title, precio, imgSrc }) => {
  const [like, setLike] = useState(false);

  const handleLike = () => setLike(!like);

  return (
    <Card className="game-detail-pcard text-center">
      <Image src={imgSrc} className="premiere-card-img mb-2" rounded />

      <Stack gap={1}>
        <h4 className="m-0">{title}</h4>
        <p className="fw-bold fs-5 text-success">${precio} MXN</p>
        <Stack
          direction="horizontal"
          gap={2}
          className="justify-content-around pb-2"
        >
          <Button size="sm" className="btn-primary">
            Comprar
          </Button>
          <i onClick={handleLike}>
            {like ? (
              <IoHeartSharp size={25} className="heart-outline" />
            ) : (
              <IoHeartOutline size={28} className="heart-outline" />
            )}
          </i>
        </Stack>
      </Stack>
    </Card>
  );
};

export const PremierGameCard = () => {
  const games = [
    {
      title: "Suicide Squad",
      precio: "39.99",
      imgSrc: squadImg,
    },
    {
      title: "Mob Legends",
      precio: "19.99",
      imgSrc: legendImg,
    },
    {
      title: "Marvel Rivals",
      precio: "29.99",
      imgSrc: rivalImg,
    },
    {
      title: "Suicide Squad",
      precio: "39.99",
      imgSrc: squadImg,
    },
    {
      title: "Mob Legends",
      precio: "19.99",
      imgSrc: legendImg,
    },
    {
      title: "Marvel Rivals",
      precio: "29.99",
      imgSrc: rivalImg,
    },
  ];

  return (
    <Row className="mt-5">
      {games.slice(0, 6).map((game, index) => (
        <Col md={2} key={index}>
          <PremierCard {...game} />
        </Col>
      ))}
    </Row>
  );
};
