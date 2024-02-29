
import mongoose from "mongoose";;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    email_verified_at: {
        type: Date,
        default: null,
    },
    address: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    dob: {
        type: String, // Consider using Date type if storing date of birth
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
