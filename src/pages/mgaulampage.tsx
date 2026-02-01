import { useContext, useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FirebaseDatabaseContext from "../context/firebaseDatabaseContext";
import ShowToast from "../components/showToast";
import Header from "../components/header"
import Main from "../components/main";
import HanapUlam from "../components/mgaUlamPage/section/hanapUlam";
import HanapUlamSaSangkap from "../components/mgaUlamPage/section/hanapUlamSaSangkap";
import MgaUlam from "../components/mgaUlamPage/section/mgaUlam";
import Loading from "../components/loading";
import Error from "../components/error";
import BackButton from "../components/backbutton";
import UlamIcon from "../assets/images/ulam2.jpg"


const MgaUlamPage = () => {
    const { mgaUlam, fetchError} = useContext(FirebaseDatabaseContext)
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const [ isLoading, setIsLoading ] = useState<boolean>(true) 
    const ulamContainerRef = useRef<HTMLDivElement | null>(null)
    const filterData = mgaUlam.data.flatMap(item => item.ingredients);
    const mgaSangkap = [...new Set(filterData)].sort((a, b) =>
    a.localeCompare(b))

    const handleBackToHome = (): void => {
        navigate("/")
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    useEffect(() => {
        const timer = setInterval(() => {
            setIsLoading(false)
        }, 2500)

        return () => clearInterval(timer)
    }, [])

    if(isLoading){
        return(
            <Loading/>
        )
    }

    return(
        <>
            <Header
                icon={UlamIcon}
                title="MGA ULAM"
            >
                <BackButton
                    handleBack={handleBackToHome}
                />
            </Header>
            <Main>
                {fetchError
                    ? (
                        <Error/>
                    )
                    : (
                        <>
                            <HanapUlam
                                mgaUlam={mgaUlam}
                                ulamContainerRef={ulamContainerRef}
                            />
                            <HanapUlamSaSangkap
                                mgaUlam={mgaUlam}
                                mgaSangkap={mgaSangkap}
                                ulamContainerRef={ulamContainerRef}
                            />
                            <MgaUlam
                                mgaUlam={mgaUlam}
                                ulamContainerRef={ulamContainerRef}
                            />
                        </>
                    )
                }
            </Main>
        </>
    )
}

export default MgaUlamPage