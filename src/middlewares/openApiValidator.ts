import { middleware, serdes } from 'express-openapi-validator';
import logger from 'utils/logger';

export const getOpenApiValidatorOptions = (): Parameters<typeof middleware>[0] => ({
  apiSpec: './openapi.yml',
  ignorePaths: /api-docs/i,
  validateRequests: { coerceTypes: true, removeAdditional: 'all' },
  validateResponses: {
    removeAdditional: 'all',
    onError(error, body, req) {
      logger.warn('API Response failed validation', { errors: error.errors, url: req.url, body });
    },
  },
  serDes: [serdes.dateTime.serializer, serdes.date.serializer],
});

export default middleware(getOpenApiValidatorOptions());
