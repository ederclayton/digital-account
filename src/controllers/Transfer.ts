import { Request, Response } from 'express';
import Transfer, { ITransfer } from '../models/Transfer';
import logging from '../utils/logging';
import getPaginationData from '../utils/getPaginationData';
import AccountController from './Account';

const TWO_MINUTES_IN_MILLISEC = 2 * 60 * 1000;

class TransferController {
  private lastTransfers: Map<string, NodeJS.Timeout>;

  constructor() {
    this.lastTransfers = new Map<string, NodeJS.Timeout>();
  }

  private isDuplicateTransfers(senderDocument: string, receiverDocument: string, value: number): boolean {
    const customId = `${senderDocument}-${receiverDocument}-${value}`;
    if (!this.lastTransfers.has(customId)) {
      this.lastTransfers.set(
        customId,
        setTimeout(() => {
          this.lastTransfers.delete(customId);
        }, TWO_MINUTES_IN_MILLISEC),
      );
      return false;
    }

    return true;
  }

  public async executeTransfer(req: Request, res: Response): Promise<void> {
    try {
      const transfer: ITransfer = new Transfer({
        'sender-document': req.body['sender-document'],
        'receiver-document': req.body['receiver-document'],
        value: req.body.value,
      });

      if (
        !transfer['sender-document'] ||
        !transfer['receiver-document'] ||
        !transfer.value ||
        transfer.value <= 0 ||
        transfer['sender-document'] === transfer['receiver-document']
      ) {
        res.status(400).json({ message: 'Dados inválidos' });
        return;
      }

      const receiverAccountExists = await AccountController.accountExists(transfer['receiver-document']);
      if (!receiverAccountExists) {
        res.status(400).json({ message: 'Conta do recebedor não inicializada' });
        return;
      }

      const senderAccountExists = await AccountController.accountExists(transfer['sender-document']);
      if (!senderAccountExists) {
        res.status(400).json({ message: 'Conta do remetente não inicializada' });
        return;
      }

      if (this.isDuplicateTransfers(transfer['sender-document'], transfer['receiver-document'], transfer.value)) {
        res.status(400).json({ message: 'Transação duplicada' });
        return;
      }

      const newSenderAvailableValue = await AccountController.transferBetweenAccounts(
        transfer['sender-document'],
        transfer['receiver-document'],
        transfer.value,
      );
      if (!newSenderAvailableValue) {
        logging.warn('TransferController', `Valor da transferência insuficiente`);
        res.status(400).json({ message: 'Valor da transferência insuficiente' });
        return;
      }

      await transfer.save();

      const returnData = {
        ...transfer.toObject(),
        value: undefined,
        'available-value': newSenderAvailableValue,
      };

      logging.info('TransferController', 'Transferência efetuada com sucesso', returnData);

      res.json(returnData);
    } catch (error) {
      logging.error('TransferController', error.message);
      res.status(500).json({ message: 'Erro Interno' });
    }
  }

  public async getTransfers(req: Request, res: Response): Promise<void> {
    const { accountId } = req.params;
    const { limit, page } = getPaginationData(String(req.query.limit), String(req.query.page));

    try {
      const account = await AccountController.getAccountById(accountId);
      if (!account) {
        res.status(404).json({ message: 'Usuário não encontrado' });
        return;
      }

      const totalDocs = await Transfer.find({
        $or: [{ 'receiver-document': account.document }, { 'sender-document': account.document }],
      }).count();

      const transfers = await Transfer.find({
        $or: [{ 'receiver-document': account.document }, { 'sender-document': account.document }],
      })
        .sort({ _id: -1 })
        .skip(limit * (page - 1))
        .limit(limit)
        .lean();

      const totalPages = Math.floor(totalDocs / limit) + 1;
      const docs = transfers.map(transfer => {
        return { id: transfer._id, ...transfer, __v: undefined, _id: undefined };
      });

      const result = {
        page,
        limit,
        totalDocs,
        totalPages,
        docs,
      };

      res.json(result);
    } catch (error) {
      logging.error('TransferController', error.message);
      res.status(500).json({ message: 'Erro Interno' });
    }
  }
}

export default new TransferController();
