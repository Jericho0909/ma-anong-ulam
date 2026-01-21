import { createContext, useState } from "react";
import type { Props } from "../types/model";

interface MgaSangkapNaMeronKaType {
    mgaSangkapNaMeronKa: string[];
    setMgaSangkapNaMeronKa: React.Dispatch<React.SetStateAction<string[]>>
}

const defaultValue = {
    mgaSangkapNaMeronKa: [],
    setMgaSangkapNaMeronKa: () => {}
}

const MgaSangkapNaMeronKaContext = createContext<MgaSangkapNaMeronKaType>(defaultValue)

export const MgaSangkapNaMeronKaProvider = (({children}: Props) => {
    const [ mgaSangkapNaMeronKa, setMgaSangkapNaMeronKa ] = useState<string[]>([])

    return(
        <MgaSangkapNaMeronKaContext.Provider
            value={{
                mgaSangkapNaMeronKa,
                setMgaSangkapNaMeronKa
            }}
        >
            {children}
        </MgaSangkapNaMeronKaContext.Provider>
    )

})

export default MgaSangkapNaMeronKaContext
