/* istanbul ignore file */
import express, { json, urlencoded } from 'express';
import { apiError, correlator, cors, helmet, morgan, openApiValidator } from '@middlewares';
import routes from '@routes';
import { config, logger } from '@utils';

// Create app
const app = express();

// Add middlewares
app.use(helmet);
app.use(correlator);
app.options('*', cors); // Enabling cors pre-flight
app.use(cors);
app.use(morgan);
app.use(json({ type: 'application/json' }));
app.use(urlencoded({ type: ['application/x-www-form-urlencoded', 'multipart-form-data'], extended: true }));

// Add routes
app.use('/', routes);

// Add validator
app.use(openApiValidator);

// Handle error
app.use(apiError.logError);
app.use(apiError.handleError);

// Start app
app.listen(config.app.port, () => {
  logger.info('App is running', { config: config.app });
});
