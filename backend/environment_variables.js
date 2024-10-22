import dotenv from "dotenv"

// Loading Environment Variables (.env)
dotenv.config({ path: "./.env" });

const envVariables = {
    PORT: process.env.PORT || "8000",
    HOSTNAME: process.env.HOSTNAME || "127.0.0.1",
    MONGO_DB_URL: process.env.MONGO_DB_URL,
    MONGO_DB_DATABASE_NAME: process.env.MONGO_DB_DATABASE_NAME,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    SHORT_ID_LENGTH: process.env.SHORT_ID_LENGTH
};

export default envVariables;