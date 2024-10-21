import React from 'react'
import "../css/Popup.css"

function Popup({ msg }) {
    return (

        <div className="popup">

            <div>
                <h3>Message</h3>
                <p>{msg}</p>
            </div>


            <span></span>
        </div>

    )
}

export default Popup