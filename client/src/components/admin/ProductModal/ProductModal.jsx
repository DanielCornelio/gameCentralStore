import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Badge, Stack } from "react-bootstrap";

export const ProductModal = ({ onSave, onUpdate, productEdit }) => {
  const [show, setShow] = useState(false);
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

  useEffect(() => {
    if (productEdit) {
      setFormData(productEdit);
      setShow(true);
    }
  }, [productEdit]);

  const handleClose = () => {
    setShow(false);
    setFormData({
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
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      onUpdate(formData);
    } else {
      onSave(formData);
    }
    handleClose();
  };

  return (
    <>
      {!productEdit && (
        <Button variant="primary" onClick={() => setShow(true)}>
          Agregar producto
        </Button>
      )}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            {formData.id ? "Editar producto" : "Registrar producto"}
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row className="g-1">
              <div className="mb-4">
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
              </div>

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
            <Button variant="secondary" onClick={handleClose}>
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
