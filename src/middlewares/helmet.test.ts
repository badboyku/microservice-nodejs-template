import { getHelmetOptions } from './helmet';

describe('Helmet Middleware', () => {
  describe('calls function getHelmetOptions', () => {
    describe('successfully', () => {
      it('returns crossOriginResourcePolicy option', () => {
        expect(getHelmetOptions().crossOriginResourcePolicy).toEqual({ policy: 'cross-origin' });
      });

      it('returns referrerPolicy option', () => {
        expect(getHelmetOptions().referrerPolicy).toEqual({ policy: 'strict-origin' });
      });
    });
  });
});
