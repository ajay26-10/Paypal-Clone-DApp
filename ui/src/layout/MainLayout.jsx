import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const MainLayout = () => {
  return (
    <>
    <ToastContainer/>
    <Navbar/>
    <Outlet/>
    </>
  )
}

export default MainLayout