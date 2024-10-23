import "../css/header.css"
import { useUserAuthContext } from "../context/userAuthContext.jsx"
import { FaUserCircle } from "react-icons/fa"

function Header() {

    const { user } = useUserAuthContext();

    return (
        <header>
            <div>
                <h1 className="heading">URL Shortner</h1>
                <h3 className="tagline">Shorten it, share it, track it.</h3>
            </div>

            <div>
                <FaUserCircle className="user-icon" />
                <p>
                    {
                        user.authStatus ?
                            <span>
                                Hello,&nbsp;
                                <span style={{ fontWeight: "bold", letterSpacing: "1px" }}>{user.firstname} {user.lastname}</span>
                            </span>
                            :
                            <span>Hello</span>
                    }
                </p>
            </div>
        </header>
    )
}

export default Header