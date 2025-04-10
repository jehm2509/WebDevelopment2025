// plugins/softDelete.ts
import { Schema, Document, Query } from 'mongoose';

// Extensión del documento con el campo deleted_at y métodos
export interface SoftDeleteDocument extends Document {
    deleted_at: Date | null;
    softDelete(): Promise<this>;
    restore(): Promise<this>;
}

// Plugin para añadir soft delete
export function softDeletePlugin<T extends Document>(schema: Schema<any>): void {
    schema.add({
        deleted_at: { type: Date, default: null }
    });

    // Método para hacer soft delete
    schema.methods.softDelete = function (): Promise<T> {
        this.deleted_at = new Date();
        return this.save();
    };

    // Método para restaurar
    schema.methods.restore = function (): Promise<T> {
        this.deleted_at = null;
        return this.save();
    };

    // Middleware para excluir borrados por defecto
    function excludeDeletedMiddleware(this: Query<any, any>, next: () => void) {
        const filter = this.getFilter();
        if (!filter.includeDeleted) {
            this.where({ deleted_at: null });
        } else {
            // Elimina el campo includeDeleted del filtro para no romper la consulta
            const { includeDeleted, ...rest } = filter;
            this.setQuery(rest);
        }
        next();
    }

    schema.pre('find', excludeDeletedMiddleware);
    schema.pre('findOne', excludeDeletedMiddleware);
    schema.pre('findOneAndUpdate', excludeDeletedMiddleware);
    schema.pre('countDocuments', excludeDeletedMiddleware);
}
