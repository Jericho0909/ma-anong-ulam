import { useContext, useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import FetchDataContext from "../context/fetchDatabaseContext";
import { useNavigate } from "react-router-dom";
import Header from "../components/header"
import Main from "../components/main";
import HanapUlam from "../components/mgaUlamPage/section/hanapUlam";
import HanapUlamSaSangkap from "../components/mgaUlamPage/section/hanapUlamSaSangkap";
import MgaUlam from "../components/mgaUlamPage/section/mgaUlam";
import Loading from "../components/loading";
import Error from "../components/error";
import type { UlamTypes } from "../types/model";
import UlamIcon from "../assets/images/ulam2.jpg"
import { ArrowBigRight } from 'lucide-react';
const MgaUlamPage = () => {
    const { mgaUlam, 
        fetchError, 
    } = useContext(FetchDataContext)
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const [ mayHinahanapNaUlam, setMayHinahanapUlam ] = useState(false)
    const [ resetUlam, setResetUlam ] = useState<boolean>(false)
    const [ angNaHanapNaUlam, setAngNaHanapNaUlam ] = useState<UlamTypes[]>([])
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
        }, 3000)

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
                <button
                    type="button"
                    className="
                        w-auto h-auto p-1 transition-transform duration-300
                        hoverable:hover:scale-110 hoverable:hover:shadow-lg
                        hoverable:hover:bg-green-100 rounded-full
                    "
                    onClick={() => handleBackToHome()}
                >
                    <ArrowBigRight
                        size={46}
                        color="#16A34A"
                        className="transition-colors duration-300 hoverable:hover:text-green-700"
                    />
                </button>
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
                                setAngNaHanapNaUlam={setAngNaHanapNaUlam}
                                setMayHinahanapUlam={setMayHinahanapUlam}
                                setResetUlam={setResetUlam}
                                ulamContainerRef={ulamContainerRef}
                            />
                            <HanapUlamSaSangkap
                                mgaUlam={mgaUlam}
                                mgaSangkap={mgaSangkap}
                                setAngNaHanapNaUlam={setAngNaHanapNaUlam}
                                setResetUlam={setResetUlam}
                                setMayHinahanapUlam={setMayHinahanapUlam}
                                ulamContainerRef={ulamContainerRef}
                            />
                            <MgaUlam
                                mgaUlam={mgaUlam}
                                angNaHanapNaUlam={angNaHanapNaUlam}
                                mayHinahanapNaUlam={mayHinahanapNaUlam}
                                resetUlam={resetUlam}
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