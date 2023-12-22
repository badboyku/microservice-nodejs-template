/* eslint-disable no-console, testing-library/no-debugging-utils */
import correlator from 'express-correlation-id';
import { config, logger } from '@utils';

jest.mock('@utils/config');

describe('Logger Util', () => {
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
  const correlatorGetIdMock = jest.mocked(correlator.getId);

  describe('calling function debug', () => {
    describe('successfully', () => {
      beforeEach(() => {
        config.app = { ...configAppDefault, logLevel: 'DEBUG' };
        correlatorGetIdMock.mockReturnValueOnce(correlationId);
        jest.spyOn(JSON, 'stringify').mockReturnValueOnce(logMessage);
        jest.spyOn(console, 'debug').mockImplementationOnce(() => {
          // Do nothing.
        });
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('calls correlator.getId', () => {
        logger.debug(message, context);

        expect(correlatorGetIdMock).toHaveBeenCalled();
      });

      it('calls JSON.stringify', () => {
        logger.debug(message, context);

        expect(JSON.stringify).toHaveBeenCalledWith({ correlationId, severity: 'DEBUG', message, context });
      });

      it('calls console.debug', () => {
        logger.debug(message, context);

        expect(console.debug).toHaveBeenCalledWith(logMessage);
      });
    });

    describe('with logOutputFormat=DEV', () => {
      beforeEach(() => {
        config.app = { ...configAppDefault, logLevel: 'DEBUG', logOutputFormat: 'DEV' };
        correlatorGetIdMock.mockReturnValueOnce(correlationId);
        jest.spyOn(JSON, 'stringify').mockReturnValueOnce(logMessage);
        jest.spyOn(console, 'debug').mockImplementationOnce(() => {
          // Do nothing.
        });
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('calls JSON.stringify with spaces', () => {
        logger.debug(message, context);

        expect(JSON.stringify).toHaveBeenCalledWith({ correlationId, severity: 'DEBUG', message, context }, null, 4);
      });
    });

    describe('with app log level higher than DEBUG', () => {
      beforeEach(() => {
        config.app = { ...configAppDefault, logLevel: 'ERROR' };
        correlatorGetIdMock.mockReturnValueOnce(correlationId);
        jest.spyOn(JSON, 'stringify').mockReturnValueOnce(logMessage);
        jest.spyOn(console, 'debug').mockImplementationOnce(() => {
          // Do nothing.
        });
      });

      afterAll(() => {
        jest.restoreAllMocks();
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
        correlatorGetIdMock.mockReturnValueOnce(correlationId);
        jest.spyOn(JSON, 'stringify').mockReturnValueOnce(logMessage);
        jest.spyOn(console, 'info').mockImplementationOnce(() => {
          // Do nothing.
        });
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('calls correlator.getId', () => {
        logger.info(message, context);

        expect(correlatorGetIdMock).toHaveBeenCalled();
      });

      it('calls JSON.stringify', () => {
        logger.info(message, context);

        expect(JSON.stringify).toHaveBeenCalledWith({ correlationId, severity: 'INFO', message, context });
      });

      it('calls console.info', () => {
        logger.info(message, context);

        expect(console.info).toHaveBeenCalledWith(logMessage);
      });
    });

    describe('with logOutputFormat=DEV', () => {
      beforeEach(() => {
        config.app = { ...configAppDefault, logLevel: 'INFO', logOutputFormat: 'DEV' };
        correlatorGetIdMock.mockReturnValueOnce(correlationId);
        jest.spyOn(JSON, 'stringify').mockReturnValueOnce(logMessage);
        jest.spyOn(console, 'info').mockImplementationOnce(() => {
          // Do nothing.
        });
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('calls JSON.stringify with spaces', () => {
        logger.info(message, context);

        expect(JSON.stringify).toHaveBeenCalledWith({ correlationId, severity: 'INFO', message, context }, null, 4);
      });
    });

    describe('with app log level higher than INFO', () => {
      beforeEach(() => {
        config.app = { ...configAppDefault, logLevel: 'ERROR' };
        correlatorGetIdMock.mockReturnValueOnce(correlationId);
        jest.spyOn(JSON, 'stringify').mockReturnValueOnce(logMessage);
        jest.spyOn(console, 'info').mockImplementationOnce(() => {
          // Do nothing.
        });
      });

      afterAll(() => {
        jest.restoreAllMocks();
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
        correlatorGetIdMock.mockReturnValueOnce(correlationId);
        jest.spyOn(JSON, 'stringify').mockReturnValueOnce(logMessage);
        jest.spyOn(console, 'warn').mockImplementationOnce(() => {
          // Do nothing.
        });
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('calls correlator.getId', () => {
        logger.warn(message, context);

        expect(correlatorGetIdMock).toHaveBeenCalled();
      });

      it('calls JSON.stringify', () => {
        logger.warn(message, context);

        expect(JSON.stringify).toHaveBeenCalledWith({ correlationId, severity: 'WARN', message, context });
      });

      it('calls console.warn', () => {
        logger.warn(message, context);

        expect(console.warn).toHaveBeenCalledWith(logMessage);
      });
    });

    describe('with logOutputFormat=DEV', () => {
      beforeEach(() => {
        config.app = { ...configAppDefault, logLevel: 'WARN', logOutputFormat: 'DEV' };
        correlatorGetIdMock.mockReturnValueOnce(correlationId);
        jest.spyOn(JSON, 'stringify').mockReturnValueOnce(logMessage);
        jest.spyOn(console, 'warn').mockImplementationOnce(() => {
          // Do nothing.
        });
      });

      it('calls JSON.stringify with spaces', () => {
        logger.warn(message, context);

        expect(JSON.stringify).toHaveBeenCalledWith({ correlationId, severity: 'WARN', message, context }, null, 4);
      });
    });

    describe('with app log level higher than WARN', () => {
      beforeEach(() => {
        config.app = { ...configAppDefault, logLevel: 'ERROR' };
        correlatorGetIdMock.mockReturnValueOnce(correlationId);
        jest.spyOn(JSON, 'stringify').mockReturnValueOnce(logMessage);
        jest.spyOn(console, 'warn').mockImplementationOnce(() => {
          // Do nothing.
        });
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
        correlatorGetIdMock.mockReturnValueOnce(correlationId);
        jest.spyOn(JSON, 'stringify').mockReturnValueOnce(logMessage);
        jest.spyOn(console, 'error').mockImplementationOnce(() => {
          // Do nothing.
        });
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('calls correlator.getId', () => {
        logger.error(message, context);

        expect(correlatorGetIdMock).toHaveBeenCalled();
      });

      it('calls JSON.stringify', () => {
        logger.error(message, context);

        expect(JSON.stringify).toHaveBeenCalledWith({ correlationId, severity: 'ERROR', message, context });
      });

      it('calls console.error', () => {
        logger.error(message, context);

        expect(console.error).toHaveBeenCalledWith(logMessage);
      });
    });

    describe('with logOutputFormat=DEV', () => {
      beforeEach(() => {
        config.app = { ...configAppDefault, logLevel: 'ERROR', logOutputFormat: 'DEV' };
        correlatorGetIdMock.mockReturnValueOnce(correlationId);
        jest.spyOn(JSON, 'stringify').mockReturnValueOnce(logMessage);
        jest.spyOn(console, 'error').mockImplementationOnce(() => {
          // Do nothing.
        });
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('calls JSON.stringify with spaces', () => {
        logger.error(message, context);

        expect(JSON.stringify).toHaveBeenCalledWith({ correlationId, severity: 'ERROR', message, context }, null, 4);
      });
    });
  });
});
