import { Schema, model } from 'mongoose';

export interface Account {
  name: string;
  document: string;
  availableValue: number;
}

const schema = new Schema<Account>({
  name: { type: String, required: true },
  document: { type: String, required: true },
  availableValue: { type: Number, required: true },
});

export const AccountModel = model<Account>('User', schema);
