import React, { useContext } from 'react'
import { CartEmpty, SectionTitle, CartCard } from '../../../components'
import { CartContext } from '../../../contexts/CartContext'
import { Container, Row, Col, Card, Table, Button, Form, Alert, Badge, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Cart = () => {
  const { cart, incrementar, disminuir,total, subtotal } = useContext(CartContext)

  return (
    <Container className=''>
      <SectionTitle title="Mi Carrito" />

      <div className=''>
        {
          cart.length > 0 ?
            (<Stack direction='horizontal' gap={3} className='mb-5 align-items-start' >
                <Col md={9} className='d-flex flex-column gap-3'>

              {
                cart?.map(item => (
                  <CartCard key={item.id} {...item} incrementar={() => incrementar(item.id)} disminuir={() => disminuir(item.id)} />

                ))
              }
              </Col>
              <Col md={3}>
                <h3>Resumen del pedido</h3>
                <Stack direction='horizontal' className='justify-content-between aling-items-between'>
                  <p className='m-0'>Subtotal:</p>
                  <span>{subtotal.toLocaleString("es-MX")}</span>
                </Stack>
                <Stack direction='horizontal' className='justify-content-between aling-items-between'>
                  <p className='m-0'>Impuesto:</p>
                  <span>16%</span>
                </Stack>
                <hr/>
                <Stack direction='horizontal' className='justify-content-between fw-bold  aling-items-between'>
                  <p className='m-0'>Total:</p>
                  <span>{total.toLocaleString("es-MX")}</span>
                </Stack>
                <Stack gap={3}>
                  <Button>Finalizar Compra</Button>
                  <Button as={Link} to="/games" variant='secondary'>Seguir Comprando</Button>
                </Stack>
              </Col>
            </Stack>) :
            <CartEmpty />
        }

      </div>

    </Container>
  )
}
