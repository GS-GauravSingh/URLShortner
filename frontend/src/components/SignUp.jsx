import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "../css/signUpSignIn.css"
import Popup from './Popup'

function SignUp() {

    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isElementDisabled, setIsElementDisabled] = useState(false);

    function handleSubmit(event) {

        // Prevent the default action of form when user click on submit button.
        event.preventDefault();
        setIsElementDisabled(true);

        const userData = {
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: password
        };

        axios.post("http://127.0.0.1:8000/signup", userData)
            .then((res) => {
                // User Successfully Registered. Now, redirect the user to `sign-in` page.
                if (res.status === 200) {
                    
                    setIsPopupVisible(true);

                    // Redirect the user to the sign-in page after a delay
                    setTimeout(() => {
                        setIsPopupVisible(false);
                        navigate("/signin");
                    }, 4000);
                }
            });
        
        setTimeout(() => {
            setIsElementDisabled(false);
        }, 4000);
    }

    return (
        <div className="account-credentials-form-wrapper">

            {/* Sign-Up Form */}
            <form onSubmit={handleSubmit} className="account-credentials-form">

                <div>
                    <label htmlFor="userFirstName">First Name <span>*</span> </label>
                    <input type="text" name="firstname" id="userFirstName" placeholder="Enter your first name" required autoFocus onChange={(event) => { setFirstName(event.target.value) }} disabled={isElementDisabled} />
                </div>

                <div>
                    <label htmlFor="userLastName">Last Name</label>
                    <input type="text" name="lastname" id="userLastName" placeholder="Enter your last name" onChange={(event) => { setLastName(event.target.value) }} disabled={isElementDisabled} />
                </div>

                <div>
                    <label htmlFor="userEmail">Email <span>*</span></label>
                    <input type="email" name="email" id="userEmail" placeholder="Enter your email" required onChange={(event) => { setEmail(event.target.value) }} disabled={isElementDisabled} />
                </div>

                <div>
                    <label htmlFor="userPassword">Create a new password <span>*</span></label>
                    <input type="password" name="password" id="userPassword" placeholder="Create a new password" required onChange={(event) => { setPassword(event.target.value) }} disabled={isElementDisabled} />
                </div>


                <button type="submit" disabled={isElementDisabled}>
                    <span>Create a new account</span>
                </button>
            </form>

            {/* Popup */}
            {
                isPopupVisible && <Popup msg="Account Successfully Created" />
            }
        </div>
    )
}

export default SignUp