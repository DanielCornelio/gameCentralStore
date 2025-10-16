import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Card, Image, Badge, Stack } from 'react-bootstrap'
import { SectionTitle } from '../../../components'
import './Profile.scss'
import { UserContext } from '../../../contexts/UserContext'

export const Profile = () => {

  const { user } = useContext(UserContext)

  // Datos de ejemplo del usuario
  const userData = {
    name: "Pedro González",
    email: "pedro.gonzalez@email.com",
    profileImage: "https://via.placeholder.com/150/0d6efd/ffffff?text=PG"
  };

  // Datos de ejemplo de compras recientes
  const recentPurchases = [
    { id: 1, title: "The Legend of Zelda", price: 59.99, date: "2024-09-28" },
    { id: 2, title: "Super Mario Odyssey", price: 49.99, date: "2024-09-25" },
    { id: 3, title: "Minecraft", price: 26.95, date: "2024-09-20" }
  ];

  return (
    <Container className="profile-page my-5">
      <SectionTitle title="Mi Perfil" />

      <Row className="mt-4">
        <Col md={8} className='mx-auto mb-4'>
          <Stack direction='horizontal' gap={4} className='justify-content-center align-items-center'>
            <Image
              src={user?.avatar_url || '../../../src/assets/img/user.png'}
              roundedCircle
              width="150"
              height="150"
              alt="Foto de perfil"
            />
            <Stack gap={2} className='justify-content-center'>
              <p className='m-0'>
                <h4 className="m-0 fs-1 d-inline">{user?.nombre + " " + user?.apellido || "nombre de usuario"}</h4>
              <span className="ms-2 fs-5 text-gray">#{user?.username || "Username"}</span>
              </p>
              <p className="m-0 fs-5 text-purple">{user?.email} </p>
            </Stack>
        </Stack>
        
        </Col>
        <Col md={8} className="mx-auto">
          {/* Últimas Compras */}
          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="mb-0">Últimas Compras</h5>
            </Card.Header>
            <Card.Body>
              {recentPurchases.length > 0 ? (
                <div className="recent-purchases">
                  {recentPurchases.map((purchase) => (
                    <div key={purchase.id} className="purchase-item d-flex justify-content-between align-items-center py-2 border-bottom">
                      <div>
                        <h6 className="mb-1">{purchase.title}</h6>
                        <small className="text-muted">{purchase.date}</small>
                      </div>
                      <Badge bg="primary" className="fs-6">
                        ${purchase.price}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted">No hay compras recientes</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
