import { useContext, useState, useEffect, useRef } from "react"
import WindowSizeContext from "../context/windowsizeContext"
import Header from "../components/header"
import Main from "../components/main"
import Home from "../components/ulamHomePage/home"
import About from "../components/ulamHomePage/about"
import Navbar from "../components/navbar"
import MaChef from "../assets/images/ma-Image.jpg"
import { motion, AnimatePresence } from "framer-motion";
import { SquareMenu } from 'lucide-react';
const UlamHomePage = () => {
    const { isMobile } = useContext(WindowSizeContext)
    const [ isDropDownOpen, setIsDropDownOpen ] = useState<boolean>(false)
    const dropDownRef = useRef<HTMLDivElement | null>(null)

    const NavbarContext = () => {
        return(
            <ul className={`flex justify-between items-center gap-3 p-1
                ${isDropDownOpen ? "flex-col" : ""}
            `}>
                <li
                    className="text-FGulay font-bold font-cabin text-[clamp(1rem,2vw,1.1rem)] cursor-pointer transition-all duration-200 hoverable:hover:text-black hover:scale-105"
                >
                    HOME
                </li>
                <li 
                    className="text-FGulay font-bold font-cabin text-[clamp(1rem,2vw,1.1rem)] cursor-pointer transition-all duration-200 hoverable:hover:text-black hover:scale-105"
                >
                    ABOUT
                </li>
                <li
                    className="text-FGulay font-bold font-cabin text-[clamp(1rem,2vw,1.1rem)] cursor-pointer transition-all duration-200 hoverable:hover:text-black hover:scale-105"
                >
                    CONTACT
                </li>
                <li
                    className="text-FGulay font-bold font-cabin text-[clamp(1rem,2vw,1.1rem)] cursor-pointer transition-all duration-200 hoverable:hover:text-black hover:scale-105"
                >
                    MGA ULAM
                </li>
            </ul>
        )
    }

    const toggleDropDown = (): void => setIsDropDownOpen(prev => !prev)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if(dropDownRef.current && !dropDownRef.current.contains(event.target as Node)){
                setIsDropDownOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    useEffect(() => {
        if(!isMobile){
            setIsDropDownOpen(false)
        }
    }, [isMobile])

    return(
        <>
            <Header
                icon={MaChef}
                title="MA, ANONG ULAM?"
            >
                {isMobile
                    ? (
                        <div 
                            className="relative"
                            ref={dropDownRef}
                        >
                            <button
                                type="button"
                                className={`w-auto h-auto p-1
                                    ${isDropDownOpen ? "border-2 border-green-500 rounded" : ""}
                                `}
                                onClick={() => toggleDropDown()}
                            >
                                <SquareMenu size={20} color="black"/>
                            </button>
                            <AnimatePresence>
                                {isDropDownOpen && 
                                (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ ease: "easeOut", duration: 0.15 }}
                                        className="absolute top-full mt-2 right-0 w-[8rem] bg-[#F5F5DC] shadow-lg"
                                    >
                                        <Navbar>
                                            <NavbarContext/>
                                        </Navbar>
                                    </motion.div>
                                )
                            }
                            </AnimatePresence> 
                        </div>

                    )
                    : (
                        <Navbar>
                            <NavbarContext/>
                        </Navbar>
                    )
                }
            </Header>
            <Main>
                <Home/>
                <About/>
            </Main>
        </>
    )
}

export default UlamHomePage