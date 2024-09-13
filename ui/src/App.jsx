import React from 'react'
import {createBrowserRouter,createRoutesFromElements,RouterProvider,Route}from 'react-router-dom'
import { BrowserProvider } from 'ethers'
import MainLayout from './layout/MainLayout';

function App ()  {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<MainLayout/>}>
        </Route>
      </>

    )
  )
  return (
   <>
    <RouterProvider router={router}/>
   </>
  )
}

export default App