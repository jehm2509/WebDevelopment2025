// interfaces/BaseModel.ts
import { Document } from 'mongoose';

export interface IBaseTimestamps {
  createdAt: Date;
  updatedAt: Date;
}

export interface ISoftDelete {
  deleted_at: Date | null;
}

export interface BaseDocument<T> extends T, ISoftDelete, IBaseTimestamps, Document {
  softDelete(): Promise<this>;
  restore(): Promise<this>;
}
