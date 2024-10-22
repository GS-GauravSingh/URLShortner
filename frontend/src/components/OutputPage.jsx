// import React from 'react'
import "../css/outputPage.css"
import { Link } from "react-router-dom"
import { useUrlContext } from "../context/urlContext"

function OutputPage() {

    const { urlObj } = useUrlContext();    
    console.log(urlObj);
    

    return (
        <div className="output-container-wrapper">

            <div className="output-container">
                <h3>Your Shortened URL</h3>

                {/* Shortened URL */}
                <p>http://127.0.0.1:8000/{urlObj[urlObj?.length - 1]?.shortID}</p>


                <button>Copy URL</button>
                <Link to="/" className="link">Back to homepage</Link>
            </div>
        </div>
    )
}

export default OutputPage