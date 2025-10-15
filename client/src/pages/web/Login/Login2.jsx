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
import { useForm } from "react-hook-form";
import { UserContext } from "../../../contexts/UserContext";
import toast, { Toaster } from 'react-hot-toast';


export const Login2 = () => {
  const navigate = useNavigate()
  const { login, token } = useContext(UserContext)

  if(token){
    navigate("/")
  }

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = handleSubmit(async (credenciales) => {
    try {
      const response = await login(credenciales);
      console.log(response.data.token)
      if (response.data.token) {
        toast.success('Login exitoso');
        navigate('/');  
      }
    } catch (error) {
      toast.error('Error al iniciar sesión. Verifica tus credenciales')
    }
  })

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container className="login d-flex justify-content-center align-items-center">
      <Toaster position="top-right" reverseOrder={false} />
      <Col sm={12} md={5}>
        <h2 className="text-center mb-5">Inicia Sesión</h2>

        <Form className="login-form" onSubmit={onSubmit}>
          <Stack gap={4}>
            <div>
              <FloatingLabel controlId="email" label="Ingresa tu email">
                <Form.Control
                  type="email"
                  placeholder=""
                  {...register("email", {
                    required: {
                      value: true,
                      message: "El email es requerido"
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "El formato del email es incorrecto"
                    }
                  })}
                />
              </FloatingLabel>
              {
                errors.email && <span className="text-error">{errors.email.message}</span>
              }
            </div>

            <div>
              <FloatingLabel
                controlId="password"
                label="Ingresa tu contraseña"
                className="position-relative"
              >
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder=""
                  {...register("password_hash", {
                    required: "La contraseña es requerida",
                    minLength: {
                      value: 6,
                      message: "La contraseña debe tener al menos 6 caracteres"
                    }
                  })}
                />
                {
                  errors.password_hash && <span className="text-error">{errors.password_hash.message}</span>
                }
                <span
                  className="show-password position-absolute"
                  onClick={togglePasswordVisibility}
                  style={{
                    right: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    zIndex: 10,
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </FloatingLabel>

            </div>

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
