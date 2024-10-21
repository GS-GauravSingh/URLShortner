import jwt from "jsonwebtoken"
import envVariables from "../environment_variables.js";

const JWT_SECRET_KEY = envVariables.JWT_SECRET_KEY;

function generateToken(userData) {

    const payload = {
        ...userData
    };

    return jwt.sign(payload, JWT_SECRET_KEY);
}

function verifyToken(token)
{
    if(!token)
    {
        return null;
    }

    return jwt.verify(token, JWT_SECRET_KEY);
}

export { generateToken, verifyToken };