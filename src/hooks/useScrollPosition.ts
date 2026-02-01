import { useState } from "react"
const useScrollPosition = () => {
    const [ id, setId ] = useState<number>(-1)
    const [ isScrollActive, setIsScrollActive ] = useState<boolean>(false)

    const saveId = (id:number): void => {
        setId(id)
        setIsScrollActive(true)
    }

    const retrieveId = (): number => {
        return id
    }

    return {
        saveId,
        retrieveId,
        id, 
        setId,
        isScrollActive,
        setIsScrollActive
    }
}

export default useScrollPosition