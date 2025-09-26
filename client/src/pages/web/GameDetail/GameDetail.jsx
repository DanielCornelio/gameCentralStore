import React, { useState } from "react";
import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap";
import { GameDetailCard, SectionTitle, RatingComments, CommentModal } from "../../../components";
import { CommentCard } from "../../../components/web/CommentCard/CommentCard";

export const GameDetail = () => {
  
  return (
    <Container>
      <GameDetailCard />
      <SectionTitle title="Comentarios" />
      <Row>
        <Col md={3}>
          <RatingComments />
        </Col>
        <Col>
          <Stack gap={4}>
            <CommentCard />
            <CommentCard />
            <CommentCard />
            <CommentCard />
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};
