import { logger } from '@utils';
import type { CheckHealthResult } from '@types';

const checkHealth = (): CheckHealthResult => {
  logger.debug('healthService: checkHealth called');

  return { data: { status: 'ok' } };
};

export default { checkHealth };
