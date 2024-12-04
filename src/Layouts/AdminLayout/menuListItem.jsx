import {
    MdDashboard,
    MdOutlineSupervisorAccount,
} from 'react-icons/md'

export const menuListItem = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon: <MdDashboard className="h-6 w-6" />,
        collapse: false,
    },
    {
        name: 'User List',
        path: '/user-list',
        icon: <MdOutlineSupervisorAccount className="h-6 w-6" />,
        collapse: false,
    },
    {
        name: 'Campaign List',
        path: '/campaign-list',
        icon: <MdOutlineSupervisorAccount className="h-6 w-6" />,
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
