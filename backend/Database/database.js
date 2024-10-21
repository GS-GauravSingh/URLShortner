import mongoose from "mongoose";

async function connectMongoDB(url, databaseName) {
    
    try {
        const result = await mongoose.connect(`${url}${databaseName}`);
        if(result)
        {
            console.log("MongoDB Connected!!");
        }
    } catch (error) {
        console.log("ERROR: database.js: MongoDB connection Error.");
    }
}

export default connectMongoDB;