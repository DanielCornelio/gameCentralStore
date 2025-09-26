import React from 'react'
import { Container } from 'react-bootstrap'
import { CartEmpty } from '../../../components'

export const Cart = () => {
  return (
    <Container className=' d-flex justify-content-center align-items-center'>
        <CartEmpty />
    </Container>
  )
}
