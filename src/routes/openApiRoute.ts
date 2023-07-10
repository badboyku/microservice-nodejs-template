/* istanbul ignore file */
import fs from 'fs';
import type {NextFunction, Request, Response} from 'express';
import {Router} from 'express';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yaml';
import {config} from '@utils';

const swaggerDoc = yaml.parse(fs.readFileSync('./openapi.yml', 'utf8'));
const swaggerOptions = {
  displayOperationId: true,
  defaultModelsExpandDepth: 5,
  defaultModelExpandDepth: 5,
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
