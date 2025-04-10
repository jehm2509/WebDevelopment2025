import mongoose, { Schema, Document, Model } from 'mongoose';
import { BaseDocument } from '@/models/plugins/BaseModel';
import { createSchemaWithSoftDelete } from './plugins/CreateSchemas';


interface IServiceCompany {
    _id: string,
    name: string
}

interface IServiceUser {
    _id: string,
    name: string
}

interface IService {
    name: string;
    description: string;
    duration: number;
    company: IServiceCompany;
    users: Array<IServiceUser>;
}

type IServiceDocument = BaseDocument<IService>;
type IServiceModel = Model<IServiceDocument>;

const CompanySchema = new Schema<IServiceCompany>({
    _id: { type: String, required: true },
    name: { type: String, required: true }
}, { _id: false });

const ServiceUserSchema = new Schema<IServiceUser>({
    _id: { type: String, required: true },
    name: { type: String, required: true }
}, { _id: false });

const ServiceSchema = createSchemaWithSoftDelete<IService>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    company: {type: CompanySchema, required: true},
    users: { type: [ServiceUserSchema], required: true }
});

const Service = mongoose.model<IServiceDocument, IServiceModel>('Service', ServiceSchema);
export default Service;