import React, { useState } from "react";
import {
  Col,
  Container,
  Form,
  Button,
  FloatingLabel,
  Stack,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import "./ManagePassword.scss";

export const ManagePassword = () => {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
  return (
    <Container className="d-flex justify-content-center align-items-center mb-4">
      <Col sm={12} md={5}>
        <Form className="login-form">
          <Stack gap={4}>
            <FloatingLabel
              controlId="floatingPassword"
              label="Introduce la contraseña actual"
              className="d-flex justify-content-end align-items-center"
            >
              <Form.Control
                type={showPassword.current ? "text" : "password"}
                placeholder=""
              />
              <span
                variant="btn-link"
                className="show-password"
                onClick={() => togglePasswordVisibility("current")}
              >
                {showPassword.current ? <FaEyeSlash /> : <FaEye />}
              </span>
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingPassword"
              label="Escribe la nueva contraseña"
              className="d-flex justify-content-end align-items-center"
            >
              <Form.Control
                type={showPassword.new ? "text" : "password"}
                placeholder=""
              />
              <span
                variant="btn-link"
                className="show-password"
                onClick={() => togglePasswordVisibility("new")}
              >
                {showPassword.new ? <FaEyeSlash /> : <FaEye />}
              </span>
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingPassword"
              label="Confirma la nueva contraseña"
              className="d-flex justify-content-end align-items-center"
            >
              <Form.Control
                type={showPassword.confirm ? "text" : "password"}
                placeholder=""
              />
              <span
                variant="btn-link"
                className="show-password"
                onClick={() => togglePasswordVisibility("confirm")}
              >
                {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </FloatingLabel>

            <div className="d-flex gap-3 mb-4">
              <Button size="lg" type="submit" className="flex-fill">
                Actualizar contraseña
              </Button>
              <Button
                variant="secondary"
                size="lg"
                type="submit"
                className="flex-fill"
              >
                Cancelar
              </Button>
            </div>
          </Stack>
        </Form>
      </Col>
    </Container>
  );
};
