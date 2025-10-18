import React from "react";
import { Modal, Button, Form, FloatingLabel, Stack } from "react-bootstrap";
import { GrClose } from "react-icons/gr";
import "./CommentModal.scss";
import { useForm } from "react-hook-form";
import ratingsService from "../../../api/ratings";
import toast from "react-hot-toast";


export const CommentModal = ({ showModal, setShowModal, usuario_id, juego_id, onCommentAdded }) => {
  const handleCloseModal = () => setShowModal(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = handleSubmit( async (data) => {
    try {
      const response = await ratingsService.createRatings({...data, usuario_id, juego_id})
      toast.success(response.message);
      if (onCommentAdded) {
      onCommentAdded(); // Llamar a la función de éxito
    }
    } catch (error) {
      toast.error('Error al crear el usuario')
    }
  })


  return (
    <>
      <Modal size="lg" show={showModal} backdrop="static" keyboard={false}>
        <Modal.Header className="d-flex justify-content-between align-items-center border-0">
          <Modal.Title>¿Qué te pareció Resident Evil 0?</Modal.Title>
          <GrClose size={20} className="btn-close" onClick={handleCloseModal} />
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Stack gap={4}>
              <div>
                <FloatingLabel
                controlId="floatingSelect"
                label="Calificación"
              >
                <Form.Select  {...register("calificacion",{
                    required: "Debes seleccionar una opción"
                })}>
                  <option>Selecciona una opción</option>
                  <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
                  <option value="4">⭐️⭐️⭐️⭐️</option>
                  <option value="3">⭐️⭐️⭐️</option>
                  <option value="2">⭐️⭐️</option>
                  <option value="1">⭐️</option>
                </Form.Select>
              </FloatingLabel>
              {
                    errors.calificacion && <span className="text-error">{errors.calificacion.message}</span>
              }
              </div>
              
              <div>
                <FloatingLabel controlId="floatingInput" label="Agregar título">
                <Form.Control type="text" placeholder="" 
                {...register("titulo",{
                    required: "El titulo es requerido",

                })}
                />
              </FloatingLabel>
                {
                    errors.titulo && <span className="text-error">{errors.titulo.message}</span>
                }
              </div>

              <div>
                <FloatingLabel
                controlId="floatingTextarea2"
                label="Deja tu comentario"
                className="custom-floating-label"
              >
                <Form.Control
                  as="textarea"
                  placeholder=""
                  style={{ height: "150px" }}
                  {...register("comentario",{
                    required: "El comentario es requerido",
                    maxLength:{
                        value: 300,
                        message: "Superaste el limite de caracteres"
                    }
                  })}
                />
              </FloatingLabel>
              {
                errors.comentario && <span className="text-error">{errors.comentario.message}</span>
              }
              </div>

              <div className="d-grid">
                <Button size="lg" type="submit">
                  Enviar
                </Button>
              </div>
            </Stack>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
