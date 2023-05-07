import {getHelmetOptions} from '@utils/middlewares/helmet';
import type {HelmetOptions} from 'helmet';

describe('utils/middleware helmet', () => {
  describe('calls function getHelmetOptions', () => {
    let result: HelmetOptions;

    describe('successfully', () => {
      beforeEach(() => {
        result = getHelmetOptions();
      });

      it('returns crossOriginResourcePolicy option', () => {
        expect(result.crossOriginResourcePolicy).toEqual({ policy: 'cross-origin' });
      });

      it('returns referrerPolicy option', () => {
        expect(result.referrerPolicy).toEqual({ policy: 'strict-origin' });
      });
    });
  });
});
