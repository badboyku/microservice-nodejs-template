import type {HelmetOptions} from 'helmet';
import helmet from 'helmet';

export const getHelmetOptions = (): HelmetOptions => ({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  referrerPolicy: { policy: 'strict-origin' },
});

export default helmet(getHelmetOptions());
