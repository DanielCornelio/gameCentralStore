import React, { useState } from "react";
import "./PersonalInfo.scss";
import mariaImg from "./maria.jpg";
import {
  Container,
  Col,
  Row,
  Form,
  FloatingLabel,
  Button,
  Stack,
  Image,
} from "react-bootstrap";

export const PersonalInfo = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos guardados:", formData);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Col sm={12} md={10} lg={8}>
        <Row className="g-4">
          <Col sm={12} md={4} className="d-flex flex-column align-items-center">
            <div className="text-center mb-3">
              <Image
                src={mariaImg}
                roundedCircle
                fluid
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
                className="border"
              />
            </div>
          </Col>

          <Col sm={12} md={8}>
            <Form className="personal-info-form" onSubmit={handleSubmit}>
              <Stack gap={4}>
                <Row>
                  <Col sm={6}>
                    <FloatingLabel controlId="floatingNombre" label="Nombre">
                      <Form.Control
                        type="text"
                        placeholder=""
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        autoComplete="name"
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm={6}>
                    <FloatingLabel
                      controlId="floatingApellido"
                      label="Apellido"
                    >
                      <Form.Control
                        type="text"
                        placeholder=""
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        autoComplete="family-name"
                      />
                    </FloatingLabel>
                  </Col>
                </Row>

                <Row>
                  <Col sm={6}>
                    <FloatingLabel
                      controlId="floatingEmail"
                      label="Correo electrónico"
                    >
                      <Form.Control
                        type="email"
                        placeholder=""
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                      />
                    </FloatingLabel>
                  </Col>
                  <Col sm={6}>
                    <FloatingLabel
                      controlId="floatingTelefono"
                      label="Número de contacto"
                    >
                      <Form.Control
                        type="tel"
                        placeholder=""
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        autoComplete="tel"
                      />
                    </FloatingLabel>
                  </Col>
                </Row>

                <div>
                  <Button size="lg" type="submit">
                    Guardar cambios
                  </Button>
                </div>
              </Stack>
            </Form>
          </Col>
        </Row>
      </Col>
    </Container>
  );
};
