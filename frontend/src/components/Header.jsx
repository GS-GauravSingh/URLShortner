import "../css/header.css"
import { useUserAuthContext } from "../context/userAuthContext.jsx"
import { FaUserCircle } from "react-icons/fa"
import "../css/mediaQueries.css"
import axios from "axios"
import { useState } from "react"
import Popup from "./Popup.jsx"
import { useNavigate } from "react-router-dom"

function Header() {

    const { user, setUser } = useUserAuthContext();
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const navigate = useNavigate();

    console.log(user);
    

    async function handleSignout() {

        try {
            const result = await axios.get("http://127.0.0.1:8000/signout", { withCredentials: true });
            if (result.data.status === "success") {
                setIsPopupVisible(true);
                setPopupMessage("Signing you out...");

                setTimeout(() => {
                    setIsPopupVisible(false);
                    setUser({
                        authStatus: false,
                    });
                    navigate("/signin");
                }, 4000);
            }

        } catch (error) {
            console.log("Error while signing user out: ", error);
        }
    };

    async function handleDeleteAccount() {

        try {
            const result = await axios.get("http://127.0.0.1:8000/delete", { withCredentials: true });
            if (result.data.status === "success") {
                setIsPopupVisible(true);
                setPopupMessage("Account Successfully Deleted");

                setTimeout(() => {
                    setIsPopupVisible(false);
                    setUser({
                        authStatus: false,
                    });
                    navigate("/signin");
                }, 4000);
            }
            

        } catch (error) {
            console.log("Error while deleting user account: ", error);
        }
    };

    return (
        <header>
            <div className="header-container">
                <div className="user-container">
                    <FaUserCircle className="user-icon" />
                </div>

                <div className="header-text-content-container">
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

                    <div>
                        <button className="btn" onClick={handleSignout} disabled={!user.authStatus}>Sign Out</button>

                        <button style={{color: "red"}} className="btn" disabled={!user.authStatus} onClick={handleDeleteAccount}>Delete Account</button>
                    </div>
                </div>
            </div>

            {/* Popup */}
            {
                isPopupVisible && <Popup msg={popupMessage} />
            }
        </header>
    )
}

export default Header