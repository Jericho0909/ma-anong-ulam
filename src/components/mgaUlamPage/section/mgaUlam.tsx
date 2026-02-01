import { useEffect, useState, useContext, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import SearchModeContext from "../../../context/searchModeContext";
import UlamResultContext from "../../../context/ulamResultContext";
import ItemCard from "../../itemcard";
import type { UlamTypes, DataList } from "../../../types/model"
import { X } from 'lucide-react';
interface MgaUlamProps {
    mgaUlam: DataList<any>;

    ulamContainerRef: React.RefObject<HTMLDivElement | null>
}

const MgaUlam = ({ mgaUlam,  ulamContainerRef }: MgaUlamProps) => {
    const { angNaHanapNaUlam,
        mayHinahanapNaUlam,
        setMayHinahanapUlam,
        resetUlam,
        setResetUlam
    } = useContext(UlamResultContext)
    const { setSearch,
        setSuggestionSearch,
        setMgaSangkapNaMeronKa,
        angUlamNaHinahanp,
        setAngUlamNaHinahanap,
        ginamitNaSangkap,
        setGinamitNaSangkap
    } = useContext(SearchModeContext)
    const [ searchParam, setSearchParams ] = useSearchParams()
    const [ ulam, setUlam ] = useState< UlamTypes[]>(mgaUlam.data)
    const [ isDefaultUlams, setIsDefaultUlams ] = useState<boolean>(true)
    const ulamRefs = useRef<Record<string, HTMLDivElement | null>>({})
    const searchMode = sessionStorage.getItem("searchMode")
    const searchParams = sessionStorage.getItem("lastSearch")
    const sangkapParams = sessionStorage.getItem("lastSangkap")
    const lastUlamsList = sessionStorage.getItem("ulamList")
    const parsedUSangkapt = sangkapParams ? JSON.parse(sangkapParams) : []
    const parsedUlamsList = lastUlamsList ? JSON.parse(lastUlamsList) : []

    const hanldeDefaultUlams = () => {
        setIsDefaultUlams(true)
        setSearch("")
        setSuggestionSearch("")
        setMgaSangkapNaMeronKa([])
        setMayHinahanapUlam(false)
        setSearchParams({search: ""})
        setUlam(mgaUlam.data)
        sessionStorage.removeItem("lastSearch")
        sessionStorage.removeItem("lastSangkap")
        sessionStorage.removeItem("ulamList")
    }

    useEffect(() => {
        setSearchParams(searchMode === "text" 
            ? { search: searchParams || ""}
            : {sangkap: parsedUSangkapt || []}
        )
        if(parsedUlamsList.length >=1 && angNaHanapNaUlam.length === 0 && !mayHinahanapNaUlam){
            setUlam(parsedUlamsList)
            if(searchMode === "text"){
                setSearch(searchParams || "")
                setSuggestionSearch(searchParams || "")
                setAngUlamNaHinahanap(searchParams || "")
            }

            if(searchMode === "sangkap"){
                const sangkap = searchParam.getAll("sangkap")
                setMgaSangkapNaMeronKa(sangkap)
                setGinamitNaSangkap(sangkap)

            }
            setResetUlam(false)
            setIsDefaultUlams(false)
        }

        if(resetUlam){
            hanldeDefaultUlams()
            return
        }

        if(mayHinahanapNaUlam){
            setIsDefaultUlams(false)
            setUlam(angNaHanapNaUlam)
            return
        }

    }, [angNaHanapNaUlam, resetUlam, mayHinahanapNaUlam])

    return(
        <section 
            ref={ulamContainerRef}
            className="w-full sm:w-[95%] lg:w-[90%] h-auto mt-[2rem] p-2 border-2 border-[#8B4513] rounded-md shadow-lg"
        >
            <h6 className="font-cabin text-[2.15rem] font-bold mb-2">
                MGA ULAM
            </h6>
            {!isDefaultUlams && (
                <div
                    className="flex items-center justify-between px-2 py-1 w-[35%] mb-1"
                >
                   <p className="text-xs italic truncate">
                        {searchMode === "text"
                            ? `Hinahanap mo ay: "${angUlamNaHinahanp}"`
                            : `Mga sangkap na ginamit: ${ginamitNaSangkap.join(", ")}`
                        }
                   </p>
                   <button
                        type="button"
                        className="p-1 rounded-full cursor-pointer
                            transition-all duration-150 ease-out
                            hoverable:hover:bg-red-100
                            hoverable:hover:text-red-600
                            active:scale-95
                        "
                        onClick={() => hanldeDefaultUlams()}
                   >
                        <X
                            size={16}
                            color="black"
                        />
                   </button>
                </div>
            )}
            
            {(angNaHanapNaUlam.length === 0 && mayHinahanapNaUlam && parsedUlamsList.length === 0)
                ? (
                    <div className="flex justify-center items-center w-full h-[50svh]">
                        <p className="font-quicksand font-medium text-sm">
                            Walang nahanap… pero baka masarap pa rin ang iba naming ulam!
                        </p>
                    </div>
                )
                : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-5 min-h-[55vh]">
                        {ulam.map((ulam) => (
                            <ItemCard
                                key={ulam.id}
                                ulam={ulam}
                                ulamRefs={ulamRefs}
                            />
                        ))}
                    </div>
                )
            }
        </section>
    )
}

export default MgaUlam