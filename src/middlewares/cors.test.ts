import config from 'utils/config';
import { getCorsOptions } from './cors';

type CorsOptions = { origin: (r: string | undefined, cb: () => void) => void };

jest.mock('utils/config');

describe('Cors Middleware', () => {
  const configCorsDefault = { allowedHeaders: '', credentials: false, whitelist: '' };
  const callback = jest.fn();

  describe('calls function getCorsOptions', () => {
    describe('successfully', () => {
      beforeEach(() => {
        config.cors = { ...configCorsDefault, allowedHeaders: 'allowed,headers', credentials: true };
      });

      it('returns origin option', () => {
        expect(getCorsOptions().origin).toEqual(expect.any(Function));
      });

      it('returns allowedHeaders option', () => {
        expect(getCorsOptions().allowedHeaders).toEqual(['allowed', 'headers']);
      });

      it('returns credentials option', () => {
        expect(getCorsOptions().credentials).toEqual(true);
      });

      it('returns maxAge option', () => {
        expect(getCorsOptions().maxAge).toEqual(7200);
      });
    });

    describe('when calling option origin function', () => {
      const testCases = [
        { test: 'undefined', requestOrigin: undefined },
        { test: 'matching in whitelist', requestOrigin: 'domain1', configCors: { whitelist: 'domain1,domain2' } },
      ];
      testCases.forEach(({ test, requestOrigin, configCors }) => {
        describe(`with requestOrigin ${test}`, () => {
          it('calls callback with "null, true"', () => {
            config.cors = { ...configCorsDefault, ...configCors };

            (getCorsOptions() as CorsOptions).origin(requestOrigin, callback);

            expect(callback).toHaveBeenCalledWith(null, true);
          });
        });
      });

      describe('with requestOrigin not matching in whitelist', () => {
        it('calls callback with Error', () => {
          config.cors = { ...configCorsDefault, whitelist: 'domain1,domain2' };

          (getCorsOptions() as CorsOptions).origin('foo', callback);

          expect(callback).toHaveBeenCalledWith(new Error('Not allowed by CORS'));
        });
      });
    });
  });
});
