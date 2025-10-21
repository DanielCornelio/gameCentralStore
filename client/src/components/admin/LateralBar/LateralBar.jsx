import React, { useContext } from 'react'
import { Col, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import './LateralBar.scss'
import { UserContext } from '../../../contexts/UserContext'

export const LateralBar = () => {
  const {user, token} = useContext(UserContext);
  return (
    <Col md={2}>
      <Nav  className="lateralbar flex-column">
        {
          token && user?.rol == 'usuario' && (
            <>
            <Nav.Link as={NavLink} to="/admin/profile">Cuenta</Nav.Link>
              <Nav.Link as={NavLink} to="/admin/security">Acceso</Nav.Link>
          
            </>
            
          )
        }
              
        {
          token && user?.rol == 'admin' && (
            <>
            <Nav.Link as={NavLink} to="/admin/profile">Cuenta</Nav.Link>
              <Nav.Link as={NavLink} to="/admin/security">Acceso</Nav.Link>
            <hr/>
            <Nav.Link as={NavLink} to="/admin/products">Productos</Nav.Link>
            </>
            
          )
        }

    </Nav>
    </Col>
  )
}
