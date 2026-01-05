import { useContext } from "react"
import WindowSizeContext from "../context/windowsizeContext"
import Header from "../components/header"
import Navbar from "../components/navbar"
import MaChef from "../assets/images/ma-Image.jpg"
const UlamHomePage = () => {
    const { isMobile } = useContext(WindowSizeContext)
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
                        <Navbar>
                            <NavbarContext/>
                        </Navbar>
                    </div>
                </div>
            </Header>
        </>
    )
}

export default UlamHomePage