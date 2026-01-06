import mongoose, { Schema, Document } from 'mongoose';
import { User } from '@repo/domain';
import { uuidv7 } from 'uuidv7';

export interface IUserDocument extends User, Document {
  id: string;
  password: string;
}

const UserSchema = new Schema<IUserDocument>({
  id: { 
    type: String, 
    default: () => uuidv7(), 
    unique: true, 
    required: true,
    index: true 
  },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret: Record<string, any>) => {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

export const UserModel = mongoose.model<IUserDocument>('User', UserSchema);
