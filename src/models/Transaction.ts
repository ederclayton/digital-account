import { Schema, model } from 'mongoose';

export interface Transaction {
  senderDocument: string;
  receiverDocument: string;
  value: number;
}

const schema = new Schema<Transaction>({
  senderDocument: { type: String, required: true },
  receiverDocument: { type: String, required: true },
  value: { type: Number, required: true },
});

export const TransactionModel = model<Transaction>('User', schema);
