/* eslint-disable no-console, testing-library/no-debugging-utils */
import correlator from 'express-correlation-id';
import config from 'utils/config';
import logger from './logger';

jest.mock('utils/config');

describe('Logger Util', () => {
  const timestamp = '2023-10-24T12:35:00.000Z';
  const now = new Date(timestamp);
  const message = 'message';
  const context = { foo: 'bar' };
  const correlationId = 'correlationId';
  const logMessage = 'logMessage';
  const configAppDefault = {
    logLevel: 'INFO',
    logOutputFormat: 'ELK',
    name: 'name',
    nodeEnv: 'TEST',
    port: 3000,
    version: 'version',
  };
  const toISOString = jest.fn();
  const correlatorGetIdMock = jest.mocked(correlator.getId);

  beforeEach(() => {
    jest.useFakeTimers({ now });
    correlatorGetIdMock.mockReturnValueOnce(correlationId);
    toISOString.mockReturnValueOnce(timestamp);
    jest.spyOn(global, 'Date').mockImplementation(() => ({ toISOString }) as never);
    jest.spyOn(JSON, 'stringify').mockReturnValueOnce(logMessage);
    jest.spyOn(console, 'debug').mockImplementationOnce(() => {
      // Do nothing.
    });
    jest.spyOn(console, 'info').mockImplementationOnce(() => {
      // Do nothing.
    });
    jest.spyOn(console, 'warn').mockImplementationOnce(() => {
      // Do nothing.
    });
    jest.spyOn(console, 'error').mockImplementationOnce(() => {
      // Do nothing.
    });
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  describe('calling function debug', () => {
    describe('successfully', () => {
      beforeEach(() => {
        config.app = { ...configAppDefault, logLevel: 'DEBUG' };
      });

      it('calls Date toISOString', () => {
        logger.debug(message, context);

        expect(toISOString).toHaveBeenCalled();
      });

      it('calls correlator.getId', () => {
        logger.debug(message, context);

        expect(correlatorGetIdMock).toHaveBeenCalled();
      });

      it('calls JSON.stringify', () => {
        logger.debug(message, context);

        expect(JSON.stringify).toHaveBeenCalledWith({ timestamp, correlationId, severity: 'DEBUG', message, context });
      });

      it('calls console.debug', () => {
        logger.debug(message, context);

        expect(console.debug).toHaveBeenCalledWith(logMessage);
      });
    });

    describe('with logOutputFormat=DEV', () => {
      it('calls JSON.stringify with spaces', () => {
        config.app = { ...configAppDefault, logLevel: 'DEBUG', logOutputFormat: 'DEV' };

        logger.debug(message, context);

        expect(JSON.stringify).toHaveBeenCalledWith(
          { timestamp, correlationId, severity: 'DEBUG', message, context },
          null,
          4,
        );
      });
    });

    describe('with app log level higher than DEBUG', () => {
      beforeEach(() => {
        config.app = { ...configAppDefault, logLevel: 'ERROR' };
      });

      it('does not call JSON.stringify', () => {
        logger.debug(message, context);

        expect(JSON.stringify).not.toHaveBeenCalled();
      });

      it('does not call console.debug', () => {
        logger.debug(message, context);

        expect(console.debug).not.toHaveBeenCalled();
      });
    });
  });

  describe('calling function info', () => {
    describe('successfully', () => {
      beforeEach(() => {
        config.app = { ...configAppDefault, logLevel: 'INFO' };
      });

      it('calls Date toISOString', () => {
        logger.info(message, context);

        expect(toISOString).toHaveBeenCalled();
      });

      it('calls correlator.getId', () => {
        logger.info(message, context);

        expect(correlatorGetIdMock).toHaveBeenCalled();
      });

      it('calls JSON.stringify', () => {
        logger.info(message, context);

        expect(JSON.stringify).toHaveBeenCalledWith({ timestamp, correlationId, severity: 'INFO', message, context });
      });

      it('calls console.info', () => {
        logger.info(message, context);

        expect(console.info).toHaveBeenCalledWith(logMessage);
      });
    });

    describe('with logOutputFormat=DEV', () => {
      it('calls JSON.stringify with spaces', () => {
        config.app = { ...configAppDefault, logLevel: 'INFO', logOutputFormat: 'DEV' };

        logger.info(message, context);

        expect(JSON.stringify).toHaveBeenCalledWith(
          { timestamp, correlationId, severity: 'INFO', message, context },
          null,
          4,
        );
      });
    });

    describe('with app log level higher than INFO', () => {
      beforeEach(() => {
        config.app = { ...configAppDefault, logLevel: 'ERROR' };
      });

      it('does not call JSON.stringify', () => {
        logger.info(message, context);

        expect(JSON.stringify).not.toHaveBeenCalled();
      });

      it('does not call console.info', () => {
        logger.info(message, context);

        expect(console.info).not.toHaveBeenCalled();
      });
    });
  });

  describe('calling function warn', () => {
    describe('successfully', () => {
      beforeEach(() => {
        config.app = { ...configAppDefault, logLevel: 'WARN' };
      });

      it('calls Date toISOString', () => {
        logger.warn(message, context);

        expect(toISOString).toHaveBeenCalled();
      });

      it('calls correlator.getId', () => {
        logger.warn(message, context);

        expect(correlatorGetIdMock).toHaveBeenCalled();
      });

      it('calls JSON.stringify', () => {
        logger.warn(message, context);

        expect(JSON.stringify).toHaveBeenCalledWith({ timestamp, correlationId, severity: 'WARN', message, context });
      });

      it('calls console.warn', () => {
        logger.warn(message, context);

        expect(console.warn).toHaveBeenCalledWith(logMessage);
      });
    });

    describe('with logOutputFormat=DEV', () => {
      it('calls JSON.stringify with spaces', () => {
        config.app = { ...configAppDefault, logLevel: 'WARN', logOutputFormat: 'DEV' };

        logger.warn(message, context);

        expect(JSON.stringify).toHaveBeenCalledWith(
          { correlationId, timestamp, severity: 'WARN', message, context },
          null,
          4,
        );
      });
    });

    describe('with app log level higher than WARN', () => {
      beforeEach(() => {
        config.app = { ...configAppDefault, logLevel: 'ERROR' };
      });

      it('does not call JSON.stringify', () => {
        logger.warn(message, context);

        expect(JSON.stringify).not.toHaveBeenCalled();
      });

      it('does not call console.warn', () => {
        logger.warn(message, context);

        expect(console.warn).not.toHaveBeenCalled();
      });
    });
  });

  describe('calling function error', () => {
    describe('successfully', () => {
      beforeEach(() => {
        config.app = { ...configAppDefault, logLevel: 'ERROR' };
      });

      it('calls Date toISOString', () => {
        logger.error(message, context);

        expect(toISOString).toHaveBeenCalled();
      });

      it('calls correlator.getId', () => {
        logger.error(message, context);

        expect(correlatorGetIdMock).toHaveBeenCalled();
      });

      it('calls JSON.stringify', () => {
        logger.error(message, context);

        expect(JSON.stringify).toHaveBeenCalledWith({ timestamp, correlationId, severity: 'ERROR', message, context });
      });

      it('calls console.error', () => {
        logger.error(message, context);

        expect(console.error).toHaveBeenCalledWith(logMessage);
      });
    });

    describe('with logOutputFormat=DEV', () => {
      it('calls JSON.stringify with spaces', () => {
        config.app = { ...configAppDefault, logLevel: 'ERROR', logOutputFormat: 'DEV' };

        logger.error(message, context);

        expect(JSON.stringify).toHaveBeenCalledWith(
          { timestamp, correlationId, severity: 'ERROR', message, context },
          null,
          4,
        );
      });
    });
  });
});
