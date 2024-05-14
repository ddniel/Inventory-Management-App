import { Link } from "react-router-dom"
import Button from "../../components/Button"
import Card from "../../components/Card"

export default function Forgot() {
  return (
    <div className="h-screen w-full bg-blue-400 flex items-center justify-center">
      <Card>
        <h2 className="text-xl lg:text-2xl">Forgot Password</h2>
        <form className="flex flex-col items-center w-full mt-4 mb-3">
          <input required type="text" placeholder="Email" name="email" className="text-sm bg-blue-100 px-3 py-2 rounded-3xl my-2 w-full mb-6" />
          <Button>Get Reset Email</Button>
        </form>
        <p className="text-xs text-gray-500 self-start lg:text-sm ">Already have an account? <Link to='/login' className="cursor-pointer hover:underline" >Login</Link></p>
        <p className="text-[11px] mt-6 text-gray-400">©Inventory Manager</p>
      </Card>
    </div>
  )
}
