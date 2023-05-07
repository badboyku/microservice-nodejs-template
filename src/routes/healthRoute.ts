/* istanbul ignore file */
import { Router } from 'express';
import { healthController } from '@controllers';

const route = Router();

route.get('/', healthController.checkHealth);

export default route;
