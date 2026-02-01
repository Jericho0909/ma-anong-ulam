import { createContext, useState, useEffect } from "react";
import type { Props, UlamTypes, DataList } from "../types/model";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";

interface FirebaseDatabaseContextType{
    mgaUlam: DataList<UlamTypes>
    fetchError: boolean;

}

const defaultValue = {
    mgaUlam: { data: [] },
    fetchError: false
}

const FirebaseDatabaseContext = createContext<FirebaseDatabaseContextType>(defaultValue)

export const FirebaseDatabaseProvider = (({children}: Props) => {
    const [ mgaUlam, setMgaUlam ] = useState<DataList<UlamTypes>>({
        data: []
    })
    const [ fetchError, setFetchError ] = useState<boolean>(false)

    useEffect(() => {
        const ulamsRef = ref(database, "mgaUlam");
        const unsubscribe = onValue(
            ulamsRef,
            (snapshot) => {
            const data = snapshot.val();
            if(data){
                setMgaUlam({
                    data: Object.values(data)
                })
                setFetchError(false)
            } 
            else{
                setMgaUlam({data: []})
                setFetchError(true)
            }
            },
            (error) => {
                setFetchError(true)
                console.error("Error fetching data:", error)
            }
        )

        return () => unsubscribe()
    }, [])


    return(
        <FirebaseDatabaseContext.Provider
            value={{
                mgaUlam, 
                fetchError
            }}
        >
            {children}
        </FirebaseDatabaseContext.Provider>
    )
})

export default FirebaseDatabaseContext