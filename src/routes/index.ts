/* istanbul ignore file */
import {Router} from 'express';
import healthRoute from '@routes/healthRoute';
import {apiError} from '@utils/middlewares';

const route = Router();

route.use('/health', healthRoute);
route.use('*', apiError.notAuthorized);

export default route;
