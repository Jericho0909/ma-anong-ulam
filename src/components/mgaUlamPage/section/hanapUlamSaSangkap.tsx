import { useContext, useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import SearchModeContext from '../../../context/searchModeContext';
import UlamResultContext from '../../../context/ulamResultContext';
import type { DataList } from '../../../types/model';
import { X } from 'lucide-react';

interface HanapUlamSaSangkapProps {
    mgaUlam: DataList<any>;
    mgaSangkap: string[];
    ulamContainerRef: React.RefObject<HTMLDivElement | null>;
}
const HanapUlamSaSangkap = ({ mgaSangkap, mgaUlam, ulamContainerRef }: HanapUlamSaSangkapProps) => {
    const { setAngNaHanapNaUlam,
        setMayHinahanapUlam,
        setResetUlam,
    } = useContext(UlamResultContext)
    const { setSearch, 
        setSuggestionSearch,
        mgaSangkapNaMeronKa, 
        setMgaSangkapNaMeronKa,
        setGinamitNaSangkap,    
    } = useContext(SearchModeContext)
     const [ , setSearchParams ] = useSearchParams()
    const [ scrollTrigger, setScrollTrigger ] = useState(0)

    const pwedeLutuinUlam = () => {
        const mgaPwedeLutuin = mgaUlam.data.filter((ulam) => {
            const matchCount = ulam.ingredients.filter((ingredient: string) => mgaSangkapNaMeronKa.includes(ingredient)).length

            return matchCount >= 3
        })
        setAngNaHanapNaUlam(mgaPwedeLutuin)
        sessionStorage.setItem("searchMode", "sangkap")
        sessionStorage.setItem("lastSangkap", JSON.stringify(mgaSangkapNaMeronKa))
        sessionStorage.setItem("ulamList", JSON.stringify(mgaPwedeLutuin))
    }

    const hanldleHanap = (): void => {
        setResetUlam(false)
        setMayHinahanapUlam(true)
        setGinamitNaSangkap(mgaSangkapNaMeronKa)
        pwedeLutuinUlam()
        setSearch("")
        setSuggestionSearch("")
        setScrollTrigger((prev) => prev + 1)
        setSearchParams({
            sangkap: mgaSangkapNaMeronKa
        })
    }

    const hanldeDagdagSangkap = (sangkap: string): void => {
        const bagongMgaSangkap = [...mgaSangkapNaMeronKa, sangkap]
        setMgaSangkapNaMeronKa(bagongMgaSangkap)
        setSearchParams({
            sangkap: bagongMgaSangkap
        })
        
    }

    const handleTanggalSangkap = (index: number): void => {
        if(index === 0){
            setResetUlam(true)
            sessionStorage.setItem("searchMode", "")
        }
        const bagongMgaSangkap = mgaSangkapNaMeronKa.filter((_, i) => i !== index)
        setMgaSangkapNaMeronKa(bagongMgaSangkap)
        setMayHinahanapUlam(false)
        setSearchParams({
            sangkap: bagongMgaSangkap
        })
    }

    useEffect(() => {
        if(scrollTrigger > 0) {
            ulamContainerRef.current?.scrollIntoView({ behavior: "smooth" })
        }
    }, [scrollTrigger])

    return(
        <section className="flex justify-center items-center flex-col w-full sm:w-[90%] lg:w-[75%] xl:w-[65%] h-auto p-1 mt-[2rem]">
            <div className="flex justify-start items-center flex-col w-full h-auto p-1 border-2 border-FGulay rounded-md shadow-lg mb-2">
                <div className="w-full h-auto p-1">
                    <h6 className="font-cabin text-[1rem] font-semibold mb-6 sm:mb-2 relative">
                        MGA SANGKAP NA MERON KA
                        <span className="absolute top-6 left-0 sm:-top-1 sm:-right-1 sm:left-auto text-xs font-light italic">
                            3 sangkap pataas para maghanap ng ulam
                        </span>
                    </h6>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full h-[12rem] overflow-y-auto mb-2">
                        {mgaSangkapNaMeronKa.map((sangkap, index) => (
                            
                            <div
                            key={index}
                            className="flex justify-center items-center w-full h-[3.20rem] font-quicksand font-bold text-center border border-green-500
                            relative cursor-pointer rounded-md
                            transition-all duration-150 ease-out
                            hoverable:hover:bg-green-100
                            hoverable:hover:border-green-600
                            hover:shadow-md"
                            >
                                {sangkap}
                            <button
                                type="button"
                                className="absolute top-0 right-0
                                p-1 rounded-lg
                                transition-colors duration-150
                                hoverable:hover:bg-red-100"
                                onClick={() => handleTanggalSangkap(index)}
                            >
                                <X size={14} color="red" />
                            </button>
                        </div>
                            
                            
                        ))}
                    </div>
                </div>
                <div className="w-full h-auto p-1">
                    <h6 className="font-cabin text-[1rem] font-semibold mb-2">
                        ANG MGA SANGKAP
                    </h6>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full h-[15rem] sm:h-[12rem]  overflow-y-auto mb-2">
                        {mgaSangkap.map((sangkap, index) => (
                            <button
                            key={index}
                            className={`flex justify-center items-center w-full h-[3.20rem] text-center
                                bg-green-500 text-black font-quicksand font-bold rounded-md p-1
                                shadow-sm transition-all duration-300 ease-out transform
                                ${mgaSangkapNaMeronKa.includes(sangkap) ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"}
                            `}
                            onClick={() => hanldeDagdagSangkap(sangkap)}
                            >
                                {sangkap}
                            </button>

                        ))}
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center w-full p-1">
                <button
                    type="button"
                    disabled={mgaSangkapNaMeronKa.length <= 2}
                    className={`font-cabin font-bold rounded-lg bg-green-600 px-6 py-2.5 text-white shadow-sm transition duration-200 hover:bg-green-700 hoverable:hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-green-300
                        ${mgaSangkapNaMeronKa.length <= 2
                            ? "cursor-not-allowed"
                            : ""
                        }
                    `}
                    onClick={() => hanldleHanap()}
                >
                    Hanapin
                </button>
            </div>
        </section>
    )
}

export default HanapUlamSaSangkap