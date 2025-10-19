import React, { useContext, useEffect, useState } from "react";
import { SectionTitle } from "../../components";
import { Container, Stack, Button, Table } from "react-bootstrap";
import { ProductModal } from "../../components";
import gamesService from "../../api/games";
import { UserContext } from "../../contexts/UserContext";
import toast from "react-hot-toast";

export const Products = () => {
  const [productoEditando, setProductoEditando] = useState(null);
  const { user, token } = useContext(UserContext);

  const [games, setGames] = useState([]);
  const [showModal, setShowModal] = useState(false);


  const getGames = async () => {
    try {
      const data = await gamesService.getAllGames()

      setGames(data);
 
    } catch (error) {
      toast.error("No se pudo establecer conexión con el servidor");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setProductoEditando(null);
  };

  const handleCommentAdded = () => {
    getGames();
    handleCloseModal()
  };

  useEffect(() => {
    getGames();
  }, []);

  // Función para abrir edición
  const handleEditProduct = (producto) => {
    setProductoEditando(producto);
    setShowModal(true);
  };

  // Función para actualizar producto
  const handleUpdateProduct = async (productoActualizado) => {
    try {
      const response = await gamesService.updateGame(
        productoEditando.id, 
        productoActualizado
      );
      console.log(response)
      toast.success(response.data.message || "Producto actualizado correctamente");
      handleCommentAdded();
    } catch (error) {
      console.log(error)
      toast.error(error.data.message || "Error al actualizar el producto");
    }
  };

  // Eliminar producto
  const handleDeleteProduct = async (id) => {
    try {
      const response = await gamesService.deleteGame(id);
      toast.success(response.data.message);
      handleCommentAdded();
    } catch (error) {
      toast.error("Error al eliminar el juego");
    }
  };

  return (
    <Container className="mb-4">
      <Stack
        direction="horizontal"
        className="align-items-center justify-content-between"
      >
        <SectionTitle title="Productos" />
        <div className="d-flex justify-content-start align-items-center ">
          {token && user?.rol == "admin" && (
            <Button variant="primary" onClick={() => setShowModal(true)}>
              Agregar producto
            </Button>
          )}
        </div>
      </Stack>

      <Table striped borderless hover variant="dark" size="sm">
        <thead>
          <tr>
            <th className="text-center">ID</th>
            <th className="text-center">Título</th>
            <th className="text-center">Stock</th>
            <th className="text-center">Precio</th>
            <th className="text-center">Plataforma</th>
            <th className="text-center">Género</th>
            <th className="text-center">Estado</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {games.map((prod, index) => (
            <tr key={prod.id}>
              <td className="text-center">{index + 1}</td>
              <td className="text-text-truncate">{prod.titulo}</td>
              <td className="text-center">{prod.stock}</td>
              <td className="text-center">${prod.precio}</td>
              <td>{prod.plataforma}</td>
              <td>{prod.genero}</td>
              <td>
                <span
                  className={`badge ${
                    prod.activo ? "bg-success" : "bg-secondary"
                  }`}
                >
                  {prod.activo ? "Activo" : "Inactivo"}
                </span>
              </td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEditProduct(prod)}
                >
                  Editar
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleDeleteProduct(prod.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ProductModal
        showModal={showModal}
        setShowModal={setShowModal}
        user={user}
        onCommentAdded={handleCommentAdded}
        productEdit={productoEditando}
        onUpdate={handleUpdateProduct}

      />
    </Container>
  );
};
