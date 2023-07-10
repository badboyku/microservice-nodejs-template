/* eslint-disable @typescript-eslint/ban-ts-comment */
import { config } from '@utils';
import { getCorsOptions } from '@middlewares/cors';
import type { CorsOptions } from 'cors';

jest.mock('@utils/config');

describe('Cors Middleware', () => {
  const configCorsDefault = { allowedHeaders: '', credentials: false, whitelist: '' };

  describe('calls function getCorsOptions', () => {
    const callback = jest.fn();
    let options: CorsOptions;

    describe('successfully', () => {
      beforeEach(() => {
        config.cors = { ...configCorsDefault, allowedHeaders: 'allowed,headers', credentials: true };

        options = getCorsOptions();
      });

      it('returns allowedHeaders option', () => {
        expect(options.allowedHeaders).toEqual(['allowed', 'headers']);
      });

      it('returns credentials option', () => {
        expect(options.credentials).toEqual(true);
      });
    });

    describe('when calling option origin function', () => {
      describe('with requestOrigin undefined', () => {
        const requestOrigin = undefined;

        beforeEach(() => {
          config.cors = { ...configCorsDefault };
          options = getCorsOptions();

          // @ts-ignore
          options.origin(requestOrigin, callback);
        });

        it('calls callback with null, true', () => {
          expect(callback).toHaveBeenCalledWith(null, true);
        });
      });

      describe('with requestOrigin matching in whitelist', () => {
        const requestOrigin = 'domain1';

        beforeEach(() => {
          config.cors = { ...configCorsDefault, whitelist: 'domain1,domain2' };
          options = getCorsOptions();

          // @ts-ignore
          options.origin(requestOrigin, callback);
        });

        it('calls callback with null, true', () => {
          expect(callback).toHaveBeenCalledWith(null, true);
        });
      });

      describe('with requestOrigin not matching in whitelist', () => {
        const requestOrigin = 'foo';

        beforeEach(() => {
          config.cors = { ...configCorsDefault, whitelist: 'domain1,domain2' };
          options = getCorsOptions();

          // @ts-ignore
          options.origin(requestOrigin, callback);
        });

        it('calls callback with Error', () => {
          expect(callback).toHaveBeenCalledWith(new Error('Not allowed by CORS'));
        });
      });
    });
  });
});
