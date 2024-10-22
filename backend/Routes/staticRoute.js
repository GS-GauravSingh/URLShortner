import { Router } from "express";
import { handleHomeRoute, handleSignUp, handleSignIn, handleIsUserAuthenticated, handleShortenUrl, handleRedirectUrl, handleUrlAnalytics } from "../Controllers/staticController.js"
import isUserAuthenticatedMiddleware from "../Middlewares/isUserAuthenticatedMiddleware.js";

const router = Router();

// Home Route
router.get("/", handleHomeRoute);

// User Authentication Route
router.post("/signup", handleSignUp);
router.post("/signin", handleSignIn);

// User Authentication Status Check
router.get("/isuserauthenticated", isUserAuthenticatedMiddleware, handleIsUserAuthenticated); // `isUserAuthenticatedMiddleware` acts as an inline middleware that check whether user is authenticated or not. If yes, the program flow will go to `handleIsUserAuthenticated` controller otherwise `isUserAuthenticatedMiddleware` middleware will send the response to the client that user is not authenticated.

// Analytics Endpoint (might need to change this based on your functionality)
router.get("/analytics", isUserAuthenticatedMiddleware, handleUrlAnalytics);


// URL Shortening Route
router.post("/", isUserAuthenticatedMiddleware, handleShortenUrl);

// Redirecting Short URLs
router.get("/:id", handleRedirectUrl);


export default router;