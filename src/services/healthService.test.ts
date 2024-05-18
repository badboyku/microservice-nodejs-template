import healthService from 'services/healthService';

jest.mock('utils/logger');

describe('Health Service', () => {
  describe('calls function checkHealth', () => {
    describe('successfully', () => {
      it('return data with status ok', () => {
        const result = healthService.checkHealth();

        expect(result).toEqual({ data: { status: 'ok' } });
      });
    });
  });
});
