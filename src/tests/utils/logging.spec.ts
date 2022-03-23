import logging from '../../utils/logging';

describe('utils/logging', () => {
  test('it should send to console a string when call info', () => {
    console.info = jest.fn().mockImplementation();

    logging.info('NAMESPACE', 'Test Message');

    expect(console.info).toBeCalledTimes(1);
    expect(console.info).toHaveBeenCalledWith(expect.any(String));
  });

  test('it should send to console two strings when call info with a message and an object', () => {
    console.info = jest.fn().mockImplementation();

    logging.info('NAMESPACE', 'Test Message', { a: 1 });

    expect(console.info).toBeCalledTimes(1);
    expect(console.info).toHaveBeenCalledWith(expect.any(String), expect.any(String));
  });

  test('it should send to console a string when call warn', () => {
    console.warn = jest.fn().mockImplementation();

    logging.warn('NAMESPACE', 'Test Message');

    expect(console.warn).toBeCalledTimes(1);
    expect(console.warn).toHaveBeenCalledWith(expect.any(String));
  });

  test('it should send to console two strings when call warn with a message and an object', () => {
    console.warn = jest.fn().mockImplementation();

    logging.warn('NAMESPACE', 'Test Message', { a: 1 });

    expect(console.warn).toBeCalledTimes(1);
    expect(console.warn).toHaveBeenCalledWith(expect.any(String), expect.any(String));
  });

  test('it should send to console a string when call error', () => {
    console.error = jest.fn().mockImplementation();

    logging.error('NAMESPACE', 'Test Message');

    expect(console.error).toBeCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(expect.any(String));
  });

  test('it should send to console two strings when call error with a message and an object', () => {
    console.error = jest.fn().mockImplementation();

    logging.error('NAMESPACE', 'Test Message', { a: 1 });

    expect(console.error).toBeCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(expect.any(String), expect.any(String));
  });

  test('it should send to console a string when call debug', () => {
    console.debug = jest.fn().mockImplementation();

    logging.debug('NAMESPACE', 'Test Message');

    expect(console.debug).toBeCalledTimes(1);
    expect(console.debug).toHaveBeenCalledWith(expect.any(String));
  });

  test('it should send to console two strings when call debug with a message and an object', () => {
    console.debug = jest.fn().mockImplementation();

    logging.debug('NAMESPACE', 'Test Message', { a: 1 });

    expect(console.debug).toBeCalledTimes(1);
    expect(console.debug).toHaveBeenCalledWith(expect.any(String), expect.any(String));
  });
});
