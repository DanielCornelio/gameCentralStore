import React from 'react'
import { Container, Row, Col, Card, Image, Badge } from 'react-bootstrap'
import { SectionTitle } from '../../../components'
import './Profile.scss'

export const Profile = () => {
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
        <Col md={8} className="mx-auto">
          {/* Información Personal */}
          <Card className="shadow-sm mb-4">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <Image 
                  src={userData.profileImage} 
                  roundedCircle 
                  width="120" 
                  height="120"
                  className="mb-3"
                  alt="Foto de perfil"
                />
                <h4 className="mb-2">{userData.name}</h4>
                <p className="text-muted mb-0">
                  <strong>Puedes contactarme:</strong> {userData.email}
                </p>
              </div>
            </Card.Body>
          </Card>

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
