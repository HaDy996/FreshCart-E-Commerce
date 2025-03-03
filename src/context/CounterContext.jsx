import { createContext, useState } from "react";

//! 1- Create the contextname:
export let counterContext = createContext();
//! 2- Create the provider function:
export default function CounterContextProvider(props){

    let [counter,setCounter] = useState(0)

    return <counterContext.Provider value={{counter,setCounter}}>
        {props.children}
    </counterContext.Provider>
}