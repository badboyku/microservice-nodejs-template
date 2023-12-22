import { healthService } from '@services';

jest.mock('@utils/logger');

describe('Health Service', () => {
  describe('calls function checkHealth', () => {
    describe('successfully', () => {
      it('return data', () => {
        const result = healthService.checkHealth();

        expect(result).toEqual({ data: { status: 'ok' } });
      });
    });
  });
});
