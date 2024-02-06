import mongoose from "mongoose";

const URLShortnerSchema = mongoose.Schema({
    actualString: String,
    shortenedString: {
        type: String,
        unique: true,
        index: true
    }
})

export const URLShortnerModel = mongoose.model("URLShortner", URLShortnerSchema);