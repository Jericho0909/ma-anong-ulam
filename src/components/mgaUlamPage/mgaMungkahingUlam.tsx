import type { SetURLSearchParams } from "react-router-dom";
import type { UlamTypes } from "../../types/model"
interface MgaMungkahingUlamProps {
    mgaMinungkahingUlam: UlamTypes[];
    handleHanap: (angHinahanap: string) => void;
    setIpakitaAngMinungkahingUlam: React.Dispatch<React.SetStateAction<boolean>>;
    activeIndex: number;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    debouncedSearchTerm: string;
    setSearchParams: SetURLSearchParams
}

const MgaMungkahingUlam = ({ mgaMinungkahingUlam, handleHanap, setIpakitaAngMinungkahingUlam, activeIndex, setSearch, debouncedSearchTerm, setSearchParams }: MgaMungkahingUlamProps) => {

    return(
        <div 
            className={`p-1 absolute top-full w-[98%] h-[15rem] bg-white
            rounded-xl shadow-lg border border-gray-100 z-10
            overflow-y-auto
                ${mgaMinungkahingUlam.length === 0
                    ? "flex justify-center items-center"
                    : ""
                }
            `}
        >
            {mgaMinungkahingUlam.length === 0
                ? (
                    debouncedSearchTerm === ""
                    ? (
                        <p className="font-quicksand font-medium text-sm">
                            Itype ang name o main sangkap ng ulam
                        </p>
                    )
                    : (
                        <p className="font-quicksand font-medium text-sm">
                            Wala pang ganyang ulam sa ref ko.
                        </p>
                    )
                )
                : (
                    <ul className="w-full h-full">
                        {mgaMinungkahingUlam.map((ulam, index) => (
                            <li
                                key={index}
                                className={`px-4 py-2 text-sm cursor-pointer
                                transition-all duration-15 hoverable:hover:bg-green-100 hoverable:hover:translate-x-1
                                    ${index === activeIndex ? "bg-green-100 translate-x-1" : ""}
                                `}
                                onClick={() => {
                                    handleHanap(ulam.name)
                                    setSearch(ulam.name)
                                    setIpakitaAngMinungkahingUlam(false)
                                    setSearchParams({ search: ulam.name })
                                }}
                            >
                                {ulam.name}
                            </li>
                        ))}
                    </ul>
                )
            }
        </div>
    )
}

export default MgaMungkahingUlam