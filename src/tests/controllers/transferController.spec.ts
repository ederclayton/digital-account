import { Types } from 'mongoose';
import TransferController from '../../controllers/Transfer';
import AccountController from '../../controllers/Account';
import Transfer from '../../models/Transfer';

import * as UtilsMocks from '../testsUtil';

describe('TransferController.createTransfer', () => {
  test('it should return a 400 status and a message when the sender-document is undefined.', async () => {
    const fakeSenderDocument = undefined;
    const fakeReceiverDocument = 'fake-receiver-document';
    const fakeValue = 1000;
    const fakeRequest = UtilsMocks.mockRequest({
      body: {
        'sender-document': fakeSenderDocument,
        'receiver-document': fakeReceiverDocument,
        value: fakeValue,
      },
    });
    const fakeResponse = UtilsMocks.mockResponse();

    await TransferController.executeTransfer(fakeRequest, fakeResponse);

    expect(fakeResponse.status).toHaveBeenCalledWith(400);
    expect(fakeResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Dados inválidos',
      }),
    );
  });

  test('it should return a 400 status and a message when the sender-document is empty.', async () => {
    const fakeSenderDocument = '';
    const fakeReceiverDocument = 'fake-receiver-document';
    const fakeValue = 1000;
    const fakeRequest = UtilsMocks.mockRequest({
      body: {
        'sender-document': fakeSenderDocument,
        'receiver-document': fakeReceiverDocument,
        value: fakeValue,
      },
    });
    const fakeResponse = UtilsMocks.mockResponse();

    await TransferController.executeTransfer(fakeRequest, fakeResponse);

    expect(fakeResponse.status).toHaveBeenCalledWith(400);
    expect(fakeResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Dados inválidos',
      }),
    );
  });

  test('it should return a 400 status and a message when the receiver-document is undefined.', async () => {
    const fakeSenderDocument = 'fake-sender-document';
    const fakeReceiverDocument = undefined;
    const fakeValue = 1000;
    const fakeRequest = UtilsMocks.mockRequest({
      body: {
        'sender-document': fakeSenderDocument,
        'receiver-document': fakeReceiverDocument,
        value: fakeValue,
      },
    });
    const fakeResponse = UtilsMocks.mockResponse();

    await TransferController.executeTransfer(fakeRequest, fakeResponse);

    expect(fakeResponse.status).toHaveBeenCalledWith(400);
    expect(fakeResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Dados inválidos',
      }),
    );
  });

  test('it should return a 400 status and a message when the receiver-document is empty.', async () => {
    const fakeSenderDocument = 'fake-sender-document';
    const fakeReceiverDocument = '';
    const fakeValue = 1000;
    const fakeRequest = UtilsMocks.mockRequest({
      body: {
        'sender-document': fakeSenderDocument,
        'receiver-document': fakeReceiverDocument,
        value: fakeValue,
      },
    });
    const fakeResponse = UtilsMocks.mockResponse();

    await TransferController.executeTransfer(fakeRequest, fakeResponse);

    expect(fakeResponse.status).toHaveBeenCalledWith(400);
    expect(fakeResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Dados inválidos',
      }),
    );
  });

  test('it should return a 400 status and a message when the value is undefined.', async () => {
    const fakeSenderDocument = 'fake-sender-document';
    const fakeReceiverDocument = 'fake-receiver-document';
    const fakeValue = undefined;
    const fakeRequest = UtilsMocks.mockRequest({
      body: {
        'sender-document': fakeSenderDocument,
        'receiver-document': fakeReceiverDocument,
        value: fakeValue,
      },
    });
    const fakeResponse = UtilsMocks.mockResponse();

    await TransferController.executeTransfer(fakeRequest, fakeResponse);

    expect(fakeResponse.status).toHaveBeenCalledWith(400);
    expect(fakeResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Dados inválidos',
      }),
    );
  });

  test('it should return a 400 status and a message when the value is less then zero.', async () => {
    const fakeSenderDocument = 'fake-sender-document';
    const fakeReceiverDocument = 'fake-receiver-document';
    const fakeValue = -1;
    const fakeRequest = UtilsMocks.mockRequest({
      body: {
        'sender-document': fakeSenderDocument,
        'receiver-document': fakeReceiverDocument,
        value: fakeValue,
      },
    });
    const fakeResponse = UtilsMocks.mockResponse();

    await TransferController.executeTransfer(fakeRequest, fakeResponse);

    expect(fakeResponse.status).toHaveBeenCalledWith(400);
    expect(fakeResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Dados inválidos',
      }),
    );
  });

  test('it should return a 400 status and a message when the sender-document and the receiver-document are the same.', async () => {
    const fakeSenderDocument = 'fake-document';
    const fakeReceiverDocument = 'fake-document';
    const fakeValue = 1000;
    const fakeRequest = UtilsMocks.mockRequest({
      body: {
        'sender-document': fakeSenderDocument,
        'receiver-document': fakeReceiverDocument,
        value: fakeValue,
      },
    });
    const fakeResponse = UtilsMocks.mockResponse();

    await TransferController.executeTransfer(fakeRequest, fakeResponse);

    expect(fakeResponse.status).toHaveBeenCalledWith(400);
    expect(fakeResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Dados inválidos',
      }),
    );
  });

  test('it should return a 400 status and a message when not found the sender-document account in database.', async () => {
    const fakeSenderDocument = 'fake-sender-document';
    const fakeReceiverDocument = 'fake-receiver-document';
    const fakeValue = 1000;
    const fakeRequest = UtilsMocks.mockRequest({
      body: {
        'sender-document': fakeSenderDocument,
        'receiver-document': fakeReceiverDocument,
        value: fakeValue,
      },
    });
    const fakeResponse = UtilsMocks.mockResponse();
    AccountController.accountExists = jest.fn().mockResolvedValue(false);

    await TransferController.executeTransfer(fakeRequest, fakeResponse);

    expect(AccountController.accountExists).toBeCalledTimes(1);
    expect(fakeResponse.status).toHaveBeenCalledWith(400);
    expect(fakeResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Conta do recebedor não inicializada',
      }),
    );
  });

  test('it should return a 400 status and a message when not found the receiver-document account in database.', async () => {
    const fakeSenderDocument = 'fake-sender-document';
    const fakeReceiverDocument = 'fake-receiver-document';
    const fakeValue = 1000;
    const fakeRequest = UtilsMocks.mockRequest({
      body: {
        'sender-document': fakeSenderDocument,
        'receiver-document': fakeReceiverDocument,
        value: fakeValue,
      },
    });
    const fakeResponse = UtilsMocks.mockResponse();
    AccountController.accountExists = jest.fn().mockResolvedValueOnce(true).mockResolvedValueOnce(false);

    await TransferController.executeTransfer(fakeRequest, fakeResponse);

    expect(AccountController.accountExists).toBeCalledTimes(2);
    expect(fakeResponse.status).toHaveBeenCalledWith(400);
    expect(fakeResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Conta do remetente não inicializada',
      }),
    );
  });

  test('it should return a 400 status and a message when the operation is duplicate', async () => {
    const fakeSenderDocument = 'fake-sender-document-duplicate';
    const fakeReceiverDocument = 'fake-receiver-document-duplicate';
    const fakeValue = 1000;
    const fakeRequest = UtilsMocks.mockRequest({
      body: {
        'sender-document': fakeSenderDocument,
        'receiver-document': fakeReceiverDocument,
        value: fakeValue,
      },
    });
    const fakeResponse = UtilsMocks.mockResponse();
    const newValueSender = 500;
    const saveMock = jest.fn().mockImplementation();

    AccountController.accountExists = jest.fn().mockResolvedValue(true);
    AccountController.transferBetweenAccounts = jest.fn().mockResolvedValue(newValueSender);
    Transfer.prototype.save = saveMock;

    /* First Transfer */
    await TransferController.executeTransfer(fakeRequest, fakeResponse);
    expect(fakeResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        id: expect.any(Types.ObjectId),
        'sender-document': fakeSenderDocument,
        'receiver-document': fakeReceiverDocument,
        'available-value': newValueSender,
        datetime: expect.any(Date),
      }),
    );

    /* Second Transfer with the same data */
    await TransferController.executeTransfer(fakeRequest, fakeResponse);

    expect(fakeResponse.status).toHaveBeenCalledWith(400);
    expect(fakeResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Transação duplicada',
      }),
    );
  });

  test('it should return a 500 status and a message when the function transferBetweenAccounts throw an error', async () => {
    const fakeSenderDocument = 'fake-sender-document-1';
    const fakeReceiverDocument = 'fake-receiver-document-1';
    const fakeValue = 1000;
    const fakeRequest = UtilsMocks.mockRequest({
      body: {
        'sender-document': fakeSenderDocument,
        'receiver-document': fakeReceiverDocument,
        value: fakeValue,
      },
    });
    const fakeResponse = UtilsMocks.mockResponse();
    const genericError = new Error('Generic Error');

    AccountController.accountExists = jest.fn().mockResolvedValue(true);
    AccountController.transferBetweenAccounts = jest.fn().mockRejectedValue(genericError);

    await TransferController.executeTransfer(fakeRequest, fakeResponse);

    expect(AccountController.accountExists).toBeCalledTimes(2);
    expect(fakeResponse.status).toHaveBeenCalledWith(500);
    expect(fakeResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Erro Interno',
      }),
    );
  });

  test('it should return a 400 status and a message when the function transferBetweenAccounts return a null value', async () => {
    const fakeSenderDocument = 'fake-sender-document-2';
    const fakeReceiverDocument = 'fake-receiver-document-2';
    const fakeValue = 1000;
    const fakeRequest = UtilsMocks.mockRequest({
      body: {
        'sender-document': fakeSenderDocument,
        'receiver-document': fakeReceiverDocument,
        value: fakeValue,
      },
    });
    const fakeResponse = UtilsMocks.mockResponse();
    const saveMock = jest.fn().mockImplementation();

    AccountController.accountExists = jest.fn().mockResolvedValue(true);
    AccountController.transferBetweenAccounts = jest.fn().mockResolvedValue(null);
    Transfer.prototype.save = saveMock;

    await TransferController.executeTransfer(fakeRequest, fakeResponse);

    expect(saveMock).toBeCalledTimes(0);
    expect(AccountController.accountExists).toBeCalledTimes(2);
    expect(fakeResponse.status).toHaveBeenCalledWith(400);
    expect(fakeResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Valor da transferência insuficiente',
      }),
    );
  });

  test('it should return a 500 status and a message when the save function throw an error', async () => {
    const fakeSenderDocument = 'fake-sender-document-3';
    const fakeReceiverDocument = 'fake-receiver-document-3';
    const fakeValue = 1000;
    const newValueSender = 500;
    const fakeRequest = UtilsMocks.mockRequest({
      body: {
        'sender-document': fakeSenderDocument,
        'receiver-document': fakeReceiverDocument,
        value: fakeValue,
      },
    });
    const fakeResponse = UtilsMocks.mockResponse();
    const genericError = new Error('Generic Error');
    const saveMock = jest.fn().mockRejectedValue(genericError);

    AccountController.accountExists = jest.fn().mockResolvedValue(true);
    AccountController.transferBetweenAccounts = jest.fn().mockResolvedValue(newValueSender);
    Transfer.prototype.save = saveMock;

    await TransferController.executeTransfer(fakeRequest, fakeResponse);

    expect(saveMock).toBeCalledTimes(1);
    expect(AccountController.accountExists).toBeCalledTimes(2);
    expect(fakeResponse.status).toHaveBeenCalledWith(500);
    expect(fakeResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Erro Interno',
      }),
    );
  });

  test('it should execute a transfer between two accounts successfully', async () => {
    const fakeSenderDocument = 'fake-sender-document';
    const fakeReceiverDocument = 'fake-receiver-document';
    const fakeValue = 1000;
    const fakeRequest = UtilsMocks.mockRequest({
      body: {
        'sender-document': fakeSenderDocument,
        'receiver-document': fakeReceiverDocument,
        value: fakeValue,
      },
    });
    const fakeResponse = UtilsMocks.mockResponse();
    const newValueSender = 500;
    const saveMock = jest.fn().mockImplementation();

    AccountController.accountExists = jest.fn().mockResolvedValue(true);
    AccountController.transferBetweenAccounts = jest.fn().mockResolvedValue(newValueSender);
    Transfer.prototype.save = saveMock;

    await TransferController.executeTransfer(fakeRequest, fakeResponse);

    expect(AccountController.accountExists).toBeCalledTimes(2);
    expect(fakeResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        id: expect.any(Types.ObjectId),
        'sender-document': fakeSenderDocument,
        'receiver-document': fakeReceiverDocument,
        'available-value': newValueSender,
        datetime: expect.any(Date),
      }),
    );
  });
});

describe('TransferController.getTransfers', () => {
  test('it should return a 404 status and a message when the not found account', async () => {
    const fakeAccountId = 'fake-account-id';
    const fakeRequest = UtilsMocks.mockRequest({
      params: {
        accountId: fakeAccountId,
      },
      query: {},
    });
    const fakeResponse = UtilsMocks.mockResponse();

    AccountController.getAccountById = jest.fn().mockResolvedValue(null);

    await TransferController.getTransfers(fakeRequest, fakeResponse);

    expect(fakeResponse.status).toHaveBeenCalledWith(404);
    expect(fakeResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Usuário não encontrado',
      }),
    );
  });

  test('it should return a 500 status and a message when the getAccountById throw an error', async () => {
    const fakeAccountId = 'fake-account-id';
    const fakeRequest = UtilsMocks.mockRequest({
      params: {
        accountId: fakeAccountId,
      },
      query: {},
    });
    const fakeResponse = UtilsMocks.mockResponse();
    const genericError = new Error('Generic Error');

    AccountController.getAccountById = jest.fn().mockRejectedValue(genericError);

    await TransferController.getTransfers(fakeRequest, fakeResponse);

    expect(fakeResponse.status).toHaveBeenCalledWith(500);
    expect(fakeResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Erro Interno',
      }),
    );
  });

  test('it should return a 500 status and a message when count documents throw an error', async () => {
    const fakeAccountId = 'fake-account-id';
    const fakeRequest = UtilsMocks.mockRequest({
      params: {
        accountId: fakeAccountId,
      },
      query: {},
    });
    const fakeResponse = UtilsMocks.mockResponse();
    const fakeAccount = { document: 'fake-document' };
    const genericError = new Error('Generic Error');

    AccountController.getAccountById = jest.fn().mockResolvedValue(fakeAccount);
    Transfer.find = jest.fn().mockReturnValue({
      count: jest.fn().mockRejectedValue(genericError),
    });

    await TransferController.getTransfers(fakeRequest, fakeResponse);

    expect(fakeResponse.status).toHaveBeenCalledWith(500);
    expect(fakeResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Erro Interno',
      }),
    );
  });

  test('it should return a 500 status and a message when get documents from mongoose throw an error', async () => {
    const fakeAccountId = 'fake-account-id';
    const fakeRequest = UtilsMocks.mockRequest({
      params: {
        accountId: fakeAccountId,
      },
      query: {},
    });
    const fakeResponse = UtilsMocks.mockResponse();
    const fakeAccount = { document: 'fake-document' };
    const genericError = new Error('Generic Error');

    AccountController.getAccountById = jest.fn().mockResolvedValueOnce(fakeAccount);
    Transfer.find = jest
      .fn()
      .mockReturnValueOnce({
        count: jest.fn().mockResolvedValue(2),
      })
      .mockReturnValueOnce({
        sort: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            limit: jest.fn().mockReturnValue({
              lean: jest.fn().mockRejectedValue(genericError),
            }),
          }),
        }),
      });

    await TransferController.getTransfers(fakeRequest, fakeResponse);

    expect(fakeResponse.status).toHaveBeenCalledWith(500);
    expect(fakeResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Erro Interno',
      }),
    );
  });

  test('it should response with an empty list if mongoose return an empty list', async () => {
    const fakeAccountId = 'fake-account-id';
    const fakeRequest = UtilsMocks.mockRequest({
      params: {
        accountId: fakeAccountId,
      },
      query: {},
    });
    const fakeResponse = UtilsMocks.mockResponse();
    const fakeAccount = { document: 'fake-document' };

    AccountController.getAccountById = jest.fn().mockResolvedValueOnce(fakeAccount);
    Transfer.find = jest
      .fn()
      .mockReturnValueOnce({
        count: jest.fn().mockResolvedValue(0),
      })
      .mockReturnValueOnce({
        sort: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            limit: jest.fn().mockReturnValue({
              lean: jest.fn().mockResolvedValue([]),
            }),
          }),
        }),
      });

    await TransferController.getTransfers(fakeRequest, fakeResponse);

    expect(fakeResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        page: 1,
        limit: 10,
        totalDocs: 0,
        totalPages: 1,
        docs: [],
      }),
    );
  });

  test('it should response with a list of transfer if mongoose return some list', async () => {
    const fakeAccountId = 'fake-account-id';
    const fakeRequest = UtilsMocks.mockRequest({
      params: {
        accountId: fakeAccountId,
      },
      query: {},
    });
    const fakeResponse = UtilsMocks.mockResponse();
    const fakeAccount = { document: 'fake-document' };
    const fakeTransferList = [
      {
        _id: '1',
        'sender-document': 'fake-sender-document-1',
        'receiver-document': 'fake-receiver-document-1',
        value: 123,
        datetime: new Date(),
      },
      {
        _id: '2',
        'sender-document': 'fake-sender-document-2',
        'receiver-document': 'fake-receiver-document-2',
        value: 213,
        datetime: new Date(),
      },
      {
        _id: '3',
        'sender-document': 'fake-sender-document-3',
        'receiver-document': 'fake-receiver-document-3',
        value: 321,
        datetime: new Date(),
      },
    ];

    AccountController.getAccountById = jest.fn().mockResolvedValueOnce(fakeAccount);
    Transfer.find = jest
      .fn()
      .mockReturnValueOnce({
        count: jest.fn().mockResolvedValue(3),
      })
      .mockReturnValueOnce({
        sort: jest.fn().mockReturnValue({
          skip: jest.fn().mockReturnValue({
            limit: jest.fn().mockReturnValue({
              lean: jest.fn().mockResolvedValue(fakeTransferList),
            }),
          }),
        }),
      });

    await TransferController.getTransfers(fakeRequest, fakeResponse);

    expect(fakeResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        page: 1,
        limit: 10,
        totalDocs: 3,
        totalPages: 1,
      }),
    );
  });
});
