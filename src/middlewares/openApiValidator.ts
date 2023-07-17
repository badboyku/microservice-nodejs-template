import { middleware, serdes } from 'express-openapi-validator';
import { logger } from '@utils';
import type { Request } from 'express';
import type { InternalServerError } from 'express-openapi-validator/dist/framework/types';
import type { OpenApiValidatorOpts } from 'express-openapi-validator/dist/openapi.validator';

export const getValidatorOptions = (): OpenApiValidatorOpts => ({
  apiSpec: './openapi.yml',
  ignorePaths: /api-docs/i,
  validateRequests: { removeAdditional: 'all' },
  validateResponses: {
    removeAdditional: 'all',
    onError(error: InternalServerError, body: object, req: Request) {
      logger.warn('API Response failed validation', { errors: error.errors, url: req.url, body });
    },
  },
  serDes: [serdes.dateTime.serializer, serdes.date.serializer],
});

export default middleware(getValidatorOptions());
