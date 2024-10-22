import React, { useState, useContext, createContext, useEffect } from "react";
import axios from "axios"

// Context
const UrlContext = createContext();

// Context Provider
function UrlContextProvider({ children }) {
    // Initial state of `urlObj` - use an empty array to store URLs.
    const [urlObj, setUrlObj] = useState([]);
    const [loading, setLoading] = useState(true); // To manage loading state
    const [error, setError] = useState(null); // To handle any errors


    // Fetching URL data from backend
    const fetchUrlData = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/analytics", { withCredentials: true });
            setUrlObj(response.data.urls);
            // console.log(response.data.urls);

        } catch (err) {
            console.error("Error fetching URLs:", err);
            setError(err);
        } finally {
            setLoading(false); // Set loading to false once fetching is complete
        }
    };

    useEffect(() => {
        fetchUrlData();
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <UrlContext.Provider value={{ urlObj, loading, error, fetchUrlData }}>
            {children}
        </UrlContext.Provider>
    );
};

export function useUrlContext() {
    return useContext(UrlContext);
}

export default UrlContextProvider;