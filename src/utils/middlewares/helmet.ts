import helmet from 'helmet';
import type { HelmetOptions } from 'helmet';

export const getHelmetOptions = (): HelmetOptions => ({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  referrerPolicy: { policy: 'strict-origin' },
});

export default helmet(getHelmetOptions());
