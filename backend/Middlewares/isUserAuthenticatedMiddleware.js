import { verifyToken } from "../services/authService.js";

// Middleware to verify jwt token
function isUserAuthenticatedMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ status: false }); // No token, not authenticated
    }

    const user = verifyToken(token);
    if (!user) {
        return res.status(401).json({ status: false }); // Invalid Token, not authenticated
    }

    // Otherwise, User is authenticated.
    req.user = user; // Token valid, attach user data to request so that you can easily access the authenticated user's data in any route that follows the authentication middleware.
    // console.log("hello", req.user);
    next();
}

export default isUserAuthenticatedMiddleware;