import { useState, useRef, useEffect, useContext } from 'react';
import { useSearchParams } from "react-router-dom";
import SearchModeContext from '../../../context/searchModeContext';
import UlamResultContext from '../../../context/ulamResultContext';
import MgaMungkahingUlam from '../mgaMungkahingUlam';
import { useDebounce } from "@uidotdev/usehooks";
import { UtensilsCrossed } from 'lucide-react';
import { Search } from 'lucide-react';
import type { DataList, UlamTypes } from '../../../types/model';

interface HanapUlamProps {
    mgaUlam: DataList<any>;
    ulamContainerRef: React.RefObject<HTMLDivElement | null>;
}

const HanapUlam = ({ mgaUlam, ulamContainerRef }: HanapUlamProps ) => {
    const { setAngNaHanapNaUlam,
        setMayHinahanapUlam,
        setResetUlam,
    } = useContext(UlamResultContext)
    const {  search, 
        setSearch,
        suggestionSearch,
        setSuggestionSearch,
        setMgaSangkapNaMeronKa,
        setAngUlamNaHinahanap
    } = useContext(SearchModeContext)
    const [ , setSearchParams ] = useSearchParams()
    const [ focus, setFocus ] = useState<boolean>(false)
    const [ scrollTrigger, setScrollTrigger ] = useState(0)
    const [ ipakitaAngMinungkahingUlam, setIpakitaAngMinungkahingUlam ] = useState<boolean>(false)
    const [ mgaMinungkahingUlam, setMgaMinungkahingUlam ] = useState<UlamTypes[]>([])
    const [ activeIndex, setActiveIndex ] = useState<number>(-1)
    const inputRef = useRef<HTMLInputElement>(null)
    const searchBoxRef = useRef<HTMLDivElement | null>(null)
    const debouncedSearchTerm = useDebounce(suggestionSearch, 300)
    const filterSearch = debouncedSearchTerm.trim().toLowerCase()
    const searchMode = sessionStorage.getItem("searchMode")


    const hanapinUlam = (hanap: string): UlamTypes[] => {
        return mgaUlam.data.filter((ulam) => ulam.name.toLowerCase().includes(hanap) || ulam.mainIngredient.toLowerCase().includes(hanap))
    }

    const handleHanap = (angHinahanap: string): void => {
        const safeSearch: string = angHinahanap.trim().toLowerCase()
        setAngUlamNaHinahanap(safeSearch)
        setResetUlam(false)
        setMayHinahanapUlam(true)
        setAngNaHanapNaUlam(hanapinUlam(safeSearch))
        setMgaSangkapNaMeronKa([])
        setScrollTrigger((prev) => prev + 1)
        setActiveIndex(-1)
        if(activeIndex >= 0){
            setSuggestionSearch(mgaMinungkahingUlam[activeIndex].name)
        }
        sessionStorage.setItem("searchMode", "text")
        sessionStorage.setItem("lastSearch", safeSearch)
        sessionStorage.setItem("ulamList", JSON.stringify(hanapinUlam(safeSearch)))
    }

    useEffect(() => {
        if(debouncedSearchTerm !== ""){
            const result = hanapinUlam(filterSearch)
            setMgaMinungkahingUlam(result)
        } 
        else{
            if(searchMode === "text"){
                setResetUlam(true)
                setMayHinahanapUlam(false)
            }
            setMgaMinungkahingUlam([])
            setSuggestionSearch("")
        }
        
        setActiveIndex(-1)
    }, [debouncedSearchTerm, setResetUlam])

    useEffect(() => {
        if (activeIndex >= 0 && mgaMinungkahingUlam[activeIndex]) {
            setSearch(mgaMinungkahingUlam[activeIndex].name)
            setSearchParams({search: mgaMinungkahingUlam[activeIndex].name})
        }
    }, [activeIndex])

    useEffect(() => {
        if(scrollTrigger > 0) {
            ulamContainerRef.current?.scrollIntoView({ 
                behavior: "smooth",
                block: "nearest"
            })
        }
    }, [scrollTrigger])


    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if(searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)){
                setIpakitaAngMinungkahingUlam(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])
    

    return(
        <>
            <section
                ref={searchBoxRef} 
                className="w-[95%] sm:w-[50%] lg:w-[40%] xl:w-[25%] h-auto p-1 relative"
            >
                <div 
                    className={`flex justify-between items-center w-full p-1 border rounded-md
                        ${focus ? "border-FGulay shadow-[0_0_0_2px_rgba(22,163,74,0.25)]" : "border-black"}    
                    `}
                >
                    <div className="w-auto p-1">
                        <UtensilsCrossed
                            size={20}
                            color="black"
                        />
                    </div>
                    <div className="flex-1">
                        <input
                            ref={inputRef}
                            type="text"
                            spellCheck={false}
                            value={search}
                            placeholder="Search...."
                            onChange={(e) => {
                                setSuggestionSearch(e.target.value)
                                setSearch(e.target.value)
                                setSearchParams({ search: e.target.value })
                            }}
                            className="font-figtree font-medium w-full border border-green-500 focus:border border-none no-border"
                            onFocus={() => {
                                setFocus(true)
                                setIpakitaAngMinungkahingUlam(true)
                            }}
                            onBlur={() => {
                                setFocus(false)
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleHanap(search)
                                    setFocus(false)
                                    inputRef.current?.blur()
                                    setActiveIndex(-1)
                                    setIpakitaAngMinungkahingUlam(false)
                                    return
                                }

                                if (e.key === "ArrowUp") {
                                    e.preventDefault()

                                    setActiveIndex(prev => {
                                        const nextIndex =
                                            prev > 0 ? prev - 1 : mgaMinungkahingUlam.length - 1
                                        return nextIndex
                                    })
                                }

                                if (e.key === "ArrowDown") {
                                    e.preventDefault()

                                    setActiveIndex(prev => {
                                        const nextIndex =
                                            prev < mgaMinungkahingUlam.length - 1 ? prev + 1 : 0
                                        return nextIndex
                                    })
                                }
                            }}
                        />
                    </div>
                    <button
                        type="button"
                        className="w-auto p-1 transition-transform duration-200 hover:scale-110 cursor-pointer"
                        onClick={() => handleHanap(search)}
                    >
                        <Search size={20} color="black" />
                    </button>
                </div>
                {ipakitaAngMinungkahingUlam && (
                    <MgaMungkahingUlam
                        mgaMinungkahingUlam={mgaMinungkahingUlam}
                        handleHanap={handleHanap}
                        setIpakitaAngMinungkahingUlam={setIpakitaAngMinungkahingUlam}
                        activeIndex={activeIndex}
                        setSearch={setSearch}
                        debouncedSearchTerm={debouncedSearchTerm}
                        setSearchParams={setSearchParams}
                    />
                )}
            </section>
        </>
    )
}

export default HanapUlam