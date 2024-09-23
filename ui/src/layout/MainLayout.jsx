import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import AccountDetails from '../components/AccountDetails';

const MainLayout = () => {
  return (
    <>
    <ToastContainer/>
    <Navbar/>
    <AccountDetails/>
    <Outlet/>
    </>
  )
}

export default MainLayout