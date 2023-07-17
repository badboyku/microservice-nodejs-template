import { getValidatorOptions } from '@middlewares/openApiValidator';
import { logger } from '@utils';
import type { ValidateRequestOpts, ValidateResponseOpts } from 'express-openapi-validator/dist/framework/types';
import type { OpenApiValidatorOpts } from 'express-openapi-validator/dist/openapi.validator';

jest.mock('@utils/logger');

describe('OpenApiValidator Middleware', () => {
  describe('calls function getValidatorOptions', () => {
    let options: OpenApiValidatorOpts;

    describe('successfully', () => {
      beforeEach(() => {
        options = getValidatorOptions();
      });

      it('returns apiSpec option', () => {
        expect(options.apiSpec).toEqual('./openapi.yml');
      });

      it('returns ignorePaths option', () => {
        expect(options.ignorePaths).toEqual(/api-docs/i);
      });

      it('returns validateRequests.removeAdditional option', () => {
        const validateRequests = options.validateRequests as ValidateRequestOpts;

        expect(validateRequests?.removeAdditional).toEqual('all');
      });

      it('returns validateRequests.validateResponses option', () => {
        const validateResponses = options.validateResponses as ValidateResponseOpts;

        expect(validateResponses?.removeAdditional).toEqual('all');
      });

      it('returns serDes option', () => {
        expect(options.serDes).toEqual([
          { format: 'date-time', serialize: expect.any(Function) },
          { format: 'date', serialize: expect.any(Function) },
        ]);
      });
    });

    describe('when calling onError from options', () => {
      const error = { errors: [] };
      const body = {};
      const req = { url: 'url' };

      beforeEach(() => {
        jest.spyOn(logger, 'warn');

        options = getValidatorOptions();
        const validateResponses = options.validateResponses as ValidateResponseOpts;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        validateResponses.onError(error as never, body, req as never);
      });

      it('calls logger.warn', () => {
        expect(logger.warn).toHaveBeenCalledWith('API Response failed validation', {
          errors: error.errors,
          url: req.url,
          body,
        });
      });
    });
  });
});
