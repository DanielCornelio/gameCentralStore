import React, { useContext, useState } from "react";
import "./Login.scss";
import {
  Col,
  Container,
  Form,
  Button,
  FloatingLabel,
  Stack,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../../contexts/AuthContext";

// Esquema de validación con Yup
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email inválido")
    .required("El email es requerido"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es requerida"),
});

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading,  } = useAuth();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const success = await login(values);
    if (success) {
      navigate('/'); // Redirigir al home después del login
    }
    setSubmitting(false);
  };

  return (
    <Container className="login d-flex justify-content-center align-items-center">
      <Col sm={12} md={5}>
        <h2 className="text-center mb-5">Inicia Sesión</h2>
        
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginSchema}
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
          }) => (
            <Form className="login-form" onSubmit={handleSubmit}>
              <Stack gap={4}>
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
                      autoComplete="current-password"
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
                        Iniciando...
                      </>
                    ) : (
                      'Entrar'
                    )}
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
          )}
        </Formik>
      </Col>
    </Container>
  );
};
