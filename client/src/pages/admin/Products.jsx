import React from "react";
import { SectionTitle } from "../../components";
import { Container, Row, Col, Stack, Button, Table } from "react-bootstrap";
import { ProductModal } from "../../components";

export const Products = () => {
  return (
    <Container>
      <SectionTitle title="Productos" />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <ProductModal />
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
          {/* Aquí irían los productos de la tabla */}
          <tr>
            <td>1</td>
            <td>Resident evil</td>
            <td>50</td>
            <td>$59.99</td>
            <td>PC</td>
            <td>Acción</td>
            <td>
              <span className="badge bg-info">Activo</span>
            </td>
            <td>
              <Button variant="primary" size="sm" className="me-2">
                Editar
              </Button>
              <Button variant="secondary" size="sm">
                Eliminar
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};
