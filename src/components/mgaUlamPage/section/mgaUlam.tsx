import { useEffect, useState, useContext } from "react";
import SearchModeContext from "../../../context/searchModeContext";
import ItemCard from "../../itemcard";
import type { UlamTypes, DataList } from "../../../types/model"
import { X } from 'lucide-react';
interface MgaUlamProps {
    mgaUlam: DataList<any>;
    angNaHanapNaUlam: UlamTypes[];
    mayHinahanapNaUlam: boolean;
    resetUlam: boolean;
    ulamContainerRef: React.RefObject<HTMLDivElement | null>
}

const MgaUlam = ({ mgaUlam, angNaHanapNaUlam, mayHinahanapNaUlam, resetUlam, ulamContainerRef }: MgaUlamProps) => {
    const { searchMode, 
        setSearch, 
        setMgaSangkapNaMeronKa,
        angUlamNaHinahanp,
        ginamitNaSangkap
    } = useContext(SearchModeContext)
    const [ ulam, setUlam ] = useState< UlamTypes[]>(mgaUlam.data)
    const [ isDefaultUlams, setIsDefaultUlams ] = useState<boolean>(true)

    const hanldeResetUlams = () => {
        setIsDefaultUlams(true)
        setSearch("")
        setMgaSangkapNaMeronKa([])
        setUlam(mgaUlam.data)
    }

    useEffect(() => {
        if(resetUlam){
            setIsDefaultUlams(true)
            setUlam(mgaUlam.data)
            return
        }

        if(mayHinahanapNaUlam){
            setIsDefaultUlams(false)
            setUlam(angNaHanapNaUlam)
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
                        onClick={() => hanldeResetUlams()}
                   >
                        <X
                            size={16}
                            color="black"
                        />
                   </button>
                </div>
            )}
            
            {(angNaHanapNaUlam.length === 0 && mayHinahanapNaUlam)
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
                            />
                        ))}
                    </div>
                )
            }
        </section>
    )
}

export default MgaUlam