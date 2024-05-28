import { RiMenuFold4Fill, RiMenuUnfold4Fill } from "react-icons/ri";
import logo from "/logo.png"
import SidebarItems from './SidebarItems';
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function SideBar() {
    const [isOpen, setIsOpen] = useState(true)
    const navigate = useNavigate()

    const goHome = () => {
        navigate('/')
    }

    const handleToggle = () => setIsOpen(!isOpen)
  
    return (
    <div className={ `${isOpen ? 'w-[25%]' : 'w-[5%]'} bg-blue-600 py-10 duration-200`} style={{boxShadow: '1px 1px 15px #888888'}}>
        
        <nav className='flex flex-col w-full items-end gap-4'>
            <div className='flex items-center mb-5 justify-between w-full px-4 h-10'>
                {isOpen && <div className="flex items-center">
                    <img onClick={goHome} className="w-10 cursor-pointer" src={logo} alt="" />
                    <h1 className="md:text-l font-medium pl-2 text-gray-100">Inventory<br></br> Manager</h1>
                </div>}
                {isOpen ? <RiMenuUnfold4Fill onClick={handleToggle} color='white' size='30px' className='cursor-pointer' /> :<RiMenuFold4Fill onClick={handleToggle} color='white' size='30px' className='cursor-pointer' />}
            </div>

            {/* Links */}
            <div className='w-full'>
                <SidebarItems isOpen={isOpen}/>
            </div>
            
        </nav>
        
    </div>
  )
}
