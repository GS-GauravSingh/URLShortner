import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useUserAuthContext } from "../context/userAuthContext.jsx"
import axios from "axios"
import "../css/homePage.css"
import "../css/mediaQueries.css"
import Popup from './Popup.jsx'
import { useUrlContext } from '../context/urlContext.jsx'

function HomePage() {

    const navigate = useNavigate();
    const [url, setUrl] = useState(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");

    const { user, setUser } = useUserAuthContext();
    const { urlObj, loading, error, fetchUrlData } = useUrlContext();
    

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
                    setPopupMessage(`Welcome, ${res.data.user.firstname} ${res.data.user.lastname}`);

                    setTimeout(() => {
                        setIsPopupVisible(false);
                    }, 4000);
                }

            })
            .catch((error) => {
                console.error("Error checking authentication status:", error);
                if (error.status === 401) {
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
            });
    }, []);


    function handleSubmit(event) {

        // Prevent the default action of form when user click on submit button.
        event.preventDefault();

        axios.post("http://127.0.0.1:8000/", { url: url }, { withCredentials: true })
            .then((res) => {
                if (res.status === 200) {
                    setIsPopupVisible(true);
                    setPopupMessage(`URL Shortened Successfully`)
                    fetchUrlData();

                    setTimeout(() => {
                        setIsPopupVisible(false);
                        navigate("/output")
                    }, 4000);

                }
            })
            .catch((err) => {
                console.log("ERROR : Homepage.jsx : handleSubmit() : ", err);
            })
    }
    
    return (
        <>
            <main>

                {/* URL Container */}
                <div className="url-container">
                    <div>
                        <h3 className="sub-heading"><span>From long to short -</span> <span>in just one click.</span></h3>
                        <form onSubmit={handleSubmit}>
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

                                {/* JavaScript */}
                                {
                                    loading ?
                                        (
                                            <tr>
                                                <td colSpan={6} style={{textAlign: "center"}}>No short urls generated</td>
                                            </tr>
                                        )
                                        :
                                        (

                                            urlObj.map((obj, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{user.firstname} {user.lastname}</td>
                                                    <td>{user.email}</td>
                                                    <td>{obj.redirectURL}</td>
                                                    <td>http://127.0.0.1:8000/{obj.shortID}</td>
                                                    <td>{obj.visitHistory.length}</td>
                                                </tr>
                                            ))

                                        )
                                }

                            </tbody>

                            {/* Table Footer */}
                            <tfoot>
                                <tr>
                                    <td colSpan={5}>Total Links Shorten</td>
                                    
                                    {/* JavaScript */}
                                    {
                                        loading ?
                                        (
                                            <td>0</td>
                                        )
                                        :
                                        (
                                            <td>{urlObj.length}</td>
                                        )
                                    }
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