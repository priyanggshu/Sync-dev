import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        default: null
    },
    googleDriveAccessToken: String,
    googleDriveAccessToken: String,
});

export default new mongoose.model('User', UserSchema);
