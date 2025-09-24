import { createContext, useEffect, useState } from "react";

export const tokenContext = createContext();

export const TokenContextProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        if (localStorage.getItem('Token')) {
            setToken(localStorage.getItem('Token'));
        }
    }, []);

    return <tokenContext.Provider value={{ token, setToken }}>
        {children}
    </tokenContext.Provider>
}