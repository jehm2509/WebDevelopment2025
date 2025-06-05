
import { Schema, SchemaDefinition, SchemaOptions } from 'mongoose';
import { softDeletePlugin } from './SoftDelete';

export function createSchemaWithSoftDelete<T>(
    definition: SchemaDefinition<T>,
    options: SchemaOptions = {}
): Schema {
    const schema = new Schema(definition, {
        ...options,
        timestamps: true //  createdAt y updatedAt
    });

    schema.plugin(softDeletePlugin);

    return schema;
}
