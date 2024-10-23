import UserModel from "../Models/userModel.js";
import UrlModel from "../Models/urlModel.js";
import { generateToken } from "../services/authService.js"
import { nanoid } from "nanoid";
import envVariables from "../environment_variables.js";

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

        // // If authentication is successful, store user data in `req` object
        // req.user = {
        //     _id: user._id,
        //     firstname: user.firstname,
        //     lastname: user.lastname,
        //     email: user.email
        // };


        const token = generateToken(user);

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
            message: "User Present",
            user: {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
            }
        });


    } catch (error) {
        console.log("ERROR: staticController.js: handleSignIn()");
        return res.status(500).json({
            errorMsg: "Internal Server Error"
        });
    }
};

const handleIsUserAuthenticated = (req, res) => {
    return res.json(
        {
            status: true,
            user:
            {
                firstname: req.user.firstname,
                lastname: req.user.lastname,
                email: req.user.email
            }
        }
    );
};


// Function to generate short URL
const handleShortenUrl = async (req, res) => {

    const shortIDLength = envVariables.SHORT_ID_LENGTH;
    const shortID = nanoid(shortIDLength);

    const body = req.body;
    if (!body.url) {
        return res.status(400).json({
            status: "failed",
            message: "BAD REQUEST: URL is missing"
        });
    }

    try {
        
        const results = await UrlModel.create({
            shortID: shortID,
            redirectURL: body.url,
            generatedBy: req.user._id,
            visitHistory: []
        });

        if (results) {
            console.log("staticController.js: handleShortenUrl(): Short URL Generated Successfully");

            return res.json({
                status: "success",
                message: "URL successfully shortened",
                shortenUrl: `http://127.0.0.1:8000/${shortID}`,
                originalUrl: body.url
            });
        }

    } catch (error) {
        console.log("ERROR: staticController.js: handleShortenUrl()");
        return res.status(500).json({
            errorMsg: "Internal Server Error"
        });
    }
};

// Function to redirect user.
const handleRedirectUrl = async (req, res) => {
    const id = req.params.id;
    const date = new Date().toLocaleDateString("en-IN");

    try {

        const results = await UrlModel.findOneAndUpdate(
            {
                shortID: id
            },
            {
                // The $push operator is used in MongoDB to add an element to an array field in a document. If the array does not exist, $push will create it.
                $push: {
                    visitHistory: {
                        timestamp: date
                    }
                },
            },
            {
                new: true // This option returns the modified document
            }
        );

        
        if(results)
        {
            return res.redirect(results.redirectURL);
        }

    } catch (error) {
        console.log("ERROR: staticController.js: handleRedirectUrl()");
        return res.status(500).json({
            errorMsg: "Internal Server Error"
        });
    }
};

// Function to return all the url's generate by any particular user.
const handleUrlAnalytics = async (req, res) => {


    if (!req.user) {
        // User is not authenticated that's whu `user` details is not present in the `req` object.
        return res.status(401).json({
            status: "failed",
            message: "Unauthorized access. Please sign in to continue."
        });
    }
    
    try {

        const results = await UrlModel.find({
            generatedBy: req.user._id
        }).select("-generatedBy -_id"); // Exclude the generatedBy field which contains the ID of the user.
                

        return res.json({
            status: "success",
            message: "URLs fetched successfully",
            urls: results
        });

    } catch (error) {
        console.log("ERROR: staticController.js: handleUrlAnalytics()");
        return res.status(500).json({
            errorMsg: "Internal Server Error"
        });
    }
};

export { handleHomeRoute, handleSignUp, handleSignIn, handleIsUserAuthenticated, handleShortenUrl, handleRedirectUrl, handleUrlAnalytics };