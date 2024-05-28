import React from 'react'
import Layout from '../components/Layout'
import SideBar from '../components/SideBar'
import useRedirectLoggedOutUser from '../customHook/useRedirectLoggedOutUser'


export default function Dashboard() {
  
  useRedirectLoggedOutUser('/')
  
  return (
    <section className='w-full h-screen flex'>
        <SideBar/>
        <Layout/>
    </section>
  )
}
