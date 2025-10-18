import React, { useState } from "react";
import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
import './RatingComments.scss'
import { CommentModal } from "../CommentModal";


export const RatingComments = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <Stack gap={3}>
      <Button size="lg" onClick={() => setShowModal(true)}>Agregar Comentario</Button>
      <CommentModal showModal={showModal} setShowModal={setShowModal} />

    </Stack>
  );
};
