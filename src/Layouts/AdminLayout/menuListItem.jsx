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
        name: 'User List',
        path: '/user-list',
        icon: <MdOutlineSupervisorAccount className="h-6 w-6" />,
        collapse: false,
    },
    {
        name: 'Drinks',
        path: '/drinks',
        icon: <MdOutlineDiversity1 className="h-6 w-6" />,
        collapse: true,
        items: [
            {
                name: 'HP Drinks',
                path: '/drinks/hp-drinks-list',
            },
            {
                name: 'D Drinks',
                path: '/drinks/d-drinks-list',
            },
        ],
    },
    {
        name: 'Animal',
        path: '/animal',
        icon: <AnimalIcon className="custom-icon" />,
        collapse: true,
        items: [
            {
                name: 'Animal List',
                path: '/animal/animal-list',
            },
            {
                name: 'Add Animal',
                path: '/animal/add-animal',
            },
        ],
    },
    {
        name: 'Support',
        path: '/support',
        icon: <MdOutlineSupportAgent className="h-6 w-6" />,
        collapse: true,
        items: [
            {
                name: 'Add Reason',
                path: '/support/add-reason',
            },
            {
                name: 'Support List',
                path: '/support/list',
            },
        ],
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
    {
        name: 'App Settings',
        path: '/app-setting',
        icon: <MdSettings className="h-6 w-6" />,
        collapse: false,
    },
    {
        name: 'Config',
        path: '/config',
        icon: <MdSettings className="h-6 w-6" />,
        collapse: false,
    },
]
