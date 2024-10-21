import mongoose from "mongoose";
import UserModel from "../Models/userModel.js";
import { generateToken, verifyToken } from "../services/authService.js"

// Home Route
const handleHomeRoute = (req, res) => {
    return res.send("Hello from server!!");
};

// Function to handle Sign Up - Account Creation.
const handleSignUp = async (req, res) => {

    const body = req.body;
    if (!body.firstname || !body.email || !body.password) {
        return res.status(400).json({
            status: "failed",
            message: "BAD REQUEST: Some required fields are missing or invalid"
        });
    }

    try {

        const user = await UserModel.create({
            firstname: body.firstname,
            lastname: body.lastname || "",
            email: body.email,
            password: body.password
        });

        if (user) {
            console.log("staticController.js: handleSignUp(): User Successfully Registered");
            return res.json({
                status: "success",
                message: "User Successfully Registered"
            });
        }

    } catch (error) {
        console.log("ERROR: staticController.js: handleSignUp()");
        return res.status(500).json({
            errorMsg: "Internal Server Error"
        });
    }
};

// Function to handle Sign In
const handleSignIn = async (req, res) => {

    const body = req.body;
    if (!body.email || !body.password) {
        return res.status(400).json({
            status: "failed",
            message: "BAD REQUEST: Some required fields are missing or invalid"
        });
    }

    try {

        const user = await UserModel.findOne({
            email: body.email,
            password: body.password
        });

        if (!user) {
            return res.status(404).json({
                status: "failed",
                message: "Invalid Credentials: No user found with the provided email and password"
            });
        }

        const token = generateToken({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
        });

        // setting cookie expiry data.
        // 7 days from now: Date.now() + days * hoursPerDay * minutesPerHour * secondsPerMinute * 1000.
        // 7 * 24 * 60 * 60 * 1000: 7 days time in milliseconds.
        const sevenDaysFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        // sending jwt token as a part of response.
        return res.cookie("token", token, {
            httpOnly: true, // Cookie is accessible only by the web server, Prevents client-side JavaScript from accessing the cookie.
            expires: sevenDaysFromNow, // setting cookie expiry data.
            sameSite: "None", // Allows the cookie to be sent in cross-site requests
            secure: true // only allow cookies to be sent over https and localhost (http) for development purpose.
        }).json({
            status: "success",
            message: "User Present"
        });


    } catch (error) {
        console.log("ERROR: staticController.js: handleSignIn()");
        return res.status(500).json({
            errorMsg: "Internal Server Error"
        });
    }
};

const handleIsUserAuthenticated = (req, res) => {
    return res.json({ authenticated: true, user: req.user });
};

export { handleHomeRoute, handleSignUp, handleSignIn, handleIsUserAuthenticated };