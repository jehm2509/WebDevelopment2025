import mongoose, { Schema, Document, Model } from 'mongoose';
import { BaseDocument } from '@/models/plugins/BaseModel';
import { createSchemaWithSoftDelete } from './plugins/CreateSchemas';


interface IServiceRequestService {
    _id: string,
    name: string
}

interface IServiceRequestUser {
    _id: string,
    name: string
}

interface IServiceRequest {
    client_name: string;
    client_email: string;
    client_phone: string;
    date: string;
    service: IServiceRequestService,
    user: IServiceRequestUser,
    status: string
}

const ServiceUserSchema = new Schema<IServiceRequestUser>({
    _id: { type: String, required: true },
    name: { type: String, required: true }
}, { _id: false });

const ServiceSchema = new Schema<IServiceRequestService>({
    _id: { type: String, required: true },
    name: { type: String, required: true }
}, { _id: false });


type IServiceRequestDocument = BaseDocument<IServiceRequest>;
type IServiceRequestModel = Model<IServiceRequestDocument>;
const ServiceRequestSchema = createSchemaWithSoftDelete<IServiceRequest>({
    client_name: { type: String, required: true },
    client_email: { type: String, required: true },
    client_phone: { type: String, required: true },
    date: { type: String, required: true },
    service: { type: ServiceSchema, required: true },
    user: { type: ServiceUserSchema, required: true },
    status: { type: String, required: true }
});

const ServiceRequest = mongoose.model<IServiceRequestDocument, IServiceRequestModel>('ServiceRequest', ServiceRequestSchema);
export default ServiceRequest;