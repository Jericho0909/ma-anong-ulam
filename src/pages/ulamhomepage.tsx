import { useContext, useState, useEffect, useRef } from "react"
import WindowSizeContext from "../context/windowsizeContext"
import Header from "../components/header"
import Navbar from "../components/navbar"
import Main from "../components/main"
import Home from "../components/ulamHomePage/section/home"
import About from "../components/ulamHomePage/section/about"
import Contact from "../components/ulamHomePage/section/contact"
import MgaUlam from "../components/ulamHomePage/section/mgaUlam"
import Footer from "../components/footer"
import GridGallery from "../components/gridgallery"
import TypesOfCooking from "../data/typesOfCookingImg"
import MaChef from "../assets/images/ma-Image.jpg"
import { motion, AnimatePresence } from "framer-motion";
import { SquareMenu } from 'lucide-react';
const UlamHomePage = () => {
    const { isMobile } = useContext(WindowSizeContext)
    const { DryHeatCookingImg, 
        MoistHeatCookingImg,
        CombinationModernCookingImg
    } = TypesOfCooking()
    const [ isDropDownOpen, setIsDropDownOpen ] = useState<boolean>(false)
    const [ activeSection, setActiveSection ] = useState<string>("home")
    const [ delay, setDelay ] = useState<boolean>(true)
    const dropDownRef = useRef<HTMLDivElement | null>(null)

    const scrollToSection = (id: string): void => {
        const sectionId = document.getElementById(id)
        if (!sectionId) return 

        if(sectionId){
            sectionId.scrollIntoView({behavior: 'smooth', block: 'center'})
        }
    }

    const NavbarContext = () => {
        return(
            <ul className={`flex justify-between items-center gap-3 p-1
                ${isDropDownOpen ? "flex-col" : ""}
            `}>
                <li
                    className={`text-FGulay font-bold font-cabin text-[clamp(1rem,2vw,1.1rem)] cursor-pointer transition-all duration-200
                        ${activeSection === "home" ? "text-black scale-110" : "hoverable:hover:text-black hover:scale-105"}
                    `}
                    onClick={() => scrollToSection("home")}
                >
                    HOME
                </li>
                <li 
                    className={`text-FGulay font-bold font-cabin text-[clamp(1rem,2vw,1.1rem)] cursor-pointer transition-all duration-200
                        ${activeSection === "about" ? "text-black scale-110" : "hoverable:hover:text-black hover:scale-105"}
                    `}
                    onClick={() => scrollToSection("about")}
                >
                    ABOUT
                </li>
                <li
                    className={`text-FGulay font-bold font-cabin text-[clamp(1rem,2vw,1.1rem)] cursor-pointer transition-all duration-200
                        ${activeSection === "contact" ? "text-black scale-110" : "hoverable:hover:text-black hover:scale-105"}
                    `}
                    onClick={() => scrollToSection("contact")}
                >
                    CONTACT
                </li>
                <li
                    className={`text-FGulay font-bold font-cabin text-[clamp(1rem,2vw,1.1rem)] cursor-pointer transition-all duration-200
                        ${activeSection === "mgaUlam" ? "text-black scale-110" : "hoverable:hover:text-black hover:scale-105"}
                    `}
                    onClick={() => scrollToSection("mgaUlam")}
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

    useEffect(() => {
        const timer = setTimeout(() => {
            setDelay(false)
        }, 150)

        return () => clearTimeout(timer)
    }, [])

    if(delay) return null

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
                <Home setActiveSection={setActiveSection}/>
                <div className="flex justify-center items-center flex-col h-auto w-full">
                    <h6 className="font-cabin text-center text-[1.70rem] font-bold w-[80%] lg:w-[45%] border border-b-0 border-black bg-orange-500 rounded-t-xl">
                        Dry-Heat Cooking Methods
                    </h6>
                    <GridGallery 
                        imgArr={DryHeatCookingImg} 
                        bg={"bg-orange-400"}
                    />
                </div>
                <About setActiveSection={setActiveSection}/>
                <div className="flex justify-center items-center flex-col h-auto w-full">
                    <h6 className="font-cabin text-center text-[1.70rem] font-bold w-[80%] lg:w-[45%] border border-b-0 border-black bg-blue-500 rounded-t-xl">
                        Moist-Heat Cooking Methods
                    </h6>
                    <GridGallery 
                        imgArr={MoistHeatCookingImg} 
                        bg={"bg-blue-400"}
                    />
                </div>
                <Contact setActiveSection={setActiveSection}/>
                <div className="flex justify-center items-center flex-col h-auto w-full">
                    <h6 className="font-cabin text-center text-[1.70rem] font-bold w-[80%] lg:w-[45%] border border-b-0 border-black bg-green-700 rounded-t-xl">
                        Combination/Modern Methods
                    </h6>
                    <GridGallery 
                        imgArr={CombinationModernCookingImg} 
                        bg={"bg-green-600"}
                    />
                </div>
                <MgaUlam setActiveSection={setActiveSection}/>
            </Main>
            <Footer/>
        </>
    )
}

export default UlamHomePage