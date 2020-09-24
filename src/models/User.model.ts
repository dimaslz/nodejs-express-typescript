import mongoose from "mongoose";

export type UserDocument = mongoose.Document & {
    username: string;
    email: string;
    password: string;
    delete?: boolean;
};

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, unique: true, required: true },
    delete: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model<UserDocument>("User", userSchema);
