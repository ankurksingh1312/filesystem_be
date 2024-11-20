import mongoose, { Schema, Document } from 'mongoose';

export interface IFolder extends Document {
  name: string;
  order: number;
  isOpen: boolean;
}

const FolderSchema: Schema = new Schema({
  name: { type: String, required: true },
  order: { type: Number, required: true },
  isOpen: { type: Boolean, default: true }
});

export default mongoose.model<IFolder>('Folder', FolderSchema); 