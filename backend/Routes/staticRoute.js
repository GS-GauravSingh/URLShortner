import { Router } from "express";
import { handleHomeRoute, handleSignUp, handleSignIn, handleIsUserAuthenticated } from "../Controllers/staticController.js"
import isUserAuthenticatedMiddleware from "../Middlewares/isUserAuthenticatedMiddleware.js";

const router = Router();
router.get("/", handleHomeRoute);
router.post("/signup", handleSignUp);
router.post("/signin", handleSignIn);
router.get("/isuserauthenticated", isUserAuthenticatedMiddleware, handleIsUserAuthenticated); // `isUserAuthenticatedMiddleware` acts as an inline middleware that check whether user is authenticated or not. If yes, the program flow will go to `handleIsUserAuthenticated` controller otherwise `isUserAuthenticatedMiddleware` middleware will send the response to the client that user is not authenticated.

export default router;