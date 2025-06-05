import mongoose, { Schema, Document, Model } from 'mongoose';
import { BaseDocument } from '@/models/plugins/BaseModel';
import { createSchemaWithSoftDelete } from './plugins/CreateSchemas';

export interface IUser {
    username: string;
    password: string;
}

type IUserDocument = BaseDocument<IUser>;
type IUserModel = Model<IUserDocument>;

const UserSchema = createSchemaWithSoftDelete<IUser>({
    username: { type: String, required: true },
    password: { type: String, required: false },
});

const User = mongoose.model<IUserDocument, IUserModel>('User', UserSchema);
export default User;