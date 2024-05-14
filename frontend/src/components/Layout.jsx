import React from 'react'
import Header from './Header'
import Footer from './Footer'


export default function Layout({children}) {
  return (
    <div className='w-full h-full flex flex-col relative'>
        <Header/>
        <div>{children}</div>
        <Footer/>
    </div>
  )
}
