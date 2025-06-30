/* istanbul ignore file */
import express, { json, urlencoded } from 'express';
import apiError from 'middlewares/apiError';
import correlator from 'middlewares/correlator';
import cors from 'middlewares/cors';
import helmet from 'middlewares/helmet';
import morgan from 'middlewares/morgan';
import openApiValidator from 'middlewares/openApiValidator';
import routes from 'routes/index';
import config from 'utils/config';
import logger from 'utils/logger';

// Create app.
const app = express();
app.disable('x-powered-by');

// Add middlewares.
app.use(helmet);
app.use(correlator);
app.options('*splat', cors); // Enabling cors pre-flight.
app.use(cors);
app.use(morgan);
app.use(json({ type: 'application/json' }));
app.use(urlencoded({ type: ['application/x-www-form-urlencoded', 'multipart-form-data'], extended: true }));
app.use(openApiValidator);

// Add routes.
app.use('/', routes);

// Handle error.
app.use(apiError.logError);
app.use(apiError.handleError);

// Start app.
app.listen(config.app.port, () => {
  logger.info('App is running', { config: config.app });
});
