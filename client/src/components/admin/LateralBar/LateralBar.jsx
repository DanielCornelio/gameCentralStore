import React from 'react'
import { Nav } from 'react-bootstrap'

export const LateralBar = () => {
  return (
    <Nav defaultActiveKey="/home" className="lateralbar flex-column">
      <Nav.Link href="/home">Active</Nav.Link>
      <Nav.Link eventKey="link-1">Link</Nav.Link>
      <Nav.Link eventKey="link-2">Link</Nav.Link>
      <Nav.Link eventKey="disabled" disabled>
        Disabled
      </Nav.Link>
    </Nav>
  )
}
