// import React, { createContext, useEffect, useState } from "react";
// import axios from "axios";
// import { URL } from "../url";
// export const UserContext = createContext({});
// export function UserContextProvider({ children }) {
//     const [user, setUser] = useState(null);
//     useEffect(() => {
//         getUser();
//     }, []);

//     const getUser = async () => {
//         try {
//             const res = await axios.get(URL + "/api/auth/refetch", { withCredentials: true });
//             console.log("Response from getUser:", res.data);
//             setUser(res.data);
//         } catch (err) {
//             console.error("Error in getUser:", err);
//         }
//     };

//     return (
//         <UserContext.Provider value={{ user, setUser }}>
//             {children}
//         </UserContext.Provider>
//     );
// }

import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
export const UserContext = createContext({});
export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        getUser();
    }, []);

    const getUser = async () => {
        try {
            const res = await axios.get("https://blogsphere-o6fp.onrender.com/api/auth/refetch", { withCredentials: true });
            console.log("Response from getUser:", res.data);
            setUser(res.data);
        } catch (err) {
            console.error("Error in getUser:", err);
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

