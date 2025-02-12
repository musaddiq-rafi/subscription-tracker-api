import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User name is required"],
        trim: true,
        minLength:2,
        maxLength: 50,
    },
    email: {
        type: String,
        required: [true, "User email is required"],
        unique: true,
        trim: true,
        minLength: 5,
        maxLength: 50,
        lowercase: true,
        match:[/\S+@\S+\.\S+/, "Please provide a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 6
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;
