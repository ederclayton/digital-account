import { Request, Response } from 'express';
import { ClientSession } from 'mongoose';
import logging from '../utils/logging';

export const mockResponse = () => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

export const mockRequest = (fakeData: any) => {
  return fakeData as Request;
};

export const mockSession = () => {
  const session = {} as ClientSession;

  session.startTransaction = jest.fn().mockImplementation();
  session.abortTransaction = jest.fn().mockImplementation();
  session.commitTransaction = jest.fn().mockImplementation();
  session.endSession = jest.fn().mockImplementation();

  return session;
};

export const fakeAccount = {
  document: 'fake-document',
  'available-value': 789,
  name: 'fake-name',
  id: 'fake-id',
};

logging.info = jest.fn().mockImplementation();
logging.debug = jest.fn().mockImplementation();
logging.warn = jest.fn().mockImplementation();
logging.error = jest.fn().mockImplementation();
