import { createContext } from "react";
import type { Props } from "../types/model";
import useWindowSizeCheck from "../hooks/useWindowSize";

interface WindowSizeType {
    isMobile: boolean,
}

const defaultValue: WindowSizeType ={
    isMobile: false
}

const WindowSizeContext = createContext<WindowSizeType>(defaultValue)

export const WindowSizeProvider = ({children}: Props) => {
    const { isMobile  } = useWindowSizeCheck()
    return(
        <WindowSizeContext.Provider
            value={{
                isMobile
            }}
        >
            {children}
        </WindowSizeContext.Provider>
    )
}

export default WindowSizeContext