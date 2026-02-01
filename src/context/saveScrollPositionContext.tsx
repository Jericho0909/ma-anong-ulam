import { createContext } from "react";
import useScrollPosition from "../hooks/useScrollPosition";
import type { Props } from "../types/model";

interface SaveScrollPositionProps {
    saveId: (id: number) => void;
    retrieveId: () => number;
    id: number;
    setId: React.Dispatch<React.SetStateAction<number>>;
    isScrollActive:  boolean;
    setIsScrollActive: React.Dispatch<React.SetStateAction<boolean>>;

}

const defaultValue = {
    saveId: () => {},
    retrieveId: () => 0,
    id: -1,
    setId: () => {},
    isScrollActive: false,
    setIsScrollActive: () => {}
}

const SaveScrollPositionContext = createContext<SaveScrollPositionProps>(defaultValue)

export const SaveScrollPositionProvider = (({children}: Props) => {
    const { saveId, retrieveId, id, setId, isScrollActive, setIsScrollActive } = useScrollPosition()

    return(
        <SaveScrollPositionContext.Provider
            value={{
                saveId,
                retrieveId,
                id, 
                setId,
                isScrollActive,
                setIsScrollActive
            }}
        >
            {children}
        </SaveScrollPositionContext.Provider>
    )
})

export default SaveScrollPositionContext