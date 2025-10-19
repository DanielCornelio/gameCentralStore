import React, { useContext, useState } from "react";
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
import { UserContext } from "../../../contexts/UserContext";
import { useForm } from "react-hook-form";
import usuariosService from "../../../api/usuarios";

export const ManagePassword = () => {
  const { user, token } = useContext(UserContext);

  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
      try {
        const respnse = await usuariosService
        
      } catch (error) {
          toast.error('Error al actualizar la contraseña')
      }
  });

  return (
    <Container className="d-flex justify-content-center align-items-center mb-4">
      <Col sm={12} md={5}>
        <Form className="login-form" onSubmit={onSubmit}>
          <Stack gap={4}>
            <div>
              <FloatingLabel
                controlId="floatingPassword"
                label="Escribe la nueva contraseña"
                className="d-flex justify-content-end align-items-center"
              >
                <Form.Control
                  type={showPassword.new ? "text" : "password"}
                  placeholder=""
                  {...register("newPassword", {
                    required: "La contraseña es requerida",
                    minLength: {
                      value: 6,
                      message: "La contraseña debe tener al menos 6 caracteres",
                    },
                  })}
                />
                <span
                  variant="btn-link"
                  className="show-password"
                  onClick={() => togglePasswordVisibility("new")}
                >
                  {showPassword.new ? <FaEyeSlash /> : <FaEye />}
                </span>
              </FloatingLabel>
              {errors.newPassword && (
                <span className="text-error">{errors.newPassword.message}</span>
              )}
            </div>

            <div>
              <FloatingLabel
                controlId="floatingPassword"
                label="Confirma la nueva contraseña"
                className="d-flex justify-content-end align-items-center"
              >
                <Form.Control
                  type={showPassword.confirm ? "text" : "password"}
                  placeholder=""
                  {...register("password_hash", {
                    required: "La contraseña es requerida",
                    minLength: {
                      value: 6,
                      message: "La contraseña debe tener al menos 6 caracteres",
                    },
                  })}
                />
                <span
                  variant="btn-link"
                  className="show-password"
                  onClick={() => togglePasswordVisibility("confirm")}
                >
                  {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
                </span>
              </FloatingLabel>
              {errors.password_hash && (
                <span className="text-error">{errors.password_hash.message}</span>
              )}
            </div>

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
