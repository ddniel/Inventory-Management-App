import { Link, useNavigate } from "react-router-dom"
import Button from "../../components/Button"
import Card from "../../components/Card"
import { useState } from "react"
import {toast} from 'react-toastify'
import { loginUser, validateEmail } from "../../services/authService"
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice"
import { useDispatch } from "react-redux";
import Loader from "../../components/Loader"


const initialState = {
  email: '',
  password: ''
}

export default function Login() {
  
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const {email, password} = formData
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function handleInputChange(e){
    const {name, value} = e.target
    setFormData({...formData, [name]: value })
  }

  async function login(e) {
    e.preventDefault();

    //FrontEnd validation
    if (!email || !password) {
      return toast.error("All fields are required");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = { email, password };

    setIsLoading(true);

    try {
      const data = await loginUser(userData)
      setIsLoading(false)
      await dispatch(SET_LOGIN(true))
      await dispatch(SET_NAME(data.name))
      navigate('/dashboard')
    } catch (error) {
      setIsLoading(false)
    }
  }

  

  
  return (
    <div className="h-screen w-full bg-blue-400 flex items-center justify-center">
      {isLoading && <Loader/>}
      <Card>
        <h2 className="text-xl lg:text-2xl">Login</h2>
        <form onSubmit={login} className="flex flex-col items-center w-full mt-4 mb-3">
          <input required type="text" placeholder="Email" name="email" value={email} onChange={handleInputChange} className="text-sm bg-blue-100 px-3 py-2 rounded-3xl my-2 w-full" />
          <input required type="password" placeholder="Password" name="password" value={password} onChange={handleInputChange} className="text-sm bg-blue-100 px-3 py-2 rounded-3xl my-2 w-full mb-6" />
          <Button>Sign In</Button>
        </form>
        <Link className="text-xs text-gray-500 cursor-pointer hover:underline self-start lg:text-sm" to='/forgot'>Forgot Password</Link>
        <p className="text-xs text-gray-500 self-start lg:text-sm ">Don't have an account? <Link to='/register' className="cursor-pointer hover:underline" >Register</Link></p>
        <p className="text-[11px] mt-6 text-gray-400">©Inventory Manager</p>
      </Card>
    </div>
  )
}

