import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema({

    firstname: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
    },

    email: {
        type: String,
        required: true,
        unique: true
    }, 

    password: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

// Model
const UserModel = mongoose.model("User", userSchema);
export default UserModel;