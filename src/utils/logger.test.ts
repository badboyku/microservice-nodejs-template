/* eslint-disable no-console, testing-library/no-debugging-utils */
import correlator from 'express-correlation-id';
import config from './config';
import logger from './logger';

jest.mock('utils/config');

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

  beforeEach(() => {
    correlatorGetIdMock.mockReturnValueOnce(correlationId);
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

  describe('calling function debug', () => {
    describe('successfully', () => {
      beforeEach(() => {
        config.app = { ...configAppDefault, logLevel: 'DEBUG' };
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
      it('calls JSON.stringify with spaces', () => {
        config.app = { ...configAppDefault, logLevel: 'DEBUG', logOutputFormat: 'DEV' };

        logger.debug(message, context);

        expect(JSON.stringify).toHaveBeenCalledWith({ correlationId, severity: 'DEBUG', message, context }, null, 4);
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
      it('calls JSON.stringify with spaces', () => {
        config.app = { ...configAppDefault, logLevel: 'INFO', logOutputFormat: 'DEV' };

        logger.info(message, context);

        expect(JSON.stringify).toHaveBeenCalledWith({ correlationId, severity: 'INFO', message, context }, null, 4);
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
      it('calls JSON.stringify with spaces', () => {
        config.app = { ...configAppDefault, logLevel: 'WARN', logOutputFormat: 'DEV' };

        logger.warn(message, context);

        expect(JSON.stringify).toHaveBeenCalledWith({ correlationId, severity: 'WARN', message, context }, null, 4);
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
      it('calls JSON.stringify with spaces', () => {
        config.app = { ...configAppDefault, logLevel: 'ERROR', logOutputFormat: 'DEV' };

        logger.error(message, context);

        expect(JSON.stringify).toHaveBeenCalledWith({ correlationId, severity: 'ERROR', message, context }, null, 4);
      });
    });
  });
});
