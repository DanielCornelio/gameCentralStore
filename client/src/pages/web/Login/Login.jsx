import React, { useState } from "react";
import "./Login.scss";
import {
  Col,
  Container,
  Form,
  Button,
  FloatingLabel,
  Stack,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Container className="login d-flex justify-content-center align-items-center">
      <Col sm={12} md={5}>
        <h2 className="text-center mb-5">Inicia Sesión</h2>
        <Form className="login-form">
          <Stack gap={4}>
            <FloatingLabel controlId="floatingInput" label="Ingresa tu email">
              <Form.Control type="email" placeholder="name@example.com" autoComplete="email"/>
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label="Ingresa tu contraseña" className="d-flex justify-content-end align-items-center">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                autoComplete="new-password"
              />
              <span
                variant="btn-link"
                className="show-password"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </FloatingLabel>
            <div className="d-grid">
              <Button size="lg" type="submit">
                Entrar
              </Button>
            </div>
            <p className="text-center">
              ¿Es la primera vez que estas aquí?{" "}
              <Link className="btn-link" to={"/register"}>
                Crea una cuenta
              </Link>
            </p>
          </Stack>
        </Form>
      </Col>
    </Container>
  );
};
