/* istanbul ignore file */
import { Router } from 'express';
import { apiError } from '@middlewares';
import healthRoute from '@routes/healthRoute';
import openApiRoute from '@routes/openApiRoute';
import { config } from '@utils';

const route = Router();

if (config.app.nodeEnv?.toLowerCase() === 'development') {
  route.use('/api-docs', openApiRoute);
}

route.use('/health', healthRoute);
route.use('*', apiError.notAuthorized);

export default route;
