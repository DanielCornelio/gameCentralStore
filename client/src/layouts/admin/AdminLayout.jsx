import React from 'react'
import { TopBar } from '../../components/common/TopBar/TopBar'
import { Outlet } from 'react-router-dom'
import { Footer } from '../../components/common/Footer/Footer'
import { LateralBar } from '../../components'
import './AdminLayout.css'
import { Container } from 'react-bootstrap'


const AdminLayout = () => {
  return (
    <div className='grid-container'>
      <TopBar />
      <Container>
        <LateralBar/>
      <Outlet />
      </Container>
      <Footer />
    </div>
  )
}

export default AdminLayout