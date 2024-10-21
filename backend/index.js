// Import Statements
import express from "express"
import cors from "cors"
import envVariables from "./environment_variables.js";
import staticRoute from "./Routes/staticRoute.js"
import connectMongoDB from "./Database/database.js";
import cookieParser from "cookie-parser";



// Initializing `app`.
const app = express();

// Environment Variables
const PORT = envVariables.PORT; // PORT number where the server will run.
const HOSTNAME = envVariables.HOSTNAME; // localhost address
const MONGO_DB_URL = envVariables.MONGO_DB_URL;
const MONGO_DB_DATABASE_NAME = envVariables.MONGO_DB_DATABASE_NAME;

// Database Connections
connectMongoDB(MONGO_DB_URL, MONGO_DB_DATABASE_NAME);

// Middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true, // Allow cookies to be sent
}));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/", staticRoute);

// Start the server and Listen for incomming http requests.
app.listen(PORT, HOSTNAME, ()=>{
    console.log(`Server is running at http://${HOSTNAME}:${PORT}`);
});