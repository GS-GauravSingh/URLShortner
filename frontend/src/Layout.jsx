import Header from "./components/Header"
import { Outlet } from "react-router-dom"
import UserAuthContextProvider from "./context/userAuthContext.jsx"
import UrlContextProvider from "./context/urlContext.jsx"

function Layout() {
    return (
        <UrlContextProvider>
            <UserAuthContextProvider>
                <Header />
                <Outlet />
            </UserAuthContextProvider>
        </UrlContextProvider>
    )
}

export default Layout