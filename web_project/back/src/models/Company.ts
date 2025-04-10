import mongoose, { Schema, Document, Model } from 'mongoose';
import { BaseDocument } from '@/models/plugins/BaseModel';
import { createSchemaWithSoftDelete } from './plugins/CreateSchemas';


interface ICompany {
    name: string;
    email: string;
}

type ICompanyDocument = BaseDocument<ICompany>;
type ICompanyModel = Model<ICompanyDocument>;

const CompanySchema = createSchemaWithSoftDelete<ICompany>({
    name: { type: String, required: true }
});

const User = mongoose.model<ICompanyDocument, ICompanyModel>('Company', CompanySchema);
export default User;