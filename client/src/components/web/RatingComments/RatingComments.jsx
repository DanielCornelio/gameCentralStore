import React from "react";
import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
import './RatingComments.scss'

export const RatingComments = () => {
  return (
    <Stack gap={3}>
      <Card className="bg-gray text-light p-3">
        <h2 className="rating-comments-quantity">4.8</h2>
        <p>1.1k comentarios en total</p>
        <Stack>
          <Stack direction="horizontal" gap={2}>
            <span>5</span> 
            <ProgressBar className="w-75" now={94} />
            <span>94%</span>
          </Stack>
          <Stack direction="horizontal" gap={2} >
            <span>4</span> 
            <ProgressBar className="w-75" now={3} />
            <span>3%</span>
          </Stack>
          <Stack direction="horizontal" gap={2}>
            <span>3</span> 
            <ProgressBar className="w-75" now={1} />
            <span>1%</span>
          </Stack>
          <Stack direction="horizontal" gap={2}>
            <span>2</span> 
            <ProgressBar className="w-75" now={60} />
            <span>60%</span>
          </Stack>
          <Stack direction="horizontal" gap={2}>
            <span>1</span> 
            <ProgressBar className="w-75" now={20} />
            <span>20%</span>
          </Stack>
        </Stack>
      </Card>
      <Button size="lg">Agregar Comentario</Button>
    </Stack>
  );
};
