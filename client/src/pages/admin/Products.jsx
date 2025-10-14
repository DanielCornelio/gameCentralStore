import React, { useState } from "react";
import { SectionTitle } from "../../components";
import { Container, Row, Col, Stack, Button, Table } from "react-bootstrap";
import { ProductModal } from "../../components";

export const Products = () => {
  const [productos, setProductos] = useState([]);
  const [productoEditando, setProductoEditando] = useState(null);

  const handleAddProduct = (nuevoProducto) => {
    const id =
      productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;
    setProductos((prev) => [...prev, { ...nuevoProducto, id }]);
  };

  // Editar producto
  const handleUpdateProduct = (productoActualizado) => {
    setProductos((prev) =>
      prev.map((prod) =>
        prod.id === productoActualizado.id ? productoActualizado : prod
      )
    );
    setProductoEditando(null);
  };

  // Eliminar producto
  const handleDeleteProduct = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
      setProductos((prev) => prev.filter((prod) => prod.id !== id));
    }
  };

  return (
    <Container>
      <SectionTitle title="Productos" />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <ProductModal onSave={handleAddProduct} />
      </div>

      <Table striped borderless hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Stock</th>
            <th>Precio</th>
            <th>Plataforma</th>
            <th>Género</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.id}</td>
              <td>{prod.titulo}</td>
              <td>{prod.stock}</td>
              <td>${prod.precio}</td>
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
                  onClick={() => setProductoEditando(prod)}
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

      {productoEditando && (
        <ProductModal
          onUpdate={handleUpdateProduct}
          productEdit={productoEditando}
        />
      )}
    </Container>
  );
};
