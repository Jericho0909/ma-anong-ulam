import { createContext, useState, useEffect } from "react";
import useAxiosFetch from "../hooks/useFetchDatabase";
import type { UlamTypes, Props, DataList } from "../types/model";

interface FetchDatabaseTypes<T> {
    mgaUlamData: T[];
    fetchError: Error | null;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    mgaUlam: DataList<T>;
}

const defaultValue: FetchDatabaseTypes<any> = {
    mgaUlamData: [],
    fetchError: null,
    isLoading: false,
    setIsLoading: () => {},
    mgaUlam: { data: [] }
}

const FetchDataContext = createContext<FetchDatabaseTypes<any>>(defaultValue)

export const FetchDataProvider = ({ children }: Props) => {
    const { data: mgaUlamData, fetchError, isLoading, setIsLoading } = useAxiosFetch<any>("http://localhost:3500/mgaUlam")
    const [ mgaUlam, setMgaUlam ] = useState<DataList<UlamTypes>>({
        data: []
    })

    useEffect(() => {
        setMgaUlam({
            data: mgaUlamData
        })
    }, [mgaUlamData])

    return(
        <FetchDataContext.Provider
            value={{
                mgaUlamData,
                fetchError,
                isLoading,
                setIsLoading,
                mgaUlam
            }}
        >
            {children}
        </FetchDataContext.Provider>
    )
}

export default FetchDataContext