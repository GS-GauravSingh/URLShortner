// import React from 'react'
import "../css/signUpSignIn.css"

function SignUp() {
    return (
        <div className="account-credentials-form-wrapper">

            {/* Sign-Up Form */}
            <form action="" className="account-credentials-form">

                <div>
                    <label htmlFor="userFirstName">First Name <span>*</span> </label>
                    <input type="text" name="firstname" id="userFirstName" placeholder="Enter your first name" required autoFocus />
                </div>

                <div>
                    <label htmlFor="userLastName">Last Name</label>
                    <input type="text" name="lastname" id="userLastName" placeholder="Enter your last name" />
                </div>

                <div>
                    <label htmlFor="userEmail">Email <span>*</span></label>
                    <input type="email" name="email" id="userEmail" placeholder="Enter your email"  required />
                </div>

                <div>
                    <label htmlFor="userPassword">Create a new password <span>*</span></label>
                    <input type="password" name="password" id="userPassword" placeholder="Create a new password" required />
                </div>


                <button type="submit">
                    <span>Create a new account</span>
                </button>
            </form>
        </div>
    )
}

export default SignUp