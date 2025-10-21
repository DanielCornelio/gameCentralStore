import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Stack,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useForm } from "react-hook-form";
import "./Register.scss";
import authService from "../../../api/auth";
import toast from "react-hot-toast";
import { TermsModal } from "../../../components";

export const Register2 = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleTermsClick = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await authService.register(data);
      if (response.error && response.status == 409) {
        toast.error(response.message);
        return;
      }
      toast.success(response.message);
      navigate("/login");
    } catch (error) {
      toast.error("Error al crear el usuario");
    }
  });

  return (
    <Container className="register d-flex justify-content-center align-items-center">
      <Col sm={12} md={5}>
        <h2 className="text-center mb-5">Crear Cuenta</h2>
        <Form className="register-form" onSubmit={onSubmit}>
          <Stack gap={4}>
            <div>
              <FloatingLabel label="Ingresa tu username">
                <Form.Control
                  type="text"
                  placeholder=""
                  {...register("username", {
                    required: "El username es requerido",
                  })}
                />
              </FloatingLabel>
              {errors.nombre && (
                <span className="text-error">{errors.nombre.message}</span>
              )}
            </div>

            <div>
              <FloatingLabel label="Ingresa tu URL foto de Perfil">
                <Form.Control
                  type="text"
                  placeholder=""
                  {...register("avatar_url")}
                />
              </FloatingLabel>
            </div>

            <Row>
              <Col md={6}>
                <FloatingLabel label="Ingresa tu nombre">
                  <Form.Control
                    type="text"
                    placeholder=""
                    {...register("nombre", {
                      required: "El nombre es requerido",
                    })}
                  />
                </FloatingLabel>
                {errors.nombre && (
                  <span className="text-error">{errors.nombre.message}</span>
                )}
              </Col>

              <Col md={6}>
                <FloatingLabel label="Ingresa tu apellido">
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder=""
                    {...register("apellido", {
                      required: "El apellido es requerido",
                    })}
                  />
                </FloatingLabel>
                {errors.nombre && (
                  <span className="text-error">{errors.nombre.message}</span>
                )}
              </Col>
            </Row>

            <div>
              <FloatingLabel controlId="email" label="Ingresa tu email">
                <Form.Control
                  type="email"
                  placeholder=""
                  {...register("email", {
                    required: {
                      value: true,
                      message: "El email es requerido",
                    },
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "El formato del email es incorrecto",
                    },
                  })}
                />
              </FloatingLabel>
              {errors.email && (
                <span className="text-error">{errors.email.message}</span>
              )}
            </div>

            <div>
              <FloatingLabel label="Selecciona tu país">
              <Form.Select
                aria-label="Floating label select example"
                {...register("pais", { required: "El país es requerido" })}
              >
                <option value="">Selecciona una opción del menu</option>
                <option value="cl">Chile</option>
                <option value="mx">México</option>
              </Form.Select>
            </FloatingLabel>
            {errors.pais && (
              <span className="text-error">{errors.pais.message}</span>
            )}
            </div>
            <Row>
              <Col md={6}>
                <FloatingLabel
                  label="Ingresa tu contraseña"
                  className="position-relative"
                >
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder=""
                    {...register("password_hash", {
                      required: "La contraseña es requerida",
                      minLength: {
                        value: 6,
                        message:
                          "La contraseña debe tener al menos 6 caracteres",
                      },
                    })}
                  />
                  <span
                    className="show-password position-absolute"
                    onClick={togglePasswordVisibility}
                    style={{
                      right: "4px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      zIndex: 10,
                    }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </FloatingLabel>
                {errors.password_hash && (
                  <span className="text-error">
                    {errors.password_hash.message}
                  </span>
                )}
              </Col>

              <Col md={6}>
                <FloatingLabel
                  label="Confirma tu contraseña"
                  className="position-relative"
                >
                  <Form.Control
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder=""
                    {...register("confirmPassword", {
                      required: "La contraseña es requerida",
                      validate: (value) =>
                        value === watch("password_hash") ||
                        "Las constrseñas no coinciden",
                    })}
                  />
                  <span
                    className="show-password position-absolute"
                    style={{
                      right: "4px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      zIndex: 10,
                    }}
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </FloatingLabel>
                {errors.confirmPassword && (
                  <span className="text-error">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </Col>
            </Row>

            <div>
              <Form.Check
                type="checkbox"
                id="terms"
                name="terms"
                label={
                  <span>
                    Acepto los{" "}
                    <Link
                      className="btn-link"
                      onClick={() => {
                        setShowModal(true);
                      }}
                    >
                      términos y condiciones
                    </Link>
                  </span>
                }
              />
            </div>

            <div className="d-grid">
              <Button size="lg" type="submit">
                Crear Cuenta
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
      </Col>
      <TermsModal showModal={showModal} setShowModal={setShowModal} />
    </Container>
  );
};
