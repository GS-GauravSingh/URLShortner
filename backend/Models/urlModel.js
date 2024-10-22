import mongoose from "mongoose"

// URL Schema
const urlSchema = new mongoose.Schema({

    shortID: {
        type: String,
        required: true,
        unique: true
    },

    redirectURL: {
        type: String,
        required: true
    },

    generatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },


    visitHistory: [

        {
            timestamp: String
        }

    ]

}, {
    timestamps: true
});

// URL Model
const UrlModel = mongoose.model("Url", urlSchema);
export default UrlModel;