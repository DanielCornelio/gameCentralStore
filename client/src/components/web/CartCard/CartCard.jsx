import React from 'react'
import { Card, Stack, Image, Col, InputGroup, Form, Button, Table } from 'react-bootstrap'
import './CartCard.scss'
import { FaTrash } from "react-icons/fa";
import { Chip } from '../Chip';


export const CartCard = ({ id, titulo, portada_url, plataforma, genero, precio, count, incrementar, disminuir }) => {
    console.log(genero)
    const total = precio * count
    return (

                <Card className='cart__card d-flex flex-row'>

                    <div >
                        <div className='cart__card_image-container mb-2 me-3'>
                            <Image className="cart__card_image" src={portada_url} alt={titulo} />
                        </div>
                        <span>{plataforma}</span>
                    </div>

                    <Stack>

                        <Stack direction='horizontal' className='mb-3 align-items-center justify-content-between'>
                            <h2 className='me-auto'>{titulo}</h2>
                            <InputGroup className="gap-2 align-items-center">
                                <Button variant="outline-secondary" onClick={() => disminuir(id)} >-</Button>
                                <span>{count}</span>
                                <Button variant="outline-secondary" onClick={() => incrementar(id)}>+</Button>
                            </InputGroup>
                        </Stack>


                        <Stack gap={3} >
                            <Chip titulo={genero}/>

                            <div>
                                
                                <Chip titulo={genero} />
                            </div>
                            <h4 className='m-0'>{precio}</h4>
                            <Stack direction='horizontal'>
                                <h2 className='m-0'>{total.toLocaleString("es-MX")}</h2>
                            </Stack>

                        </Stack>
                    </Stack>
                </Card>

    )
}
