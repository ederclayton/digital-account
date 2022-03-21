import { model, Schema, Document, ObjectId } from 'mongoose';

export interface IAccount extends Document {
  _id?: ObjectId;
  name: string;
  document: string;
  'available-value': number;
}

const AccountSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    document: { type: String, required: true, unique: true },
    'available-value': { type: Number, required: true },
  },
  {
    toObject: {
      transform(doc, ret) {
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
      },
    },
  },
);

export default model<IAccount>('Account', AccountSchema);
