import React from 'react'
import { Card, Stack, Image, Col, InputGroup, Form, Button, Table } from 'react-bootstrap'
import './CartCard.scss'
import { FaTrash } from "react-icons/fa";
import { Chip } from '../Chip';


export const CartCard = ({ id, titulo, portada_url, plataforma, genero, precio, count, eliminarCart }) => {
    console.log(genero)
    return (

                <Card className='cart__card d-flex flex-row'>

                    <div >
                        <div className='cart__card_image-container mb-2 me-3'>
                            <Image className="cart__card_image" src={portada_url} alt={titulo} />
                        </div>
                        <span>{plataforma}</span>
                    </div>

                    <Stack>

                        <Stack direction='horizontal' className=' align-items-center justify-content-between'>
                            <h3 className='me-auto text-truncate w-75'>{titulo}</h3>
                            <Button className='d-flex align-items-center gap-2' onClick={() => eliminarCart(id)}><FaTrash /> Eliminar</Button>
                        </Stack>

                        <Stack gap={3} >
                            <div> 
                                <Chip title={genero.toUpperCase()} />
                            </div>
                            <h2 className='m-0'>$ {precio.toLocaleString("es-MX")}</h2>

                        </Stack>
                    </Stack>
                </Card>

    )
}
