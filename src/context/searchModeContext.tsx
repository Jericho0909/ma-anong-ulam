import { createContext, useState } from "react";
import type { Props } from "../types/model";

interface SearchModeTypes {
    searchMode: string;
    setSearchMode: React.Dispatch<React.SetStateAction<string>>;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    suggestionSearch: string;
    setSuggestionSearch: React.Dispatch<React.SetStateAction<string>>;
    mgaSangkapNaMeronKa: string[];
    setMgaSangkapNaMeronKa: React.Dispatch<React.SetStateAction<string[]>>;
    ginamitNaSangkap: string[];
    setGinamitNaSangkap: React.Dispatch<React.SetStateAction<string[]>>;
    angUlamNaHinahanp: string;
    setAngUlamNaHinahanap: React.Dispatch<React.SetStateAction<string>>;


}

const defaultValue = {
    searchMode: "",
    setSearchMode: () => {},
    search: "",
    setSearch: () => {},
    suggestionSearch: "",
    setSuggestionSearch: () => {},
    mgaSangkapNaMeronKa: [],
    setMgaSangkapNaMeronKa: () => {},
    ginamitNaSangkap: [],
    setGinamitNaSangkap: () => {},
    angUlamNaHinahanp: "",
    setAngUlamNaHinahanap: () => {}
}

const SearchModeContext = createContext<SearchModeTypes>(defaultValue)

export const SearchModeProvider = (({children}: Props) => {
    const [ searchMode, setSearchMode ] = useState<string>("")
    const [ search, setSearch ] = useState<string>("")
    const [ suggestionSearch, setSuggestionSearch ] = useState<string>("")
    const [ mgaSangkapNaMeronKa, setMgaSangkapNaMeronKa ] = useState<string[]>([])
    const [ angUlamNaHinahanp, setAngUlamNaHinahanap ] = useState<string>("")
    const [ ginamitNaSangkap, setGinamitNaSangkap ] = useState<string[]>([])

    return(
        <SearchModeContext.Provider
            value={{
                searchMode,
                setSearchMode,
                search,
                setSearch,
                suggestionSearch,
                setSuggestionSearch,
                mgaSangkapNaMeronKa,
                setMgaSangkapNaMeronKa,
                ginamitNaSangkap,
                setGinamitNaSangkap,
                angUlamNaHinahanp,
                setAngUlamNaHinahanap
            }}
        >
            {children}
        </SearchModeContext.Provider>
    )
})

export default SearchModeContext

