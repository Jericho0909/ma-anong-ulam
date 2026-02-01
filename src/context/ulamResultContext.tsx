import { createContext, useState } from "react";
import type { Props, UlamTypes } from "../types/model";

interface UlamResultType {
    mayHinahanapNaUlam: boolean;
    setMayHinahanapUlam: React.Dispatch<React.SetStateAction<boolean>>;
    resetUlam:boolean;
    setResetUlam: React.Dispatch<React.SetStateAction<boolean>>;
    angNaHanapNaUlam: UlamTypes[];
    setAngNaHanapNaUlam: React.Dispatch<React.SetStateAction<UlamTypes[]>>;
}

const defaultValue = {
    mayHinahanapNaUlam: false,
    setMayHinahanapUlam: () => {},
    resetUlam: false,
    setResetUlam: () => {},
    angNaHanapNaUlam: [],
    setAngNaHanapNaUlam: () => {}
}

const UlamResultContext = createContext<UlamResultType>(defaultValue)

export const UlamResultProvider = ({ children }: Props) => {
    const [ mayHinahanapNaUlam, setMayHinahanapUlam ] = useState(false)
    const [ resetUlam, setResetUlam ] = useState<boolean>(false)
    const [ angNaHanapNaUlam, setAngNaHanapNaUlam ] = useState<UlamTypes[]>([])
    return(
        <UlamResultContext.Provider
            value={{
                mayHinahanapNaUlam,
                setMayHinahanapUlam,
                resetUlam,
                setResetUlam,
                angNaHanapNaUlam,
                setAngNaHanapNaUlam
            }}
        >
            {children}
        </UlamResultContext.Provider>
    )
}

export default UlamResultContext