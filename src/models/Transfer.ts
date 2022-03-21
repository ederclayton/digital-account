import { model, Schema, Document, ObjectId } from 'mongoose';

export interface ITransfer extends Document {
  _id?: ObjectId;
  'sender-document': string;
  'receiver-document': string;
  value: number;
  datetime?: Date;
}

const TransferSchema: Schema = new Schema(
  {
    'sender-document': { type: String, required: true },
    'receiver-document': { type: String, required: true },
    value: { type: Number, required: true },
    datetime: { type: Date, default: new Date() },
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

export default model<ITransfer>('Transfer', TransferSchema);
