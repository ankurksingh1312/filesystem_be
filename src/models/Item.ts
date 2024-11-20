import mongoose, { Schema, Document } from 'mongoose';

export interface IItem extends Document {
  title: string;
  icon: string;
  order: number;
  folderId?: string | null;
}

const ItemSchema: Schema = new Schema({
  title: { type: String, required: true },
  icon: { type: String, required: true },
  order: { type: Number, required: true },
  folderId: { type: Schema.Types.ObjectId, ref: 'Folder', default: null }
});

export default mongoose.model<IItem>('Item', ItemSchema); 