import { Link, useParams } from "react-router-dom"
import Button from "../../components/Button"
import Card from "../../components/Card"
import { useState } from "react"
import {toast} from 'react-toastify'
import { resetPassword } from "../../services/authService"


const initialState = {
  password: '',
  cpassword: ''
}

export default function Reset() {
  const [formData, setFormData] = useState(initialState)
  const {resetToken} = useParams()

  function handleInputChange(e){
    const {name, value} = e.target
    setFormData({...formData, [name]: value })
  }

  async function reset (e) {
    e.preventDefault()
    
    //FrontEnd validation
    if (!formData.password || !formData.cpassword){
      return toast.error('All fields are required') 
    }

    if(formData.password.length < 6){
      return toast.error('Password must be more than 6 characters')
    }

    if (formData.password !== formData.cpassword){
      return toast.error('Passwords do not match') 
    }


    const userData = {
      password: formData.password, 
      cpassword: formData.cpassword 
    }


    try {
      const data = await resetPassword(userData, resetToken)
      toast.success(data.message)

    } catch (error) {
      console.log(error.message)
    }
  }
  
  return (
    <div className="h-screen w-full bg-blue-400 flex items-center justify-center">
      <Card>
        <h2 className="text-xl lg:text-2xl">Reset Password</h2>
        <form onSubmit={reset} className="flex flex-col items-center w-full mt-4 mb-3">
          <input required type="password" placeholder="New Password" name="password" value={formData.password} onChange={handleInputChange} className="text-sm bg-blue-100 px-3 py-2 rounded-3xl my-2 w-full" />
          <input required type="password" placeholder="Confirm Password" name="cpassword" value={formData.cpassword} onChange={handleInputChange} className="text-sm bg-blue-100 px-3 py-2 rounded-3xl my-2 w-full mb-6" />
          <Button>Reset Password</Button>
        </form>
        <p className="text-xs text-gray-500 self-start lg:text-sm ">Already have an account? <Link to='/login' className="cursor-pointer hover:underline" >Login</Link></p>
        <p className="text-[11px] mt-6 text-gray-400">©Inventory Manager</p>
      </Card>
    </div>
  )
}
