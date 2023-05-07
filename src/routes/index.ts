/* istanbul ignore file */
import { Router } from 'express';
import { apiError } from '@middlewares';
import healthRoute from '@routes/healthRoute';

const route = Router();

route.use('/health', healthRoute);
route.use('*', apiError.notAuthorized);

export default route;
