import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../components/Nav'

const Layout = ({children}) => {
  return (
   <>
   <Nav children={children}>
    <Outlet/>
   </Nav>
   </>
  )
}

export default Layout