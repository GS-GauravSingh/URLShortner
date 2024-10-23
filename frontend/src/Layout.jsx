import Header from "./components/Header"
import { Outlet } from "react-router-dom"
import UserAuthContextProvider from "./context/userAuthContext.jsx"
import UrlContextProvider from "./context/urlContext.jsx"
import Footer from "./components/footer.jsx"

function Layout() {
    return (
        <UrlContextProvider>
            <UserAuthContextProvider>
                <div style={{display:"flex", flexDirection:"column", justifyContent:"space-between", minHeight: "100vh"}}>
                    <div>
                        <Header />
                        <Outlet />
                    </div>
                    <div>
                        <Footer />
                    </div>

                </div>
            </UserAuthContextProvider>
        </UrlContextProvider>
    )
}

export default Layout