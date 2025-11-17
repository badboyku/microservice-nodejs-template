/* istanbul ignore file */
import fs from 'node:fs';
import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yaml';
import config from 'utils/config';
import type { NextFunction, Request, Response } from 'express';

const swaggerDoc = yaml.parse(fs.readFileSync('./openapi.yml', 'utf8'));
const swaggerOptions = {
  displayOperationId: true,
  defaultModelsExpandDepth: 5,
  defaultModelExpandDepth: 5,
  displayRequestDuration: true,
  requestSnippetsEnabled: true,
  persistAuthorization: true,
};
const swaggerUiOptions = { customCss: '.swagger-ui .topbar { display: none }', swaggerOptions };

const updateSwaggerDoc = (req: Request, _res: Response, next: NextFunction) => {
  const host = req.get('host') || '';
  const protocol = /^localhost/.test(host) ? 'http' : 'https';
  const url = `${protocol}://${host}`;

  req.swaggerDoc = {
    ...swaggerDoc,
    servers: [{ url }],
    host: url,
    info: { ...swaggerDoc.info, title: config.app.name, version: config.app.version },
  };

  return next();
};

const route = Router();

route.use('/', updateSwaggerDoc, swaggerUi.serveFiles(undefined, swaggerUiOptions));
route.get('/', updateSwaggerDoc, swaggerUi.setup(undefined, swaggerUiOptions, swaggerOptions));
route.get('/swagger.json', updateSwaggerDoc, (req, res) => res.json(req.swaggerDoc));

export default route;
