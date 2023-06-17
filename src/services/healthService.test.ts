import { healthService } from '@services';
import type { CheckHealthResult } from '@types';

jest.mock('@utils/logger');

describe('Health Service', () => {
  describe('calls function checkHealth', () => {
    describe('successfully', () => {
      let result: CheckHealthResult;

      beforeEach(() => {
        result = healthService.checkHealth();
      });

      it('return data', () => {
        expect(result).toEqual({ data: { status: 'ok' } });
      });
    });
  });
});
