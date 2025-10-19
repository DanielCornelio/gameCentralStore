import React from 'react'
import { Col, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import './LateralBar.scss'

export const LateralBar = () => {
  return (
    <Col md={2}>
      <Nav  className="lateralbar flex-column">
      <Nav.Link as={NavLink} to="/admin/products">Productos</Nav.Link>
      <Nav.Link eventKey="link-1">Link</Nav.Link>
      <Nav.Link eventKey="link-2">Link</Nav.Link>
      <Nav.Link eventKey="disabled" disabled>
        Disabled
      </Nav.Link>
    </Nav>
    </Col>
  )
}
