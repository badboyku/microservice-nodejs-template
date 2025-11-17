import logger from 'utils/logger';
import { getOpenApiValidatorOptions } from './openApiValidator';

type OpenApiValidatorOpts = { validateResponses: { onError: (e: never, j: never, r: never) => void } };

jest.mock('utils/logger');

describe('OpenApiValidator Middleware', () => {
  it('returns apiSpec option', () => {
    expect(getOpenApiValidatorOptions().apiSpec).toEqual('./openapi.yml');
  });

  it('returns ignorePaths option', () => {
    expect(getOpenApiValidatorOptions().ignorePaths).toEqual(/api-docs/i);
  });

  it('returns validateRequests.coerceTypes option', () => {
    expect(getOpenApiValidatorOptions().validateRequests).toHaveProperty('coerceTypes', true);
  });

  it('returns validateRequests.removeAdditional option', () => {
    expect(getOpenApiValidatorOptions().validateRequests).toHaveProperty('removeAdditional', 'all');
  });

  it('returns validateRequests.validateResponses option', () => {
    expect(getOpenApiValidatorOptions().validateResponses).toHaveProperty('removeAdditional', 'all');
  });

  it('logs when response validation fails', () => {
    const err = { errors: 'foo' };
    const body = { data: 'hello' };
    const req = { url: '/foo' };

    (getOpenApiValidatorOptions() as OpenApiValidatorOpts).validateResponses.onError(
      err as never,
      body as never,
      req as never,
    );

    expect(logger.warn).toHaveBeenCalledWith('API Response failed validation', {
      errors: err.errors,
      url: req.url,
      body,
    });
  });
});
