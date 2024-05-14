import React from 'react'
import Button from "./Button"
import { Link } from 'react-router-dom'

export default function Header() {
    const name = 'Danny'
    
    return (
    <>
        <div className='h-[12%] w-full flex justify-between px-10 items-center '>
            <p>Welcome, {name}</p>
            <Link><Button>Logout</Button></Link>
        </div>
        <div className='h-[1px] bg-gray-400 '></div>
    </>
  )
}
