import React, { useContext, useState } from "react"

// creating context.
const UserAuthContext = React.createContext();

// Creating Context Provider
function UserAuthContextProvider({children})
{
    const [user, setUser] = useState({});

    return(
        <UserAuthContext.Provider value={{ user, setUser }}>
            { children }
        </UserAuthContext.Provider>
    );
}

// Custom Hook to use this context.
export function useUserAuthContext()
{
    return useContext(UserAuthContext);
}


export default UserAuthContextProvider;
