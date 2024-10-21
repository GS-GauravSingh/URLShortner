import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"
import "../css/signUpSignIn.css"
import Popup from "./Popup"
import { GrHide } from "react-icons/gr";
import { BiShow } from "react-icons/bi";

function SignIn() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);


    function handleSubmit(event) {

        // Prevent the default action of form when user click on submit button.
        event.preventDefault();


        const userData = {
            email: email,
            password: password
        };

        axios.post("http://127.0.0.1:8000/signin", userData, {
            withCredentials: true // This is crucial for sending and receiving cookies
        })
            .then((res) => {
                // User Exists.
                if (res.status === 200) {
                    navigate("/");
                }
            })
            .catch((err) => {

                if (err.status === 404) {
                    setIsPopupVisible(true);

                    setTimeout(() => {
                        setIsPopupVisible(false);
                    }, 4000);
                }
            })
    }

    function toggleIcon(){
        setPasswordVisible((prevVal) => {
            return !prevVal
        });
    }

    return (
        <div className="account-credentials-form-wrapper">

            {/* Sign-In Form */}
            <form onSubmit={handleSubmit} className="account-credentials-form">

                <div>
                    <label htmlFor="userEmail">Email <span>*</span></label>
                    <input type="email" name="email" id="userEmail" placeholder="Enter your email" required autoFocus onChange={(event) => {
                        setEmail(event.target.value)
                    }} />
                </div>

                <div className="password-container">
                    <label htmlFor="userPassword">Password <span>*</span></label>
                    <div>
                        <input type={`${isPasswordVisible ? `text` : `password`}`} name="password" id="userPassword" placeholder="Enter your password" required onChange={(event) => {
                            setPassword(event.target.value);
                        }} />

                        {/* Show/Hide Password Icon */}
                        {
                            isPasswordVisible ? <BiShow className="icon show-icon" onClick={toggleIcon} /> : <GrHide className="icon hide-icon" onClick={toggleIcon} />
                        }
                        
                    </div>
                </div>


                <button type="submit">
                    <span>Sign In</span>
                </button>

                <Link to="/signup" className="link">
                    Create an account
                </Link>
            </form>

            {/* Popup */}
            {
                isPopupVisible && <Popup msg="Invalid Credentials, User not found" />
            }
        </div>
    )
}

export default SignIn