import { Request, Response } from 'express';
import _ from 'lodash';
import Account, { IAccount } from '@/models/Account';
import logging from '@/config/logging';

class AccountController {
  public async createAccount(req: Request, res: Response): Promise<void> {
    try {
      const account: IAccount = new Account({
        name: req.body.name,
        'available-value': req.body['available-value'],
        document: req.body.document,
      });

      if (
        !account.name ||
        !account.document ||
        !_.isFinite(account['available-value']) ||
        account['available-value'] <= 0
      ) {
        res.status(400).json({ message: 'Dados inválidos' });
        return;
      }

      await account.save();

      logging.info('AccountController', `Conta criada com sucesso`, account);

      res.json({ ...account.toObject() });
    } catch (error) {
      logging.error('AccountController', error.message);

      if (error.code) {
        res.status(400).json({ message: 'Conta já iniciada' });
      } else {
        res.status(500).json({ message: 'Erro Interno' });
      }
    }
  }

  public async accountExists(document: string): Promise<boolean> {
    const account = await Account.findOne({ document }).lean();
    return !!account;
  }

  public async transferBetweenAccounts(
    senderDocument: string,
    receiverDocument: string,
    value: number,
  ): Promise<number | null> {
    let senderNewAvailableValue: number | null = null;
    const session = await Account.startSession();
    session.startTransaction();

    try {
      const senderAccount = await Account.findOneAndUpdate(
        { document: senderDocument, 'available-value': { $gte: value } },
        { $inc: { 'available-value': -1 * value } },
        { new: true, session },
      );

      if (!senderAccount) {
        await session.abortTransaction();
        await session.endSession();
        return null;
      }

      await Account.updateOne({ document: receiverDocument }, { $inc: { 'available-value': value } }, { session });
      await session.commitTransaction();
      await session.endSession();
      senderNewAvailableValue = senderAccount['available-value'];
    } catch (error) {
      logging.error('AccountController.transferBetweenAccounts', error.message);
      await session.abortTransaction();
      await session.endSession();

      throw error;
    }

    return senderNewAvailableValue;
  }

  public async getAccountById(accountId: string): Promise<IAccount | null> {
    return Account.findById(accountId).lean();
  }
}

export default new AccountController();
