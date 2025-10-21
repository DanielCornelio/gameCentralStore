import React, { useContext, useState } from "react";
import {
  Col,
  Container,
  Form,
  Button,
  FloatingLabel,
  Stack,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import "./ManagePassword.scss";
import { UserContext } from "../../../contexts/UserContext";
import { useForm } from "react-hook-form";
import usuariosService from "../../../api/usuarios";
import toast, { Toaster } from "react-hot-toast";

export const ManagePassword = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    password_hash: false,
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
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const handleCancel = () => {
    reset();
  };

  const handleLogout = () => {
    logout();
  };

  const onSubmit = handleSubmit(async (data) => {
      try {
        const response = await usuariosService.updatePasswordUser(user.id, data)
        console.log(response)
        if(!response.error){
          toast.success(response.message)
          setTimeout(() => {
            handleLogout()
            navigate("/login")
          }, 3000);
        }
      } catch (error) {
        console.log(error.message)
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
                label="Escribe la nueva contraseña"
                className="d-flex justify-content-end align-items-center"
              >
                <Form.Control
                  type={showPassword.newPassword ? "text" : "password"}
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
                  onClick={() => togglePasswordVisibility("newPassword")}
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
                label="Confirma la nueva contraseña"
                className="d-flex justify-content-end align-items-center"
              >
                <Form.Control
                  type={showPassword.password_hash ? "text" : "password"}
                  placeholder=""
                  {...register("password_hash", {
                    required: "La contraseña es requerida",
                    validate: value => value === watch ('newPassword') || 'Las constrseñas no coinciden'
                  })}
                />
                <span
                  variant="btn-link"
                  className="show-password"
                  onClick={() => togglePasswordVisibility("password_hash")}
                >
                  {showPassword.password_hash ? <FaEyeSlash /> : <FaEye />}
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
                onClick={handleCancel}
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
