import { createContext, useState } from "react";
import type { Props } from "../types/model";

interface SearchType {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const defaultValue = {
    search: "",
    setSearch: () => {}
}

const SearchContext = createContext<SearchType>(defaultValue)

export const SearchProvider = (({children}: Props) => {
    const [ search, setSearch ] = useState<string>("")

    return(
        <SearchContext.Provider
            value={{
                search,
                setSearch
            }}
        >
            {children}
        </SearchContext.Provider>
    )
})

export default SearchContext

