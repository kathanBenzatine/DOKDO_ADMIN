import React, { useRef } from 'react'
import { Card } from '../../components'
import { HiX } from 'react-icons/hi'
import { FaCircle } from 'react-icons/fa'
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
} from '@chakra-ui/accordion'
import { Link, useLocation } from 'react-router-dom'
import { menuListItem } from './menuListItem'
import { DashIcon } from '../../components/icons'
import { useOutsideClick } from '../../Hooks'
import { useTranslation } from 'react-i18next'

function Sidebar({ open, onClose, setCurrentRouteTitle }) {
    const sidebarRef = useRef(null)
    useOutsideClick(sidebarRef, () => {
        onClose()
    })
    return (
        <div
            className={`sm:none duration-175 linear fixed !z-50 min-h-full transition-all md:!z-50 lg:!z-50 xl:!z-0 xl:block ${open ? '' : '-translate-x-full xl:-translate-x-0'}`}
            ref={sidebarRef}
        >
            <Card
                extra={`w-[285px] ml-3 sm:mr-4 sm:my-4 h-[96.5vh] m-7 !rounded-[20px]`}
            >
                <div className="flex h-full flex-col justify-between overflow-auto">
                    <div>
                        <span
                            className="absolute right-4 top-4 block cursor-pointer xl:hidden"
                            onClick={onClose}
                        >
                            <HiX />
                        </span>
                        <div
                            className={`ml-[52px] mt-[44px] flex items-center`}
                        >
                            <div className="ml-1 mt-1 h-2.5 text-[26px] font-bold uppercase text-navy-700 dark:text-white">
                               DOKDO
                            </div>
                        </div>
                        <div className="mb-7 mt-[58px] h-px bg-gray-200 dark:bg-white/10" />
                        {/* Nav item */}
                        <ul className="ml-[10px] pt-1">
                            <MenuList
                                routes={menuListItem}
                                onClose={onClose}
                                setCurrentRouteTitle={setCurrentRouteTitle}
                            />
                        </ul>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default Sidebar

export function MenuList(props) {
    const { routes, onClose, setCurrentRouteTitle } = props
    let location = useLocation()
    const { t } = useTranslation()

    const activeRoute = (routeName) => {
        return location.pathname.includes(routeName)
    }

    const createLinks = (routes) => {
        return routes?.map((route, key) => {
            if (route.collapse) {
                return (
                    <Accordion allowToggle key={key}>
                        <AccordionItem mb="8px" border="none" key={key}>
                            <AccordionButton
                                display="flex"
                                align="center"
                                justify="center"
                                _hover={{
                                    bg: 'unset',
                                }}
                                _focus={{
                                    boxShadow: 'none',
                                }}
                                borderRadius="8px"
                                w={{
                                    sm: '100%',
                                    xl: '100%',
                                }}
                                px={route.icon ? null : '0px'}
                                py="0px"
                                bg={'transparent'}
                                ms={0}
                                mb="4px"
                                width={'100%'}
                            >
                                {route.icon ? (
                                    <div className="mb-1.5 flex w-full items-center justify-center pl-4 pr-7">
                                        <div>
                                            <div className="align-center flex w-full justify-center">
                                                <div
                                                    className={`flex items-center justify-center ${
                                                        activeRoute(
                                                            route.path.toLowerCase(),
                                                        )
                                                            ? 'text-primary dark:text-white active-icon'
                                                            : 'text-gray-600'
                                                    } ${
                                                        activeRoute(
                                                            route.path.toLowerCase(),
                                                        )
                                                            ? '22px'
                                                            : '26px'
                                                    } mr-2`}
                                                >
                                                    {route.icon}
                                                </div>
                                                <p
                                                    className={`mr-auto ${
                                                        activeRoute(
                                                            route.path.toLowerCase(),
                                                        )
                                                            ? 'text-700 font-medium text-navy-700 dark:text-white'
                                                            : 'font-medium text-gray-600'
                                                    } `}
                                                >
                                                    {t(route.name)}
                                                </p>
                                            </div>
                                        </div>
                                        <AccordionIcon
                                            ms="auto"
                                            className="!text-gray-600"
                                            transform={
                                                route.icon
                                                    ? null
                                                    : 'translateX(-70%)'
                                            }
                                        />
                                    </div>
                                ) : (
                                    <div className="ml-5 flex w-full items-center pb-0 pl-12 pr-7 pt-0">
                                        <div>
                                            <p
                                                className={`mr-auto text-sm font-medium ${
                                                    activeRoute(
                                                        route.path.toLowerCase(),
                                                    )
                                                        ? 'text-800 text-navy-700 dark:text-white'
                                                        : 'text-gray-600'
                                                } ${
                                                    activeRoute(
                                                        route.path.toLowerCase(),
                                                    )
                                                        ? '22px'
                                                        : '26px'
                                                }`}
                                            >
                                                {t(route.name)}
                                            </p>
                                        </div>
                                        <AccordionIcon
                                            ms="auto"
                                            className="!text-gray-600"
                                            transform={null}
                                        />
                                    </div>
                                )}
                            </AccordionButton>
                            <AccordionPanel
                                pe={route.icon ? null : '0px'}
                                py="0px"
                                ps={route.icon ? null : '8px'}
                            >
                                <div>
                                    {route.icon
                                        ? createLinks(route.items)
                                        : createAccordionLinks(route.items)}
                                </div>
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                )
            } else {
                return (
                    <Link
                        to={route.path}
                        key={key}
                        onClick={() => {
                            onClose()
                            setCurrentRouteTitle(t(route.name))
                        }}
                    >
                        {route.icon ? (
                            <div>
                                <div className="relative mb-2 flex hover:cursor-pointer">
                                    <li
                                        className="my-[3px] flex cursor-pointer items-center px-8"
                                        key={key}
                                    >
                                        <span
                                            className={`mt-0.5 ${
                                                activeRoute(route.path) === true
                                                    ? 'font-bold text-primary dark:text-white'
                                                    : 'text-gray-600'
                                            }`}
                                        >
                                            {route.icon ? (
                                                route.icon
                                            ) : (
                                                <DashIcon />
                                            )}
                                        </span>
                                        <span
                                            className={`ml-2 flex text-base ${
                                                activeRoute(route.path) === true
                                                    ? 'font-bold text-navy-700 dark:text-white'
                                                    : 'text-gray-600'
                                            }`}
                                        >
                                            {t(route.name)}
                                        </span>
                                    </li>
                                    {activeRoute(route.path) ? (
                                        <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-primary dark:bg-white" />
                                    ) : null}
                                </div>
                            </div>
                        ) : (
                            <div className="relative mb-2 flex hover:cursor-pointer">
                                <li
                                    className="my-[3px] flex cursor-pointer items-center px-8"
                                    key={key}
                                >
                                    <span
                                        className={`ml-5 flex text-sm leading-none ${
                                            activeRoute(route.path) === true
                                                ? 'font-medium text-navy-700 dark:text-white'
                                                : 'font-medium text-gray-600'
                                        }`}
                                    >
                                        {t(route.name)}
                                    </span>
                                </li>
                            </div>
                        )}
                    </Link>
                )
            }
        })
    }
    const createAccordionLinks = (routes) => {
        return routes.map((route, index) => {
            return (
                <Link
                    key={index}
                    to={route.path}
                    onClick={() => {
                        onClose()
                        setCurrentRouteTitle(t(route.name))
                    }}
                >
                    <div className="relative mb-1 ml-7 flex hover:cursor-pointer">
                        <li
                            className="my-[3px] flex cursor-pointer items-center px-8"
                            key={index}
                        >
                            <span className={`text-brand-500 dark:text-white`}>
                                <FaCircle className={`mr-0.5 h-1.5 w-1.5`} />
                            </span>
                            <span
                                className={`ml-2 flex text-sm ${
                                    activeRoute(route.path) === true
                                        ? 'font-medium text-navy-700 dark:text-white'
                                        : 'font-medium text-gray-600'
                                }`}
                            >
                                {t(route.name)}
                            </span>
                        </li>
                    </div>
                </Link>
            )
        })
    }
    // BRAND
    return createLinks(routes)
}
