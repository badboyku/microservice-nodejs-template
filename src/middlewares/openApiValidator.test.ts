import logger from 'utils/logger';
import { getOpenApiValidatorOptions } from './openApiValidator';

type OpenApiValidatorOpts = ReturnType<typeof getOpenApiValidatorOptions>;
type ValidateResponseOpts = Exclude<OpenApiValidatorOpts['validateResponses'], boolean | undefined>;

jest.mock('utils/logger');

describe('OpenApiValidator Middleware', () => {
  let options: OpenApiValidatorOpts;

  beforeEach(() => {
    options = getOpenApiValidatorOptions();
  });

  it('returns apiSpec option', () => {
    expect(options.apiSpec).toEqual('./openapi.yml');
  });

  it('returns ignorePaths option', () => {
    expect(options.ignorePaths).toEqual(/api-docs/i);
  });

  it('returns validateRequests.coerceTypes option', () => {
    expect(options.validateRequests).toHaveProperty('coerceTypes', true);
  });

  it('returns validateRequests.removeAdditional option', () => {
    expect(options.validateRequests).toHaveProperty('removeAdditional', 'all');
  });

  it('returns validateRequests.validateResponses option', () => {
    expect(options.validateResponses).toHaveProperty('removeAdditional', 'all');
  });

  it('logs when response validation fails', () => {
    const err = { errors: 'foo' };
    const body = { data: 'hello' };
    const req = { url: '/foo' };

    (options.validateResponses as ValidateResponseOpts)?.onError?.(err as never, body, req as never);

    expect(logger.warn).toHaveBeenCalledWith('API Response failed validation', {
      errors: err.errors,
      url: req.url,
      body,
    });
  });
});
