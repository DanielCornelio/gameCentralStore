import React, { useEffect } from 'react'
import './WebLayout.css'
import { Footer } from '../../components/common/Footer/Footer'
import { TopBar } from '../../components/common/TopBar/TopBar'
import { Outlet } from 'react-router-dom'

export const WebLayout = () => {

  return (
    <div className='grid-container'>
      <TopBar />
      <Outlet />
      <Footer />
    </div>
  )
}
