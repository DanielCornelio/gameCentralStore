import React from 'react'
import { TopBar } from '../../components/common/TopBar/TopBar'
import { Outlet } from 'react-router-dom'
import { Footer } from '../../components/common/Footer/Footer'
import { LateralBar } from '../../components'
import './AdminLayout.css'
import { Container } from 'react-bootstrap'
import { Toaster } from 'react-hot-toast'


const AdminLayout = () => {
  return (
    <div className='grid-container'>
      <TopBar />
      <Container className='d-flex'>
      <Toaster position="bottom-left" reverseOrder={false} />

        <LateralBar/>
        <Outlet />
      </Container>
      <Footer />
    </div>
  )
}

export default AdminLayout