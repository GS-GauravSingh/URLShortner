import axios from "axios";
import React, { useContext, useEffect, useState } from "react"

// creating context.
const UserAuthContext = React.createContext();

// Creating Context Provider
function UserAuthContextProvider({ children }) {
    const [user, setUser] = useState({
        status: false,
    });
    const [loadingUserAuthStatus, setLoadingUserAuthStatus] = useState(true);

    // Fetching user authentication status from backend.
    const isUserAuthenticated = async () => {

        try {
            const result = await axios.get("http://127.0.0.1:8000/isuserauthenticated", { withCredentials: true });
            if (result.status === 200 && result.data.status === true) {
                setUser({
                    authStatus: true,
                    ...result.data.user

                });
            }

        } catch (error) {
            console.log("Error fetching user authentication status", error);
            if (error.status === 401) {
                // unauthenticated user
                setUser({
                    authStatus: false,
                });
            }
        }
        finally {
            setLoadingUserAuthStatus(false);
        }
    };

    useEffect(() => {
        isUserAuthenticated();
    }, []); // Empty dependency array means this useEffect() hook runs once on mount

    return (
        <UserAuthContext.Provider value={{ user, setUser, loadingUserAuthStatus, isUserAuthenticated }}>
            {children}
        </UserAuthContext.Provider>
    );
}

// Custom Hook to use this context.
export function useUserAuthContext() {
    return useContext(UserAuthContext);
}


export default UserAuthContextProvider;
