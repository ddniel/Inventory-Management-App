import { Link } from "react-router-dom"
import Button from "../../components/Button"
import Card from "../../components/Card"
import {toast} from 'react-toastify'
import { forgotPassword, validateEmail } from "../../services/authService"
import { useState } from "react"

export default function Forgot() {
  const [email, setEmail] = useState('')

  async function forgot (e){
    e.preventDefault()
    
    if (!email) {
      return toast.error("Please enter your email");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {email}
    await forgotPassword(userData)
    setEmail('')
  }

  return (
    <div className="h-screen w-full bg-blue-400 flex items-center justify-center">
      <Card>
        <h2 className="text-xl lg:text-2xl">Forgot Password</h2>
        <form onSubmit={forgot} className="flex flex-col items-center w-full mt-4 mb-3">
          <input required type="text" placeholder="Email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} className="text-sm bg-blue-100 px-3 py-2 rounded-3xl my-2 w-full mb-6" />
          <Button>Get Reset Email</Button>
        </form>
        <p className="text-xs text-gray-500 self-start lg:text-sm ">Already have an account? <Link to='/login' className="cursor-pointer hover:underline" >Login</Link></p>
        <p className="text-[11px] mt-6 text-gray-400">©Inventory Manager</p>
      </Card>
    </div>
  )
}
