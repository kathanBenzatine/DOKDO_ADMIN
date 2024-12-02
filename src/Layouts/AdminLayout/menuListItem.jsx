import {
    MdDashboard,
    MdOutlineDiversity1,
    MdOutlineSupervisorAccount,
    MdOutlineSupportAgent,
    MdSettings,
} from 'react-icons/md'
import { AnimalIcon } from '../../assets'

export const menuListItem = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon: <MdDashboard className="h-6 w-6" />,
        collapse: false,
    },
    {
        name: 'Admin',
        path: '/admin',
        icon: <MdOutlineSupervisorAccount className="h-6 w-6" />,
        collapse: true,
        items: [
            {
                name: 'Admin List',
                path: '/admin/list',
            },
            {
                name: 'Create Admin',
                path: '/admin/create',
            },
        ],
    },

]
