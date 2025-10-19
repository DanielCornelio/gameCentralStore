import React from 'react'
import { Col, Nav } from 'react-bootstrap'

export const LateralBar = () => {
  return (
    <Col md={2}>
      <Nav  className="lateralbar flex-column">
      <Nav.Link href="/admin/products">Productos</Nav.Link>
      <Nav.Link eventKey="link-1">Link</Nav.Link>
      <Nav.Link eventKey="link-2">Link</Nav.Link>
      <Nav.Link eventKey="disabled" disabled>
        Disabled
      </Nav.Link>
    </Nav>
    </Col>
  )
}
