/* istanbul ignore file */
import { Router } from 'express';
import apiError from 'middlewares/apiError';
import config from 'utils/config';
import healthRoute from './healthRoute';
import openApiRoute from './openApiRoute';

const route = Router();

if (config.app.nodeEnv?.toLowerCase() === 'development') {
  route.use('/api-docs', openApiRoute);
}

route.use('/health', healthRoute);
route.use('*splat', apiError.notAuthorized);

export default route;
