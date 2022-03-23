import { Types } from 'mongoose';
import AccountController from '../../controllers/Account';
import Account from '../../models/Account';
import * as UtilsMocks from '../testsUtil';

describe('AccountController.createAccount', () => {
  it('it should return a 400 status and a message when the name is undefined.', async () => {
    const fakeName = undefined;
    const fakeValue = 1000;
    const fakeDocument = 'fake-document';

    const fakeRequest = UtilsMocks.mockRequest({
      body: {
        name: fakeName,
        'available-value': fakeValue,
        document: fakeDocument,
      },
    });
    const fakeResponse = UtilsMocks.mockResponse();

    await AccountController.createAccount(fakeRequest, fakeResponse);

    expect(fakeResponse.status).toHaveBeenCalledWith(400);
    expect(fakeResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Dados inválidos',
      }),
    );
  });

  it('it should return a 400 status and a message when the name is empty.', async () => {
    const fakeName = '';
    const fakeValue = 1000;
    const fakeDocument = 'fake-document';

    const fakeRequest = UtilsMocks.mockRequest({
      body: {
        name: fakeName,
        'available-value': fakeValue,
        document: fakeDocument,
      },
    });
    const fakeResponse = UtilsMocks.mockResponse();

    await AccountController.createAccount(fakeRequest, fakeResponse);

    expect(fakeResponse.status).toHaveBeenCalledWith(400);
    expect(fakeResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Dados inválidos',
      }),
    );
  });

  it('it should return a 400 status and a message when the available value is undefined.', async () => {
    const fakeName = 'fake-name';
    const fakeValue = undefined;
    const fakeDocument = 'fake-document';

    const fakeRequest = UtilsMocks.mockRequest({
      body: {
        name: fakeName,
        'available-value': fakeValue,
        document: fakeDocument,
      },
    });
    const fakeResponse = UtilsMocks.mockResponse();

    await AccountController.createAccount(fakeRequest, fakeResponse);

    expect(fakeResponse.status).toHaveBeenCalledWith(400);
    expect(fakeResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Dados inválidos',
      }),
    );
  });

  it('it should return a 400 status and a message when the available value is negative.', async () => {
    const fakeName = 'fake-name';
    const fakeValue = -1;
    const fakeDocument = 'fake-document';

    const fakeRequest = UtilsMocks.mockRequest({
      body: {
        name: fakeName,
        'available-value': fakeValue,
        document: fakeDocument,
      },
    });
    const fakeResponse = UtilsMocks.mockResponse();

    await AccountController.createAccount(fakeRequest, fakeResponse);

    expect(fakeResponse.status).toHaveBeenCalledWith(400);
    expect(fakeResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Dados inválidos',
      }),
    );
  });

  it('it should return a 400 status and a message when the document value is undefined.', async () => {
    const fakeName = 'fake-name';
    const fakeValue = 1000;
    const fakeDocument = undefined;

    const fakeRequest = UtilsMocks.mockRequest({
      body: {
        name: fakeName,
        'available-value': fakeValue,
        document: fakeDocument,
      },
    });
    const fakeResponse = UtilsMocks.mockResponse();

    await AccountController.createAccount(fakeRequest, fakeResponse);

    expect(fakeResponse.status).toHaveBeenCalledWith(400);
    expect(fakeResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Dados inválidos',
      }),
    );
  });

  it('it should return a 400 status and a message when the document value is empty.', async () => {
    const fakeName = 'fake-name';
    const fakeValue = 1000;
    const fakeDocument = '';

    const fakeRequest = UtilsMocks.mockRequest({
      body: {
        name: fakeName,
        'available-value': fakeValue,
        document: fakeDocument,
      },
    });
    const fakeResponse = UtilsMocks.mockResponse();

    await AccountController.createAccount(fakeRequest, fakeResponse);

    expect(fakeResponse.status).toHaveBeenCalledWith(400);
    expect(fakeResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Dados inválidos',
      }),
    );
  });

  it('it should return a 400 status and a message when mongoose throw duplicate error.', async () => {
    const fakeName = 'fake-name';
    const fakeValue = 1000;
    const fakeDocument = 'fake-document';
    const saveMock = jest.fn().mockRejectedValueOnce({
      code: 11000,
    });

    const fakeRequest = UtilsMocks.mockRequest({
      body: {
        name: fakeName,
        'available-value': fakeValue,
        document: fakeDocument,
      },
    });
    const fakeResponse = UtilsMocks.mockResponse();

    Account.prototype.save = saveMock;

    await AccountController.createAccount(fakeRequest, fakeResponse);

    expect(fakeResponse.status).toHaveBeenCalledWith(400);
    expect(fakeResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Conta já iniciada',
      }),
    );
  });

  it('it should return a 500 status and an internal error message when mongoose throw generics errors.', async () => {
    const fakeName = 'fake-name';
    const fakeValue = 1000;
    const fakeDocument = 'fake-document';
    const saveMock = jest.fn().mockRejectedValueOnce({});

    const fakeRequest = UtilsMocks.mockRequest({
      body: {
        name: fakeName,
        'available-value': fakeValue,
        document: fakeDocument,
      },
    });
    const fakeResponse = UtilsMocks.mockResponse();

    Account.prototype.save = saveMock;

    await AccountController.createAccount(fakeRequest, fakeResponse);

    expect(fakeResponse.status).toHaveBeenCalledWith(500);
    expect(fakeResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Erro Interno',
      }),
    );
  });

  it('it should create a new account', async () => {
    const fakeName = 'fake-name';
    const fakeValue = 1000;
    const fakeDocument = 'fake-document';
    const saveMock = jest.fn().mockImplementation();

    const fakeRequest = UtilsMocks.mockRequest({
      body: {
        name: fakeName,
        'available-value': fakeValue,
        document: fakeDocument,
      },
    });

    const fakeResponse = UtilsMocks.mockResponse();

    Account.prototype.save = saveMock;

    await AccountController.createAccount(fakeRequest, fakeResponse);

    expect(fakeResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        id: expect.any(Types.ObjectId),
        name: fakeName,
        document: fakeDocument,
        'available-value': fakeValue,
      }),
    );
  });
});

describe('AccountController.accountExists', () => {
  test('it should send the input parameter to the database', async () => {
    const mockFindOne = jest.fn().mockReturnValue({
      lean: () => {
        return {};
      },
    });
    const fakeId = 'fake_id';

    Account.findOne = mockFindOne;

    await AccountController.accountExists(fakeId);
    expect(mockFindOne.mock.calls.length).toBe(1);
    expect(mockFindOne.mock.calls[0][0]).toEqual({ document: fakeId });
  });

  test('it should return true, if the database find some data', async () => {
    const fakeData = { fake: 'data' };
    const fakeId = 'fake_id';
    const mockFindOne = jest.fn().mockReturnValue({
      lean: () => {
        return fakeData;
      },
    });

    Account.findOne = mockFindOne;

    const result = await AccountController.accountExists(fakeId);
    expect(mockFindOne.mock.calls.length).toBe(1);
    expect(result).toEqual(true);
  });

  test('it should return false, if the database return null', async () => {
    const fakeId = 'fake_id';
    const mockFindOne = jest.fn().mockReturnValue({
      lean: () => {
        return null;
      },
    });

    Account.findOne = mockFindOne;

    const result = await AccountController.accountExists(fakeId);
    expect(mockFindOne.mock.calls.length).toBe(1);
    expect(result).toEqual(false);
  });
});

describe('AccountController.transferBetweenAccounts', () => {
  test('it should throw an error when the value is negative', async () => {
    const fakeSenderDocument = 'fake-sender-document';
    const fakeReceiverDocument = 'fake-sender-document';
    const fakeValue = -100;

    const fakeSession = UtilsMocks.mockSession();

    Account.startSession = jest.fn().mockResolvedValueOnce(fakeSession);
    Account.findOneAndUpdate = jest.fn().mockImplementation();
    Account.updateOne = jest.fn().mockImplementation();

    expect(Account.findOneAndUpdate).toBeCalledTimes(0);
    expect(Account.updateOne).toBeCalledTimes(0);
    await expect(
      AccountController.transferBetweenAccounts(fakeSenderDocument, fakeReceiverDocument, fakeValue),
    ).rejects.toThrowError('Invalid input value');
  });

  test('it should throw an error and abort the transaction when the sender account update throw an error', async () => {
    const fakeSenderDocument = 'fake-sender-document';
    const fakeReceiverDocument = 'fake-sender-document';
    const fakeValue = 100;
    const fakeError = new Error('Generic Error');

    const fakeSession = UtilsMocks.mockSession();

    Account.startSession = jest.fn().mockResolvedValueOnce(fakeSession);
    Account.findOneAndUpdate = jest.fn().mockRejectedValueOnce(fakeError);
    Account.updateOne = jest.fn().mockImplementation();

    await expect(
      AccountController.transferBetweenAccounts(fakeSenderDocument, fakeReceiverDocument, fakeValue),
    ).rejects.toThrow(fakeError);

    expect(Account.findOneAndUpdate).toBeCalledTimes(1);
    expect(Account.updateOne).toBeCalledTimes(0);
    expect(fakeSession.startTransaction).toBeCalledTimes(1);
    expect(fakeSession.abortTransaction).toBeCalledTimes(1);
    expect(fakeSession.commitTransaction).toBeCalledTimes(0);
    expect(fakeSession.endSession).toBeCalledTimes(1);
  });

  test('it should return null and abort the transaction when the sender account update not return a result', async () => {
    const fakeSenderDocument = 'fake-sender-document';
    const fakeReceiverDocument = 'fake-sender-document';
    const fakeValue = 100;

    const fakeSession = UtilsMocks.mockSession();

    Account.startSession = jest.fn().mockResolvedValueOnce(fakeSession);
    Account.findOneAndUpdate = jest.fn().mockResolvedValueOnce(null);
    Account.updateOne = jest.fn().mockImplementation();

    const result = await AccountController.transferBetweenAccounts(fakeSenderDocument, fakeReceiverDocument, fakeValue);

    expect(result).toBeNull();
    expect(Account.findOneAndUpdate).toBeCalledTimes(1);
    expect(Account.findOneAndUpdate).toHaveBeenCalledWith(
      { document: fakeSenderDocument, 'available-value': { $gte: fakeValue } },
      { $inc: { 'available-value': -1 * fakeValue } },
      { new: true, session: fakeSession },
    );
    expect(Account.updateOne).toBeCalledTimes(0);
    expect(fakeSession.startTransaction).toBeCalledTimes(1);
    expect(fakeSession.abortTransaction).toBeCalledTimes(1);
    expect(fakeSession.commitTransaction).toBeCalledTimes(0);
    expect(fakeSession.endSession).toBeCalledTimes(1);
  });

  test('it should throw an error and abort the transaction when the receiver account update throw an error', async () => {
    const fakeSenderDocument = 'fake-sender-document';
    const fakeReceiverDocument = 'fake-sender-document';
    const fakeValue = 100;
    const fakeError = new Error('Generic Error');

    const fakeSession = UtilsMocks.mockSession();

    Account.startSession = jest.fn().mockResolvedValueOnce(fakeSession);
    Account.findOneAndUpdate = jest.fn().mockResolvedValueOnce(UtilsMocks.fakeAccount);
    Account.updateOne = jest.fn().mockRejectedValueOnce(fakeError);

    await expect(
      AccountController.transferBetweenAccounts(fakeSenderDocument, fakeReceiverDocument, fakeValue),
    ).rejects.toThrow(fakeError);

    expect(Account.findOneAndUpdate).toBeCalledTimes(1);
    expect(Account.updateOne).toBeCalledTimes(1);
    expect(fakeSession.startTransaction).toBeCalledTimes(1);
    expect(fakeSession.abortTransaction).toBeCalledTimes(1);
    expect(fakeSession.commitTransaction).toBeCalledTimes(0);
    expect(fakeSession.endSession).toBeCalledTimes(1);
  });

  test('it should transfer an amount value between two accounts successfully', async () => {
    const fakeSenderDocument = 'fake-sender-document';
    const fakeReceiverDocument = 'fake-sender-document';
    const fakeValue = 123;

    const fakeSession = UtilsMocks.mockSession();

    Account.startSession = jest.fn().mockResolvedValueOnce(fakeSession);
    Account.findOneAndUpdate = jest.fn().mockResolvedValueOnce(UtilsMocks.fakeAccount);
    Account.updateOne = jest.fn().mockImplementation();

    const result = await AccountController.transferBetweenAccounts(fakeSenderDocument, fakeReceiverDocument, fakeValue);

    expect(Account.findOneAndUpdate).toBeCalledTimes(1);
    expect(Account.findOneAndUpdate).toHaveBeenCalledWith(
      { document: fakeSenderDocument, 'available-value': { $gte: fakeValue } },
      { $inc: { 'available-value': -1 * fakeValue } },
      { new: true, session: fakeSession },
    );
    expect(Account.updateOne).toBeCalledTimes(1);
    expect(Account.updateOne).toHaveBeenCalledWith(
      { document: fakeReceiverDocument },
      { $inc: { 'available-value': fakeValue } },
      { session: fakeSession },
    );
    expect(fakeSession.startTransaction).toBeCalledTimes(1);
    expect(fakeSession.commitTransaction).toBeCalledTimes(1);
    expect(fakeSession.endSession).toBeCalledTimes(1);
    expect(result).toBe(UtilsMocks.fakeAccount['available-value']);
  });
});

describe('AccountController.getAccountById', () => {
  test('it should return null if the mongoose not found a account', async () => {
    const fakeId = 'fake-id';

    const mockFindById = jest.fn().mockReturnValue({
      lean: () => {
        return null;
      },
    });

    Account.findById = mockFindById;

    const result = await AccountController.getAccountById(fakeId);

    expect(result).toBeNull();
  });

  test('it should throw an error if the mongoose generate an error', async () => {
    const fakeId = 'fake-id';
    const fakeError = new Error('Generic Error');
    const mockFindById = jest.fn().mockReturnValue({
      lean: jest.fn().mockRejectedValueOnce(fakeError),
    });

    Account.findById = mockFindById;

    await expect(AccountController.getAccountById(fakeId)).rejects.toThrow(fakeError);
  });

  test('it should return a account if the mongoose return successfully', async () => {
    const fakeId = 'fake-id';
    const mockFindById = jest.fn().mockReturnValue({
      lean: () => {
        return UtilsMocks.fakeAccount;
      },
    });

    Account.findById = mockFindById;

    const result = await AccountController.getAccountById(fakeId);

    expect(result).toBe(UtilsMocks.fakeAccount);
  });
});
