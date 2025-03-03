import { createContext, useEffect, useState } from "react";

export let tokenContext = createContext();

export default function TokenContextProvider(props) {

    const [token, setToken] = useState(localStorage.getItem("userToken") || null)

    useEffect(() => {
        if (token) {
            localStorage.setItem("userToken", token); //* Save to localStorage when token changes
        }

    }, [token])

    return <tokenContext.Provider value={{ token, setToken }}>
        {props.children}
    </tokenContext.Provider>
}