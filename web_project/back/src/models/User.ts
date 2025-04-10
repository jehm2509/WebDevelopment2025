import mongoose, { Schema, Document, Model } from 'mongoose';
import { BaseDocument } from '@/models/plugins/BaseModel';
import { createSchemaWithSoftDelete } from './plugins/CreateSchemas';


interface IUserCompany {
    _id: string,
    name: string
}

export interface IUser {
    username: string;
    password: string;
    role: string;
    company: IUserCompany;
    recovery_password: string;
}

type IUserDocument = BaseDocument<IUser>;
type IUserModel = Model<IUserDocument>;


const CompanySchema = new Schema<IUserCompany>({
    _id: { type: String, required: true },
    name: { type: String, required: true }
}, { _id: false });

const UserSchema = createSchemaWithSoftDelete<IUser>({
    username: { type: String, required: true },
    password: { type: String, required: false },
    role: { type: String, required: true },
    company: {type: CompanySchema, required: false},
    recovery_password: {type: String, required: false}
});

const User = mongoose.model<IUserDocument, IUserModel>('User', UserSchema);
export default User;