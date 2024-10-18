// import React from 'react'
import "../css/outputPage.css"
import { Link } from "react-router-dom"

function OutputPage() {
    return (
        <div className="output-container-wrapper">

            <div className="output-container">
                <h3>Your Shortened URL</h3>

                {/* Shortened URL */}
                <p>http://localhost:8000/asdfghhj</p>


                <button>Copy URL</button>
                <Link to="/" className="link">Back to homepage</Link>
            </div>
        </div>
    )
}

export default OutputPage