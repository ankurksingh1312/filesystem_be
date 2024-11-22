import mongoose, { Schema, Document } from 'mongoose';

// Interface for the document structure
export interface IFileSystem extends Document {
  type: 'FOLDER' | 'ITEM';
  name: string;
  icon: string;
  children?: IFileSystem[] | null;
}

// Create the schema
const FileSystemSchema = new Schema({
  filesNfolders: [{
    type: {
      type: String,
      enum: ['FOLDER', 'ITEM'],
      required: true
    },
    name: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    isOpen:{
        type:Boolean,
        required:true,
        default:false
    },
    children: {
      type: [{
        type: {
          type: String,
          enum: ['ITEM'],
          required: true
        },
        name: {
          type: String,
          required: true
        },
        icon: {
          type: String,
          required: true
        },
        isOpen:{
            type:Boolean,
            default:false
        },
      }],
      default: null
    }
  }]
}, {
  timestamps: true
});

const FileSystem = mongoose.model<IFileSystem>('FileSystem', FileSystemSchema);

export default FileSystem; 