import React from 'react'
import SideBar from './components/SideBar'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div>
      <SideBar/>
      <Outlet/>
    </div>
  )
}

export default Layout
