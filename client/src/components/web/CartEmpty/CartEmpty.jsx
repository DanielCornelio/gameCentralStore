import React from 'react'
import { Button, Stack } from 'react-bootstrap'
import { FaCartShopping } from "react-icons/fa6";
import './CartEmpty.scss';
import { Link } from 'react-router-dom';

export const CartEmpty = () => {
  return (
    <Stack gap={4} className="cart-empty align-items-center justify-content-center">
        <div className='cart-empty-circle'>
            <FaCartShopping className='cart-empty-icon' size={70}/>
        </div>
        <div>
            <h2 className='text-center mb-2'>Tu carrito se encuentra vacío</h2>
            <p className='text-center mb-0'>Continua explorando y comienza a comprar</p>
        </div>
        <Button as={Link} to='/game' size='lg' className='btn-secondary'> Seguir Comprando</Button>

    </Stack>
  )
}
