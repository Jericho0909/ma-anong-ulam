import { useContext, useState, useEffect, useRef } from "react"
import WindowSizeContext from "../context/windowsizeContext"
import Header from "../components/header"
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
            <nav className="w-auto h-auto p-1">
                <ul className="flex justify-between items-center gap-3 p-1">
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
            </nav>
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

    return(
        <>
            <Header>
                <div className="fixed top-0 flex justify-between items-center w-full border border-black shadow-lg p-2">
                    <div className="flex items-center w-auto h-auto p-1 gap-1 cursor-pointer">
                        <div 
                            className="w-[3rem] h-[4rem]"
                        >
                            <img
                                src={MaChef}
                                alt="Mama-Chef-Img"
                                className="w-full h-full"
                            />
                        </div>
                        <div className="w-auto h-auto p-1 font-cabin text-[clamp(1rem,2vw,1.1rem)]">
                            MAMA, ANONG ULAM?
                        </div>
                    </div>
                    <div className="flex items-center w-auto h-auto p-1">
                        {isMobile
                            ? (
                                <div 
                                    className="relative"
                                    ref={dropDownRef}
                                >
                                    <button
                                        type="button"
                                        className="w-auto h-auto p-1 border border-green-500"
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
                                                className="absolute top-full mt-2 border border-red-500"
                                            >
                                                asdasd
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
                    </div>
                </div>
            </Header>
        </>
    )
}

export default UlamHomePage