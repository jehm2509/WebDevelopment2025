import mongoose, { Schema, Document, Model } from 'mongoose';
import { BaseDocument } from '@/models/plugins/BaseModel';
import { createSchemaWithSoftDelete } from './plugins/CreateSchemas';

export interface IContact {
    _id?: string;
    _user_id: string;
    first_name: string;
    last_name: string;
    phone?: string;
    cellphone?: string;
    email: string;
}

type IContactDocument = BaseDocument<IContact>;
type IContactModel = Model<IContactDocument>;

const ContactSchema = createSchemaWithSoftDelete<IContact>({
    _user_id: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone: { type: String, required: false },
    cellphone: { type: String, required: false },
    email: { type: String, required: true },
});

const Contact = mongoose.model<IContactDocument, IContactModel>('Contact', ContactSchema);
export default Contact;