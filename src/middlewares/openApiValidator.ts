import { middleware, serdes } from 'express-openapi-validator';
import logger from 'utils/logger';
import type { Request } from 'express';
import type { InternalServerError } from 'express-openapi-validator/dist/framework/types';
import type { OpenApiValidatorOpts } from 'express-openapi-validator/dist/openapi.validator';

export const getOpenApiValidatorOptions = (): OpenApiValidatorOpts => ({
  apiSpec: './openapi.yml',
  ignorePaths: /api-docs/i,
  validateRequests: { coerceTypes: true, removeAdditional: 'all' },
  validateResponses: {
    removeAdditional: 'all',
    onError(err: InternalServerError, json: unknown, req: Request) {
      logger.warn('API Response failed validation', { errors: err.errors, url: req.url, body: json });
    },
  },
  serDes: [serdes.dateTime.serializer, serdes.date.serializer],
});

export default middleware(getOpenApiValidatorOptions());
