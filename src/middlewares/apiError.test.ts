import { NotFoundError, UnauthorizedError, ValidationError } from '@errors';
import { apiError } from '@middlewares';
import { config, logger } from '@utils';

jest.mock('@utils/config');
jest.mock('@utils/logger');

describe('ApiError Middleware', () => {
  const configAppDefault = { logLevel: '', logOutputFormat: '', name: '', nodeEnv: '', port: 0, version: '' };
  const configAppDev = { ...configAppDefault, nodeEnv: 'DEVELOPMENT' };

  describe('calls function handleError', () => {
    const badRequestError = { name: 'Bad Request', message: 'Bad Request error' };
    const fooErr = new Error('Foo');
    const notFoundError = new NotFoundError('NotFound error');
    const unauthorizedError1 = { name: 'Unauthorized', message: 'Unauthorized error' };
    const unauthorizedError2 = new UnauthorizedError('Unauthorized error');
    const validationError = new ValidationError('Validation error');

    const testCases = [
      {
        test: 'Bad Request',
        err: badRequestError,
        configApp: configAppDefault,
        code: 400,
        error: badRequestError.message,
      },
      {
        test: 'ValidationError',
        err: validationError,
        configApp: configAppDefault,
        code: 400,
        error: validationError.message,
      },
      {
        test: 'Unauthorized',
        err: unauthorizedError1,
        configApp: configAppDefault,
        code: 401,
        error: 'Unauthorized',
      },
      {
        test: 'Unauthorized and nodeEnv=DEVELOPMENT',
        err: unauthorizedError1,
        configApp: configAppDev,
        code: 401,
        error: unauthorizedError1.message,
      },
      {
        test: 'UnauthorizedError',
        err: unauthorizedError2,
        configApp: configAppDefault,
        code: 401,
        error: 'Unauthorized',
      },
      {
        test: 'UnauthorizedError and nodeEnv=DEVELOPMENT',
        err: unauthorizedError2,
        configApp: configAppDev,
        code: 401,
        error: unauthorizedError2.message,
      },
      {
        test: 'NotFoundError',
        err: notFoundError,
        configApp: configAppDefault,
        code: 404,
        error: notFoundError.message,
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
        configApp: configAppDev,
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
