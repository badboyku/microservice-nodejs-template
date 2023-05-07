import {healthService} from '@services';
import type {CheckHealthResult} from '@types';

describe('Health Service', () => {
  describe('calls function checkHealth', () => {
    describe('successfully', () => {
      const code = 200;
      const body = { status: 'ok' };
      let result: CheckHealthResult;

      beforeEach(() => {
        result = healthService.checkHealth();
      });

      it('return code', () => {
        expect(result.code).toEqual(code);
      });

      it('return body', () => {
        expect(result.body).toEqual(body);
      });
    });
  });
});
