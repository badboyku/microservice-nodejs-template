/* istanbul ignore file */
import { Router } from 'express';
import config from 'utils/config';
import healthRoute from './healthRoute';
import openApiRoute from './openApiRoute';

const route = Router();

if (config.app.nodeEnv?.toLowerCase() === 'development') {
  route.use('/api-docs', openApiRoute);
}

route.use('/health', healthRoute);

export default route;
