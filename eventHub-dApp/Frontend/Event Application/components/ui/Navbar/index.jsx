// Import necessary components and modules
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Brand from '../Brand'
import NavLink from '../NavLink'
import { useSelector, useDispatch } from "react-redux"
import { removeUser } from 'components/GolabalReducers/Features/UserCredentials'
import dynamic from "next/dynamic";
import { SuccessToast } from '@/utils/toast'

const Navbar = () => {
    const [state, setState] = useState(false)
    const { events } = useRouter();
    const dispatch = useDispatch();
    const navigation = [
        { title: "Create Event", path: "/events/create" },
        { title: "View Events", path: "/events/view" },
    ]

    useEffect(() => {
        // Close the navbar menu when navigate
        const handleState = () => {
            document.body.classList.remove("overflow-hidden")
            setState(false)
        }
        events.on("routeChangeStart", () => handleState());
        events.on("hashChangeStart", () => handleState());
    }, []) //eslint-disable-line

    const handleNavMenu = () => {
        setState(!state)
        document.body.classList.toggle("overflow-hidden")
    }

    return (
        <header>
            <nav className={`bg-white w-full md:static md:text-sm ${state ? "fixed z-10 h-full" : ""}`}>
                <div className="custom-screen items-center mx-auto md:flex">
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <Brand />
                        <div className="md:hidden">
                            <button
                                role="button"
                                aria-label="Open the menu"
                                className="text-gray-500 hover:text-gray-800"
                                onClick={handleNavMenu}
                            >
                                {
                                    state ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                        </svg>
                                    )
                                }
                            </button>
                        </div>
                    </div>
                    <div className={`flex-1 pb-3 mt-8 md:pb-0 md:mt-0 md:block ${state ? "" : "hidden"}`}>
                        <ul className="text-gray-700 justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0 md:text-gray-600 md:font-medium">
                            {
                                navigation.map((item, idx) => (
                                    <li key={idx} className="duration-150 hover:text-gray-900">
                                        <NavLink className="block" href={item.path}>
                                            {item.title}
                                        </NavLink>
                                    </li>
                                ))
                            }
                            {
                                useSelector(state => state.userCredentials).address && (
                                    <li className="duration-150 hover:text-gray-900">
                                        <NavLink className="block" href='/dashboard'>
                                            Dashboard
                                        </NavLink>
                                    </li>
                                )
                            }
                            {
                                useSelector(state => state.userCredentials).address ? (
                                    <li>
                                        <NavLink
                                            onClick={() => {
                                                SuccessToast("Loged Out Successfully")
                                                dispatch(removeUser());
                                            }}
                                            href="/"
                                            className="py-2 px-4 text-center rounded-3xl duration-150 text-white text-bold text-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 mb-5 hover:from-yellow-500 hover:via-red-500 hover:to-pink-500 hover:ring ring-transparent ring-offset-2 transition flex justify-center w-[100px] m-auto md:block sm:m-0"
                                            style={{borderRadius: "30px"}}
                                        >
                                            Logout
                                        </NavLink>
                                    </li>
                                ) : (
                                    <li>
                                        <NavLink
                                            href="/login"
                                            className="py-2 px-3 text-center rounded-3xl duration-150 text-white text-bold text-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 mb-5 hover:from-yellow-500 hover:via-red-500 hover:to-pink-500 hover:ring ring-transparent ring-offset-2 transition"
                                            style={{borderRadius: "30px"}}
                                        >
                                            Login
                                        </NavLink>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default dynamic (() => Promise.resolve(Navbar), {ssr: false})
