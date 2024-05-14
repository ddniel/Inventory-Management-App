import { Link } from "react-router-dom"
import Button from "../../components/Button"
import Card from "../../components/Card"


export default function Login() {
  return (
    <div className="h-screen w-full bg-blue-400 flex items-center justify-center">
      <Card>
        <h2 className="text-xl lg:text-2xl">Login</h2>
        <form className="flex flex-col items-center w-full mt-4 mb-3">
          <input required type="text" placeholder="Email" name="email" className="text-sm bg-blue-100 px-3 py-2 rounded-3xl my-2 w-full" />
          <input required type="password" placeholder="Password" name="password" className="text-sm bg-blue-100 px-3 py-2 rounded-3xl my-2 w-full mb-6" />
          <Button>Sign In</Button>
        </form>
        <Link className="text-xs text-gray-500 cursor-pointer hover:underline self-start lg:text-sm" to='/forgot'>Forgot Password</Link>
        <p className="text-xs text-gray-500 self-start lg:text-sm ">Don't have an account? <Link to='/register' className="cursor-pointer hover:underline" >Register</Link></p>
        <p className="text-[11px] mt-6 text-gray-400">©Inventory Manager</p>
      </Card>
    </div>
  )
}

