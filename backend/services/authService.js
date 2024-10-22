import jwt from "jsonwebtoken"
import envVariables from "../environment_variables.js";

const JWT_SECRET_KEY = envVariables.JWT_SECRET_KEY;

function generateToken(user) {

    const payload = {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email
    };

    return jwt.sign(payload, JWT_SECRET_KEY);
}

function verifyToken(token) {
    if (!token) {
        return null;
    }

    try {
        return jwt.verify(token, JWT_SECRET_KEY);
    } catch (error) {
        return null;
    }
}

export { generateToken, verifyToken };