import Button from "./Button"
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../services/authService'
import { useDispatch, useSelector } from "react-redux";
import { SET_LOGIN, selectName } from "../redux/features/auth/authSlice";

export default function Header() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const name = useSelector(selectName)

    async function logout(){
        await logoutUser()
        await dispatch(SET_LOGIN(false))
        navigate('/login')
    }
    
    return (
    <>
        <div className='h-[12%] w-full flex justify-between px-10 items-center '>
            <p>Welcome, <span className="text-blue-800 font-medium capitalize">{name}</span></p>
            <button onClick={logout}>Logout</button>
        </div>
        <div className='h-[1px] bg-gray-400 '></div>
    </>
  )
}
