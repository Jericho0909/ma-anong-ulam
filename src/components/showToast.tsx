import { useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import SearchModeContext from "../context/searchModeContext";
import UlamResultContext from "../context/ulamResultContext";
import toast from "react-hot-toast";
import { X } from 'lucide-react';

const ShowToast: React.FC = () => {
    const lastSearch = sessionStorage.getItem("lastSearch")
    const [, setSearchParams] = useSearchParams()
    const { setSearch, setSuggestionSearch } = useContext(SearchModeContext)
    const { setMayHinahanapUlam } = useContext(UlamResultContext)

    const handleIbalik = (): void => {
        if(!lastSearch) return
        const safeSearch: string = lastSearch.trim().toLowerCase()
        setSearchParams({ search: safeSearch })
        setSearch(safeSearch)
        setSuggestionSearch(safeSearch)
        setMayHinahanapUlam(true)
    }

    const hanldeWagNaHanapin = (): void => {
        setSearchParams({ search: "" })
        setSearch("")
        setSuggestionSearch("")
        setMayHinahanapUlam(false)
        sessionStorage.setItem("nagHanap", JSON.stringify(false))
    }

    useEffect(() => {
        if (!lastSearch) return

        const toastId = toast(
        (t) => (
            <>
                <div className="relative flex items-center justify-center flex-col p-1">
                    <p className="font-quicksand font-semibold mb-3">
                        May huling sinearch ka: 
                            <span className="text-FGulay font-figtree font-semibold italic">
                                {lastSearch}
                            </span>
                    </p>
                    <div className="font-cabin font-bold rounded-lg bg-green-600 px-6 py-2.5 text-white shadow-sm transition duration-200 hover:bg-green-700 hoverable:hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-green-300">
                        <button
                            onClick={() => {
                                handleIbalik()
                                toast.dismiss(t.id)
                            }}
                        >
                            Ibalik
                        </button>
                    </div>
                </div>
                <button 
                    onClick={() => {
                        toast.dismiss(t.id)
                        hanldeWagNaHanapin()
                    }}
                    className="absolute top-0 right-2"
                >
                    <X size={18} color="black" />
                </button>
            </>
        ),
        {
            duration: Infinity,
        }
        )

        return () => toast.dismiss(toastId)
    }, [lastSearch, setSearchParams])

  return null
};

export default ShowToast;
