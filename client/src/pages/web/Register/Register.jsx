import React, { useState } from 'react';
import { Button, Col, Container, FloatingLabel, Form, FormGroup, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import './Register.scss';

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const togglePasswordVisibility = (e) => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = (e) => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <Container className="register d-flex justify-content-center align-items-center">
      <Col sm={12} md={5}>
        <h2 className="text-center mb-5">Crear Cuenta</h2>
        <Form className="login-form">
          <Stack gap={4}>
            {/* Email */}
            <FloatingLabel controlId="floatingInput" label="Ingresa tu email">
              <Form.Control type="email" placeholder="name@example.com" />
            </FloatingLabel>

            {/* Password */}
            <FloatingLabel controlId="floatingPassword" label="Ingresa tu contraseña" className="d-flex justify-content-end align-items-center">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />
              <span
                variant="btn-link"
                className="show-password"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </FloatingLabel>

            {/* Confirm Password */}
            <FloatingLabel controlId="floatingPassword" label="Confirma tu contraseña" className="d-flex justify-content-end align-items-center">
              <Form.Control
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Password"
              />
              <span
                variant="btn-link"
                className="show-password"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </FloatingLabel>

            <FormGroup>
              <Form.Check.Input type="checkbox" className='check' aria-label="terms" />
              <Form.Check.Label className='ms-2' aria-label="terms">Acepto los <Link className='btn-link' onClick={() => setShowModal(true)}>términos y condiciones</Link></Form.Check.Label>
            </FormGroup>

            <div className="d-grid">
              <Button size="lg" type="submit">
                Crear Cuenta
              </Button>
            </div>
            <p className='text-center'>
              ¿Ya tienes una cuenta?{" "}
              <Link className="btn-link" to={"/login"}>
                Inicia Sesión
              </Link>
            </p>
          </Stack>
        </Form>
      </Col>
    </Container>
  )
}
