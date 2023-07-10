/* istanbul ignore file */
import express from 'express';
import { apiError, correlator, cors, helmet, morgan } from '@middlewares';
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

// Add routes
app.use('/', routes);

// Handle error
app.use(apiError.logError);
app.use(apiError.handleError);

// Start app
app.listen(config.app.port, () => {
  logger.info('App is running', { config: config.app });
});
