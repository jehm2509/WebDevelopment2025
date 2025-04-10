import mongoose, { Schema, Document } from 'mongoose';

type UserType = {
    username: string;
    password: string;
    role: string;
};

interface UserDocument extends UserType, Document { }

const UserSchema = new Schema<UserDocument>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
});

const User = mongoose.model<UserDocument>('User', UserSchema);

export default User;