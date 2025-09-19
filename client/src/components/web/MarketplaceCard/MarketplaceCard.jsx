import React from 'react'
import { Stack } from 'react-bootstrap'
import './MarketplaceCard.css'

export const MarketplaceCard = ({icono:Icono, titulo, tienda}) => {
    return (
        <Stack className='bg-marketplace-card p-3 flex-row align-items-center gap-4 w-75 rounded shadow'>
            <div md={4}><Icono size={30} /> </div>
            <div md={8}>
                <small>{titulo}</small>
                <h5 className='fw-medium'>{tienda}</h5>
            </div>
        </Stack>
    )
}
