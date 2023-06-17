import cors from 'cors';
import { config } from '@utils';
import type { CorsOptions } from 'cors';

export const getCorsOptions = (): CorsOptions => ({
  origin: (requestOrigin: string | undefined, callback: (err: Error | null, origin?: boolean) => void) => {
    const corsWhiteList = config.cors.whitelist.split(',').map((str) => new RegExp(str));

    if (!requestOrigin || corsWhiteList.find((re) => re.test(requestOrigin)) !== undefined) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  allowedHeaders: config.cors.allowedHeaders.split(','),
  credentials: config.cors.credentials,
  maxAge: 7200, // Prevent sending multiple preflight OPTIONS requests.
});

export default cors(getCorsOptions());
