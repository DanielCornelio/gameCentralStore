import React from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";
import { GameDetailCard, SectionTitle } from "../../../components";
import { CommentCard } from "../../../components/web/CommentCard/CommentCard";

export const GameDetail = () => {
  return (
    <Container>
      <GameDetailCard />
      <SectionTitle title="Comentarios" />
      <Row>
        <Col md={4}>
        
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
