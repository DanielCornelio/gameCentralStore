import React, { useEffect } from 'react'
import './WebLayout.css'
import { Footer } from '../../components/common/Footer/Footer'
import { TopBar } from '../../components/common/TopBar/TopBar'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

export const WebLayout = () => {

  return (
    <div className='grid-container'>
      <Toaster position="bottom-left" reverseOrder={false} />
      <TopBar />
      <Outlet />
      <Footer />
    </div>
  )
}
