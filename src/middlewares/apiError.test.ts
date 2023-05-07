import {UnauthorizedError} from '@errors';
import {apiError} from '@middlewares';
import {config, logger} from '@utils';
import type {Request, Response} from 'express';

jest.mock('@utils/config');
jest.mock('@utils/logger');

describe('utils/middleware apiError', () => {
  const configAppDefault = { logLevel: '', logOutputFormat: '', nodeEnv: '', port: 0 };

  describe('calls function handleError', () => {
    const fooErr = new Error('foo');
    const unauthorizedError = new UnauthorizedError('unauthorized');

    const testCases = [
      {
        test: 'UnauthorizedError',
        err: unauthorizedError,
        configApp: configAppDefault,
        code: 401,
        error: 'unauthorized',
      },
      {
        test: 'Error',
        err: fooErr,
        configApp: configAppDefault,
        code: 500,
        error: 'Could not handle request; error has been logged internally.',
      },
      {
        test: 'Error and nodeEnv=DEVELOPMENT',
        err: fooErr,
        configApp: { ...configAppDefault, nodeEnv: 'DEVELOPMENT' },
        code: 500,
        error: { name: fooErr.name, message: fooErr.message },
      },
    ];
    testCases.forEach(({ test, err, configApp, code, error }) => {
      describe(`successfully with ${test}`, () => {
        const req = {};
        const res = { status: jest.fn(), json: jest.fn() };
        const next = jest.fn();

        beforeEach(() => {
          config.app = configApp;

          apiError.handleError(err, req as Request, res as unknown as Response, next);
        });

        afterEach(() => {
          jest.restoreAllMocks();
        });

        it('sets status on response', () => {
          expect(res.status).toHaveBeenCalledWith(code);
        });

        it('sets json on response', () => {
          expect(res.json).toHaveBeenCalledWith({ error });
        });
      });
    });
  });

  describe('calls function logError', () => {
    describe('successfully', () => {
      const err = { name: 'name', message: 'message', stack: 'stack' };
      const req = { headers: 'headers', method: 'method', url: 'url', params: 'params', query: 'query' };
      const res = {};
      const next = jest.fn();

      beforeEach(() => {
        jest.spyOn(logger, 'warn').mockImplementation(() => {
          /* Do nothing */
        });

        apiError.logError(err, req as unknown as Request, res as Response, next);
      });

      afterEach(() => {
        jest.restoreAllMocks();
      });

      it('calls logger.warn', () => {
        expect(logger.warn).toHaveBeenCalledWith('Error handling API request', { req, err });
      });

      it('calls next with error', () => {
        expect(next).toHaveBeenCalledWith(err);
      });
    });
  });

  describe('calls function notAuthorized', () => {
    describe('successfully', () => {
      const req = {};
      const res = { status: jest.fn(), json: jest.fn() };
      const next = jest.fn();
      const err = new UnauthorizedError('unauthorized');

      beforeEach(() => {
        apiError.notAuthorized(req as Request, res as unknown as Response, next);
      });

      it('calls next with UnauthorizedError', () => {
        expect(next).toHaveBeenCalledWith(err);
      });
    });
  });
});
