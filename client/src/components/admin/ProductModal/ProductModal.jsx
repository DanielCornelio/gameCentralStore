import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Badge,
  Stack,
  FloatingLabel,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import gamesService from "../../../api/games";
import toast from "react-hot-toast";
import { GrClose } from "react-icons/gr";

export const ProductModal = ({ showModal, setShowModal, onCommentAdded, productEdit, onUpdate, user  }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const activoValue = watch("activo");

  // 🔥 Efecto para prellenar formulario cuando hay edición
  useEffect(() => {
    if (productEdit) {
      // Prellenar todos los campos con los datos del producto a editar
      setValue("titulo", productEdit.titulo);
      setValue("portada_url", productEdit.portada_url);
      setValue("descripcion", productEdit.descripcion);
      setValue("stock", productEdit.stock);
      setValue("precio", productEdit.precio);
      setValue("plataforma", productEdit.plataforma);
      setValue("genero", productEdit.genero);
      setValue("activo", productEdit.activo);
    } else {
      // Resetear formulario para nuevo producto
      reset({
        titulo: "",
        portada_url: "",
        descripcion: "",
        stock: 0,
        precio: 0,
        plataforma: "",
        genero: "",
        activo: true
      });
    }
  }, [productEdit, setValue, reset, showModal]);
  
    const handleCloseModal = () => {
    reset();
    setShowModal(false);
    onCommentAdded()
  }



  
  const onSubmit = handleSubmit(async (data) => {
    try {
      if (productEdit) {
        // 🔥 MODO EDICIÓN - Usar onUpdate
        await onUpdate(data);

      } else {
        const response = await gamesService.createGame({
        ...data,
        usuario_id: user.id,
      });
      toast.success(response.message);
      reset();
      if (onCommentAdded) {
        onCommentAdded(); // Llamar a la función de éxito
      }
    }
    } catch (error) {
      console.log(error);
      const errorMessage = productEdit 
        ? "Error al actualizar el juego" 
        : "Error al crear el juego";
      toast.error(errorMessage);
    }
  });

  return (
    <>

      <Modal show={showModal} backdrop="static" keyboard={false} centered size="md">
        <Modal.Header className="border-0">
          <Modal.Title>
            {productEdit ? "Editar producto" : "Registrar producto"}
          </Modal.Title>
          <GrClose size={20} className="btn-close" onClick={handleCloseModal} />
        </Modal.Header>

        <Form onSubmit={onSubmit}>
          <Modal.Body>
            <Row className="g-1">
              <div className="mb-2">
                <FloatingLabel label="Título">
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...register("titulo", {
                      required: "El título es requerido",
                    })}
                  />
                </FloatingLabel>
                {errors.titulo && (
                  <span className="text-error">{errors.titulo.message}</span>
                )}
              </div>

              <div className="mb-2">
                <FloatingLabel label="URL imagen">
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...register("portada_url", {
                      required: "La url de la imagen es requerida",
                    })}
                  />
                </FloatingLabel>
                {errors.portada_url && (
                  <span className="text-error">
                    {errors.portada_url.message}
                  </span>
                )}
              </div>

              <div className="mb-2">
                <FloatingLabel
                  label="Descripción"
                  className="custom-floating-label"
                >
                  <Form.Control
                    as="textarea"
                    placeholder=""
                    style={{ height: "150px" }}
                    {...register("descripcion", {
                      required: "La descripcion es requerida",
                    })}
                  />
                </FloatingLabel>
                {errors.descripcion && (
                  <span className="text-error">
                    {errors.descripcion.message}
                  </span>
                )}
              </div>

              <div className="d-flex gap-3">
                <Col>
                  <div className="mb-3">
                    <FloatingLabel label="Stock">
                      <Form.Control
                        type="number"
                        placeholder=""
                        {...register("stock", {
                          required: "El stock es requerido",
                          
                          min:2
                        })}
                      />
                    </FloatingLabel>
                    {errors.stock && (
                      <span className="text-error">{errors.stock.message}</span>
                    )}
                  </div>
                </Col>
                <Col>
                  <div className="mb-3">
                    <FloatingLabel label="Precio">
                      <Form.Control
                        type="number"
                        placeholder=""
                        {...register("precio", {
                          required: "El precio es requerido",
                          valueAsNumber: true,
                        })}
                      />
                    </FloatingLabel>
                    {errors.precio && (
                      <span className="text-error">
                        {errors.precio.message}
                      </span>
                    )}
                  </div>
                </Col>
              </div>

              <div className="d-flex gap-3">
                <Col>
                  <div className="mb-2">
                    <FloatingLabel
                      label="Plataforma"
                    >
                      <Form.Select
                        {...register("plataforma", {
                          required: "Debes seleccionar una opción",
                        })}
                      >
                        <option>Selecciona una opción</option>
                        <option value="PC">PC</option>
                        <option value="PlayStation">PlayStation</option>
                        <option value="Xbox">Xbox</option>
                        <option value="Nintendo">Nintendo</option>
                      </Form.Select>
                    </FloatingLabel>
                    {errors.plataforma && (
                      <span className="text-error">
                        {errors.plataforma.message}
                      </span>
                    )}
                  </div>
                </Col>
                <Col>
                  <div>
                    <FloatingLabel label="Genero">
                      <Form.Select
                        {...register("genero", {
                          required: "Debes seleccionar una opción",
                        })}
                      >
                        <option>Selecciona una opción</option>
                        <option value="Acción">Acción</option>
                        <option value="Aventura">Aventura</option>
                        <option value="RPG">RPG</option>
                        <option value="Estrategia">Estrategia</option>
                        <option value="Deportes">Deportes</option>
                        <option value="Shooter">Shooter</option>
                        <option value="Shooter">Horror</option>
                      </Form.Select>
                    </FloatingLabel>
                    {errors.genero && (
                      <span className="text-error">
                        {errors.genero.message}
                      </span>
                    )}
                  </div>
                </Col>
              </div>

              <Col md={12}>
                <Form.Check
                  type="checkbox"
                  name="activo"
                  label="Activo"
                  {...register("activo",{
                    
                  })}
                checked={activoValue}
                onChange={(e) => setValue("activo", e.target.checked)}
                />
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {productEdit ? "Actualizar" : "Guardar"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
