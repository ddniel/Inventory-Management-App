import { TiThMenu } from "react-icons/ti";
import { RiDashboardFill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { MdBugReport } from "react-icons/md";


const menu = [
    {
        title: 'Dashboard',
        icon: <RiDashboardFill size={30}/>,
        path: '/dashboard'
    },
    {
        title: 'Add Product',
        icon: <IoIosAddCircle size={30}/>,
        path: '/add-product'
    },
    {
        title: 'Account',
        icon: <FaUserAlt size={30}/>,
        childrens: [
            {
                title: 'Profile',
                path: '/profile'
            },
            {
                title: 'Edit Profile',
                path: '/edit-profile'
            }
        ]
    },
    {
        title: 'Report Bug',
        icon: <MdBugReport size='30px' />,
        path: '/contact-us'
    },

]


export default menu