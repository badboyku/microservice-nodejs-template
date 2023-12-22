/* eslint-disable @typescript-eslint/ban-ts-comment */
import {getCorsOptions} from '@middlewares/cors';
import {config} from '@utils';

jest.mock('@utils/config');

describe('Cors Middleware', () => {
  const configCorsDefault = { allowedHeaders: '', credentials: false, whitelist: '' };

  describe('calls function getCorsOptions', () => {
    const callback = jest.fn();

    describe('successfully', () => {
      beforeEach(() => {
        config.cors = { ...configCorsDefault, allowedHeaders: 'allowed,headers', credentials: true };
      });

      it('returns origin option', () => {
        const options = getCorsOptions();

        expect(options.origin).toEqual(expect.any(Function));
      });

      it('returns allowedHeaders option', () => {
        const options = getCorsOptions();

        expect(options.allowedHeaders).toEqual(['allowed', 'headers']);
      });

      it('returns credentials option', () => {
        const options = getCorsOptions();

        expect(options.credentials).toEqual(true);
      });

      it('returns maxAge option', () => {
        const options = getCorsOptions();

        expect(options.maxAge).toEqual(7200);
      });
    });

    describe('when calling option origin function', () => {
      const testCases = [
        { test: 'undefined', requestOrigin: undefined, configCors: configCorsDefault },
        {
          test: 'matching in whitelist',
          requestOrigin: 'domain1',
          configCors: { ...configCorsDefault, whitelist: 'domain1,domain2' },
        },
      ];
      testCases.forEach(({ test, requestOrigin, configCors }) => {
        describe(`with requestOrigin ${test}`, () => {
          beforeEach(() => {
            config.cors = configCors;
          });

          it('calls callback with "null, true"', () => {
            const options = getCorsOptions();
            // @ts-ignore
            options.origin(requestOrigin, callback);

            expect(callback).toHaveBeenCalledWith(null, true);
          });
        });
      });

      describe('with requestOrigin not matching in whitelist', () => {
        const requestOrigin = 'foo';

        beforeEach(() => {
          config.cors = { ...configCorsDefault, whitelist: 'domain1,domain2' };
        });

        it('calls callback with Error', () => {
          const options = getCorsOptions();
          // @ts-ignore
          options.origin(requestOrigin, callback);

          expect(callback).toHaveBeenCalledWith(new Error('Not allowed by CORS'));
        });
      });
    });
  });
});
