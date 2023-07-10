import {UnauthorizedError} from '@errors';
import {apiError} from '@middlewares';
import {config, logger} from '@utils';

jest.mock('@utils/config');
jest.mock('@utils/logger');

describe('ApiError Middleware', () => {
  const configAppDefault = { logLevel: '', logOutputFormat: '', name: '', nodeEnv: '', port: 0, version: '' };

  describe('calls function handleError', () => {
    const unauthorizedError = new UnauthorizedError('Unauthorized error');
    const fooErr = new Error('Foo');

    const testCases = [
      {
        test: 'UnauthorizedError',
        err: unauthorizedError,
        configApp: configAppDefault,
        code: 401,
        error: 'Unauthorized',
      },
      {
        test: 'UnauthorizedError and nodeEnv=DEVELOPMENT',
        err: unauthorizedError,
        configApp: { ...configAppDefault, nodeEnv: 'DEVELOPMENT' },
        code: 401,
        error: unauthorizedError.message,
      },
      {
        test: 'Error',
        err: fooErr,
        configApp: configAppDefault,
        code: 500,
        error: 'Could not handle request, error has been logged internally',
      },
      {
        test: 'Error and nodeEnv=DEVELOPMENT',
        err: fooErr,
        configApp: { ...configAppDefault, nodeEnv: 'DEVELOPMENT' },
        code: 500,
        error: `${fooErr.name}: ${fooErr.message}`,
      },
    ];
    testCases.forEach(({ test, err, configApp, code, error }) => {
      describe(`successfully with ${test}`, () => {
        const req = {};
        const res = { status: jest.fn(), json: jest.fn() };
        const next = jest.fn();

        beforeEach(() => {
          config.app = configApp;

          apiError.handleError(err, req as never, res as never, next);
        });

        afterEach(() => {
          jest.restoreAllMocks();
        });

        it('sets status on response', () => {
          expect(res.status).toHaveBeenCalledWith(code);
        });

        it('sets json on response', () => {
          expect(res.json).toHaveBeenCalledWith({ ok: false, error });
        });
      });
    });
  });

  describe('calls function logError', () => {
    describe('successfully', () => {
      const err = { name: 'name', message: 'message', stack: 'stack' };
      const req = {
        headers: 'headers',
        method: 'method',
        url: 'url',
        params: 'params',
        query: 'query',
        body: 'body',
      };
      const res = {};
      const next = jest.fn();

      beforeEach(() => {
        jest.spyOn(logger, 'warn');

        apiError.logError(err, req as never, res as never, next);
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

      beforeEach(() => {
        apiError.notAuthorized(req as never, res as never, next);
      });

      it('calls next with UnauthorizedError', () => {
        expect(next).toHaveBeenCalledWith(new UnauthorizedError('Unauthorized'));
      });
    });
  });
});
