import { useState, useRef, useEffect, useContext } from 'react';
import SearchContext from '../../../context/searchContext';
import MgaSangkapNaMeronKaContext from '../../../context/mgaSangkapNaMeronKa';
import MgaMungkahingUlam from '../mgaMungkahingUlam';
import { useDebounce } from "@uidotdev/usehooks";
import { UtensilsCrossed } from 'lucide-react';
import { Search } from 'lucide-react';
import type { DataList, UlamTypes } from '../../../types/model';

interface HanapUlamProps {
    mgaUlam: DataList<any>;
    setAngNaHanapNaUlam: React.Dispatch<React.SetStateAction<UlamTypes[]>>;
    setMayHinahanapUlam: React.Dispatch<React.SetStateAction<boolean>>;
    setResetUlam: React.Dispatch<React.SetStateAction<boolean>>;
    ulamContainerRef: React.RefObject<HTMLDivElement | null>;
}

const HanapUlam = ({ mgaUlam, setAngNaHanapNaUlam, setMayHinahanapUlam, setResetUlam, ulamContainerRef }: HanapUlamProps ) => {
    const { search, setSearch } = useContext(SearchContext)
    const { setMgaSangkapNaMeronKa } = useContext(MgaSangkapNaMeronKaContext)
    const [ suggestionSearch, setSuggestionSearch ] = useState<string>("")
    const [ focus, setFocus ] = useState<boolean>(false)
    const [ scrollTrigger, setScrollTrigger ] = useState(0)
    const [ ipakitaAngMinungkahingUlam, setIpakitaAngMinungkahingUlam ] = useState<boolean>(false)
    const [ mgaMinungkahingUlam, setMgaMinungkahingUlam ] = useState<UlamTypes[]>([])
    const [ activeIndex, setActiveIndex ] = useState<number>(-1)
    const inputRef = useRef<HTMLInputElement>(null)
    const searchBoxRef = useRef<HTMLDivElement | null>(null)
    const debouncedSearchTerm = useDebounce(suggestionSearch, 300)
    const filterSearch = debouncedSearchTerm.trim().toLowerCase()

    const hanapinUlam = (hanap: string): UlamTypes[] => {
        return mgaUlam.data.filter((ulam) => ulam.name.toLowerCase().includes(hanap))
    }

    const handleHanap = (angHinahanap: string): void => {
        const safeSearch: string = angHinahanap.trim().toLowerCase()
        setResetUlam(false)
        setMayHinahanapUlam(true)
        setAngNaHanapNaUlam(hanapinUlam(safeSearch))
        setIpakitaAngMinungkahingUlam(false)
        setMgaSangkapNaMeronKa([])
        setScrollTrigger((prev) => prev + 1)
    }

    useEffect(() => {
        if(debouncedSearchTerm !== ""){
            setIpakitaAngMinungkahingUlam(true)
            const result = hanapinUlam(filterSearch)
            setMgaMinungkahingUlam(result)
            setActiveIndex(-1)
        } 
        else{
            setResetUlam(true)
            setMayHinahanapUlam(false)
            setIpakitaAngMinungkahingUlam(false)
            setMgaMinungkahingUlam([])
            setActiveIndex(-1)
        }
    }, [debouncedSearchTerm, setResetUlam])

    useEffect(() => {
        if (activeIndex >= 0 && mgaMinungkahingUlam[activeIndex]) {
            setSearch(mgaMinungkahingUlam[activeIndex].name)
        }
    }, [activeIndex])

    useEffect(() => {
        if(scrollTrigger > 0) {
            ulamContainerRef.current?.scrollIntoView({ behavior: "smooth" })
        }
    }, [scrollTrigger])

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if(searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)){
                setIpakitaAngMinungkahingUlam(false)
                setActiveIndex(0)
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
                            onChange={(e) => {
                                setSuggestionSearch(e.target.value)
                                setSearch(e.target.value)
                            }}
                            className="font-figtree font-medium w-full border border-green-500 focus:border border-none"
                            onFocus={() => {
                                setFocus(true)
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
                    />
                )}
            </section>
        </>
    )
}

export default HanapUlam