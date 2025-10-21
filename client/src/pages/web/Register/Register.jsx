import React, { useState } from 'react';
import { Button, Col, Container, FloatingLabel, Form, Stack, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import './Register.scss';
import { Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../../contexts/AuthContext";

// Esquema de validación con Yup
const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .required("El nombre es requerido"),
  email: Yup.string()
    .email("Email inválido")
    .required("El email es requerido"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es requerida"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .required("Confirma tu contraseña"),
  terms: Yup.boolean()
    .oneOf([true], "Debes aceptar los términos y condiciones")
});

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const success = await register(values);
    if (success) {
      navigate('/login'); // Redirigir al login después del registro
    }
    setSubmitting(false);
  };

  return (
    <Container className="register d-flex justify-content-center align-items-center">
      <Col sm={12} md={5}>
        <h2 className="text-center mb-5">Crear Cuenta</h2>
        
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            terms: false
          }}
          validationSchema={registerSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue
          }) => (
            <Form className="register-form" onSubmit={handleSubmit}>
              <Stack gap={4}>
                <div>
                  <FloatingLabel controlId="name" label="Ingresa tu nombre">
                    <Form.Control
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder=""
                      autoComplete="name"
                      isInvalid={touched.name && errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </div>

                <div>
                  <FloatingLabel controlId="email" label="Ingresa tu email">
                    <Form.Control
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder=""
                      autoComplete="email"
                      isInvalid={touched.email && errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </div>

                <div>
                  <FloatingLabel 
                    controlId="password" 
                    label="Ingresa tu contraseña" 
                    className="position-relative"
                  >
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder=""
                      autoComplete="new-password"
                      isInvalid={touched.password && errors.password}
                    />
                    <span
                      className="show-password position-absolute"
                      onClick={togglePasswordVisibility}
                      style={{
                        right: '15px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        zIndex: 10
                      }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </div>

                <div>
                  <FloatingLabel 
                    controlId="confirmPassword" 
                    label="Confirma tu contraseña" 
                    className="position-relative"
                  >
                    <Form.Control
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder=""
                      autoComplete="new-password"
                      isInvalid={touched.confirmPassword && errors.confirmPassword}
                    />
                    <span
                      className="show-password position-absolute"
                      onClick={toggleConfirmPasswordVisibility}
                      style={{
                        right: '15px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        zIndex: 10
                      }}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </div>

                <div>
                  <Form.Check
                    type="checkbox"
                    id="terms"
                    name="terms"
                    checked={values.terms}
                    onChange={handleChange}
                    isInvalid={touched.terms && errors.terms}
                    label={
                      <span>
                        Acepto los{" "}
                        <Link to="/terms" className="btn-link">
                          términos y condiciones
                        </Link>
                      </span>
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.terms}
                  </Form.Control.Feedback>
                </div>

                <div className="d-grid">
                  <Button 
                    size="lg" 
                    type="submit" 
                    disabled={isSubmitting || loading}
                  >
                    {loading || isSubmitting ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Creando cuenta...
                      </>
                    ) : (
                      'Crear Cuenta'
                    )}
                  </Button>
                </div>

                <p className="text-center">
                  ¿Ya tienes una cuenta?{" "}
                  <Link className="btn-link" to={"/login"}>
                    Inicia sesión
                  </Link>
                </p>
              </Stack>
            </Form>
          )}
        </Formik>
      </Col>
    </Container>
  );
};
