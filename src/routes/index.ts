/* istanbul ignore file */
import { Router } from 'express';
import openApiRoute from '@routes/openApiRoute';
import { config } from '@utils';
import { apiError } from '@middlewares';
import healthRoute from '@routes/healthRoute';

const route = Router();

route.use('/health', healthRoute);

if (config.app.nodeEnv?.toLowerCase() === 'development') {
  route.use('/api-docs', openApiRoute);
}

route.use('*', apiError.notAuthorized);

export default route;
