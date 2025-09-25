import React from 'react'
import './CommentCard.scss'
import { Card, Col, Image, Stack } from 'react-bootstrap'
import { FaStar } from "react-icons/fa";


export const CommentCard = () => {
  return (
    <Card className='p-3 bg-gray'>
        <Stack direction='horizontal' className='align-align-align-items-start'>
            <div className='d-flex gap-3 align-items-center'>
                <Col md={1}>
                    <Image src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' className='w-100'  roundedCircle/>
                </Col>
                <Col md={4}>
                    <h5 className='comment-card-title m-0'>Joseph89</h5>
                    <p className='text-light m-0'>01/01/1970</p>
                </Col>
            </div>
            <Stack direction='horizontal' gap={1} className='text-light my-0 align-items-start'>
                <FaStar size={25}/>
                <FaStar size={25}/>
                <FaStar size={25}/>
                <FaStar size={25}/>
                <FaStar size={25}/>
            </Stack>
        </Stack>
        <Stack className='pt-4 text-light'>
            <h4>No fui a la chamba</h4>
            <p className='m-0'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus cum expedita asperiores consectetur, dicta amet consequatur eius nesciunt dolor suscipit delectus. Eaque sapiente, iure suscipit obcaecati est incidunt non at.</p>
        </Stack>

    </Card>
  )
}
