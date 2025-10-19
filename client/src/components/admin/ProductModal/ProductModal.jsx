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

export const ProductModal = ({ showModal, setShowModal, onSave, onUpdate, productEdit, user, onCommentAdded }) => {
  
  const [formData, setFormData] = useState({
    id: null,
    titulo: "",
    imagen: null,
    descripcion: "",
    plataforma: "",
    genero: "",
    activo: true,
    stock: "",
    precio: "",
  });


  const handleCloseModal = () => {
    reset();
    setShowModal(false);
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  

  useEffect(() => {
    if (productEdit) {
      setFormData(productEdit);
      setShow(true);
    }
  }, [productEdit]);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevState) => ({
        ...prevState,
        imagen: file,
      }));
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await gamesService.createGame({
        ...data,
        usuario_id: user.id,
      });
      toast.success(response.message);
      reset();
      if (onCommentAdded) {
        onCommentAdded(); // Llamar a la función de éxito
      }
    } catch (error) {
      console.log(error)
      toast.error("Error al crear el juego");
    }
  });

  return (
    <>

      <Modal show={showModal} backdrop="static" keyboard={false} centered size="md">
        <Modal.Header className="border-0">
          <Modal.Title>
            {formData.id ? "Editar producto" : "Registrar producto"}
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
                          valueAsNumber: true,
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

              {/* <div className="mb-4">
                <Form.Group className="mb-3">
                  <Form.Label>Título*</Form.Label>
                  <Form.Control
                    type="text"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    placeholder="Ingresa el título del producto"
                    required
                    autoFocus
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Subir imagen*</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                  />
                  <Form.Text className="text-muted">
                    Formatos aceptados: JPG, PNG, GIF. Tamaño máximo: 5MB
                  </Form.Text>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Descripción*</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    placeholder="Describe el producto"
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="Cantidad en stock"
                    min="0"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    type="number"
                    name="precio"
                    value={formData.precio}
                    onChange={handleChange}
                    placeholder="Precio del producto"
                    min="0"
                    step="0.01"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Plataforma</Form.Label>
                  <Form.Select
                    name="plataforma"
                    value={formData.plataforma}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar</option>
                    <option value="PC">PC</option>
                    <option value="PlayStation">PlayStation</option>
                    <option value="Xbox">Xbox</option>
                    <option value="Nintendo">Nintendo</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Género</Form.Label>
                  <Form.Select
                    name="genero"
                    value={formData.genero}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar</option>
                    <option value="Acción">Acción</option>
                    <option value="Aventura">Aventura</option>
                    <option value="RPG">RPG</option>
                    <option value="Estrategia">Estrategia</option>
                    <option value="Deportes">Deportes</option>
                    <option value="Shooter">Shooter</option>
                    <option value="Shooter">Horror</option>
                  </Form.Select>
                </Form.Group>
              </div> */}

              <Col md={12}>
                <Form.Check
                  type="checkbox"
                  name="activo"
                  label="Activo"
                  checked={formData.activo}
                  onChange={handleChange}
                />
              </Col>
            </Row>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {formData.id ? "Actualizar" : "Guardar"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};
