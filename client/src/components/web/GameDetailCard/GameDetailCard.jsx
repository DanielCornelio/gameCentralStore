import React from 'react'
import { Card, Col, Image, Stack } from 'react-bootstrap'

export const GameDetailCard = () => {
  return (
    <Card className='p-3'>
      <Stack direction='horizontal' className='justify-content-between align-items-start' gap={3}>
        <Col md={3} className='bg-primary'>
          <Image src='./src/assets/img/resident-evi-0.jpg' className='w-100' rounded />
        </Col>
        <Col md={5} className='bg-success'>
          <h3>Resident Evil 0</h3>

        </Col>
        <Col className='bg-warning'>algo</Col>
      </Stack>
    </Card>
  )
}
