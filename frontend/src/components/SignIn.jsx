import "../css/signUpSignIn.css"

function SignIn() {
    return (
        <div className="account-credentials-form-wrapper">

            {/* Sign-In Form */}
            <form action="" className="account-credentials-form">

                <div>
                    <label htmlFor="userEmail">Email <span>*</span></label>
                    <input type="email" name="email" id="userEmail" placeholder="Enter your email" required />
                </div>

                <div>
                    <label htmlFor="userPassword">Password <span>*</span></label>
                    <input type="password" name="password" id="userPassword" placeholder="Enter your password" required />
                </div>


                <button type="submit">
                    <span>Sign In</span>
                </button>
            </form>
        </div>
    )
}

export default SignIn