import React from 'react'
import { Card, Stack, Image, Col, InputGroup, Form, Button, Table } from 'react-bootstrap'
import './CartCard.scss'
import { FaTrash } from "react-icons/fa";
import { Chip } from '../Chip';


export const CartCard = ({ id, title, image, platform, genre, price, count, incrementar, disminuir }) => {
    const total = price * count
    return (

                <Card className='cart__card d-flex flex-row'>

                    <div >
                        <div className='cart__card_image-container mb-2 me-3'>
                            <Image className="cart__card_image" src={image} alt={title} />
                        </div>
                        <span>{platform}</span>
                    </div>
                    <Stack>
                        <Stack direction='horizontal' className='mb-3 align-items center justify-content-between'>
                            <h2 className='m-0'>{title}</h2>
                            <InputGroup className="gap-2 align-items-center cart__card_count">
                                <Button variant="outline-secondary" onClick={() => disminuir(id)} >-</Button>
                                <span>{count}</span>
                                <Button variant="outline-secondary" onClick={() => incrementar(id)}>+</Button>
                            </InputGroup>
                        </Stack>
                        <Stack gap={3} >
                            <div>
                                <Chip title={genre} />
                            </div>
                            <h4 className='m-0'>{price}</h4>
                            <Stack direction='horizontal'>
                                <h2 className='m-0'>{total.toLocaleString("es-MX")}</h2>
                            </Stack>

                        </Stack>
                    </Stack>
                </Card>

    )
}
