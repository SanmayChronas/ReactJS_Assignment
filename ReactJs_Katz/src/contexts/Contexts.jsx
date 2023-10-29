import { useState } from "react";
import { createContext } from "react";

export const myContext = createContext()

export const MyProvider = ({children})=>{
    const [state, setState] = useState(0);

    return (
        <myContext.Provider value={{state,setState}}>
            {children}
        </myContext.Provider>
    )

}