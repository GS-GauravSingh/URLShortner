import Header from "./components/Header"
import { Outlet } from "react-router-dom"
import UserAuthContextProvider from "../context/userAuthContext.jsx"

function Layout() {
    return (
        <>
            <UserAuthContextProvider>
                <Header />
                <Outlet />
            </UserAuthContextProvider>
        </>

    )
}

export default Layout