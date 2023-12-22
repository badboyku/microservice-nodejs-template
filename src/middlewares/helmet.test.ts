import { getHelmetOptions } from '@middlewares/helmet';

describe('Helmet Middleware', () => {
  describe('calls function getHelmetOptions', () => {
    describe('successfully', () => {
      it('returns crossOriginResourcePolicy option', () => {
        const result = getHelmetOptions();

        expect(result.crossOriginResourcePolicy).toEqual({ policy: 'cross-origin' });
      });

      it('returns referrerPolicy option', () => {
        const result = getHelmetOptions();

        expect(result.referrerPolicy).toEqual({ policy: 'strict-origin' });
      });
    });
  });
});
