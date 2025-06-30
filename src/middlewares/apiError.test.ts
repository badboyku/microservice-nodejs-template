import NotFoundError from 'errors/notFoundError';
import UnauthorizedError from 'errors/unauthorizedError';
import ValidationError from 'errors/validationError';
import config from 'utils/config';
import logger from 'utils/logger';
import apiError from './apiError';

jest.mock('utils/config');
jest.mock('utils/logger');

describe('ApiError Middleware', () => {
  const configAppDefault = { logLevel: '', logOutputFormat: '', name: '', nodeEnv: '', port: 0, version: '' };
  const configAppDev = { ...configAppDefault, nodeEnv: 'DEVELOPMENT' };
  const next = jest.fn();

  const loggerWarnMock = jest.mocked(logger.warn);

  describe('calls function handleError', () => {
    // 400s
    const badRequestOpenApiError = { name: 'Bad Request', message: 'No' };
    const validationError = new ValidationError('ValidationError');
    // 401s
    const notFoundOpenApiError = { name: 'Not Found', message: 'not found' };
    const unauthorizedError = new UnauthorizedError('UnauthorizedError');
    const unauthorizedErrorOpenApiError = { name: 'Unauthorized', message: 'No' };
    // 404s
    const notFoundError = new NotFoundError('NotFoundError');
    // 500s
    const fooErr = new Error('Foo');

    const testCases = [
      {
        test: 'Bad Request (OpenApiValidation error)',
        err: badRequestOpenApiError,
        configApp: configAppDefault,
        code: 400,
        error: badRequestOpenApiError.message,
      },
      {
        test: 'ValidationError',
        err: validationError,
        configApp: configAppDefault,
        code: 400,
        error: validationError.message,
      },
      {
        test: 'Not Found (OpenApiValidation error)',
        err: notFoundOpenApiError,
        configApp: configAppDefault,
        code: 401,
        error: 'Unauthorized',
      },
      {
        test: 'Not Found (OpenApiValidation error) and nodeEnv=DEVELOPMENT',
        err: notFoundOpenApiError,
        configApp: configAppDev,
        code: 401,
        error: notFoundOpenApiError.message,
      },
      {
        test: 'Unauthorized (OpenApiValidation error)',
        err: unauthorizedErrorOpenApiError,
        configApp: configAppDefault,
        code: 401,
        error: 'Unauthorized',
      },
      {
        test: 'Unauthorized (OpenApiValidation error) and nodeEnv=DEVELOPMENT',
        err: unauthorizedErrorOpenApiError,
        configApp: configAppDev,
        code: 401,
        error: unauthorizedErrorOpenApiError.message,
      },
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
        configApp: configAppDev,
        code: 401,
        error: unauthorizedError.message,
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

        beforeEach(() => {
          config.app = configApp;
        });

        afterAll(() => {
          jest.restoreAllMocks();
        });

        it('sets status on response', () => {
          apiError.handleError(err, req as never, res as never, next);

          expect(res.status).toHaveBeenCalledWith(code);
        });

        it('sets json on response', () => {
          apiError.handleError(err, req as never, res as never, next);

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

      it('calls logger.warn', () => {
        apiError.logError(err, req as never, res as never, next);

        expect(loggerWarnMock).toHaveBeenCalledWith('Error handling API request', { req, err });
      });

      it('calls next with error', () => {
        apiError.logError(err, req as never, res as never, next);

        expect(next).toHaveBeenCalledWith(err);
      });
    });
  });

  describe('calls function notAuthorized', () => {
    describe('successfully', () => {
      const req = {};
      const res = { status: jest.fn(), json: jest.fn() };

      it('calls next with UnauthorizedError', () => {
        apiError.notAuthorized(req as never, res as never, next);

        expect(next).toHaveBeenCalledWith(new UnauthorizedError('Unauthorized'));
      });
    });
  });
});
