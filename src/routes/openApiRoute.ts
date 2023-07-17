/* istanbul ignore file */
import fs from 'fs';
import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yaml';
import { config } from '@utils';
import type { NextFunction, Request, Response } from 'express';

const swaggerDoc = yaml.parse(fs.readFileSync('./openapi.yml', 'utf8'));
const swaggerOptions = {
  defaultModelExpandDepth: 5,
  defaultModelsExpandDepth: 5,
  displayOperationId: true,
  displayRequestDuration: true,
  requestSnippetsEnabled: true,
};
const swaggerUiOptions = { customCss: '.swagger-ui .topbar { display: none }', swaggerOptions };

const updateDocs = (req: Request, res: Response, next: NextFunction) => {
  const url = `${req.protocol}://${req.get('host')}`;
  req.swaggerDoc = {
    ...swaggerDoc,
    servers: [{ url }],
    host: url,
    info: { ...swaggerDoc.info, title: config.app.name, version: config.app.version },
  };

  return next();
};

const route = Router();

route.use('/', updateDocs, swaggerUi.serveFiles(undefined, swaggerUiOptions));
route.get('/', updateDocs, swaggerUi.setup(undefined, swaggerUiOptions, swaggerOptions));
route.get('/swagger.json', updateDocs, (req, res) => res.json(req.swaggerDoc));

export default route;
