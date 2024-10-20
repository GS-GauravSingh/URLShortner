import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useUserAuthContext } from "../../context/userAuthContext.jsx"
import axios from "axios"
import "../css/homePage.css"
import "../css/mediaQueries.css"
import Popup from './Popup.jsx'

function HomePage() {

    const navigate = useNavigate();
    const { user, setUser } = useUserAuthContext(null);
    const { url, setUrl } = useUserAuthContext(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");

    useEffect(() => {

        // Function to check whether user is authenticated or not.
        axios.get("http://127.0.0.1:8000/isuserauthenticated", { withCredentials: true })
            .then((res) => {
                
                // User is Authenticated
                if (res.data.authenticated === true) {
                    setUser({
                        authenticated: true,
                        ...res.data.user
                    });

                    setIsPopupVisible(true);
                    setPopupMessage(`Welcome, ${res.data.user.firstname} ${res.data.user.lastname}`)

                    setTimeout(() => {
                        setIsPopupVisible(false);
                    }, 4000);
                }
                else {
                    // User Not Authenticated.
                    setUser({
                        authenticated: false
                    });

                    setIsPopupVisible(true);
                    setPopupMessage("User not authenticated, Please signin to continue")

                    setTimeout(() => {
                        setIsPopupVisible(false);
                        navigate("/signin");
                    }, 4000);
                }
            })
            .catch((error) => {
                console.error("Error checking authentication status:", error);
            });
    }, []);

    return (
        <>
            <main>

                {/* URL Container */}
                <div className="url-container">
                    <div>
                        <h3 className="sub-heading"><span>From long to short -</span> <span>in just one click.</span></h3>
                        <form action="">
                            <input type="url" name="url" id="inputURL" placeholder="Enter the link here" aria-label="Enter the link here" onChange={(event) => { setUrl(event.target.value) }} disabled={!user.authenticated} />
                            <button type="submit" disabled={!user.authenticated}>Shorten URL</button>
                        </form>

                        <p>Turn long web addresses into short, easy-to-share links. Keep track of how many times your links are clicked to see what&apos;s popular!</p>
                    </div>
                </div>

                {/* Table for displaying short links */}
                <div className="table-container-wrapper">
                    <div className="table-container">
                        <table>

                            {/* Table Header */}
                            <thead>
                                <th>S. No.</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>URL</th>
                                <th>Shorten URL</th>
                                <th>Clicks</th>
                            </thead>

                            {/* Table Body */}
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>John Doe</td>
                                    <td>johndoe@gmail.com</td>
                                    <td>https://example.com/12323423524534534652222222222222222222222222222222222222222222222222222222222267547</td>
                                    <td>http://localhost:8000/asdsedas</td>
                                    <td>0</td>
                                </tr>

                            </tbody>

                            {/* Table Footer */}
                            <tfoot>
                                <tr>
                                    <td colSpan={5}>Total Links Shorten</td>
                                    <td>0</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                {/* Popup */}
                {
                    isPopupVisible && <Popup msg={popupMessage} />
                }
            </main>
        </>
    )
}

export default HomePage