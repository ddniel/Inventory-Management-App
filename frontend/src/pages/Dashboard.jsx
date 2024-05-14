import React from 'react'
import Layout from '../components/Layout'
import SideBar from '../components/SideBar'


export default function Dashboard() {
  return (
    <section className='w-full h-screen flex'>
        <SideBar/>
        <Layout/>
    </section>
  )
}
