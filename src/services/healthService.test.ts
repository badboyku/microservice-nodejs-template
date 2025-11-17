import healthService from 'services/healthService';

jest.mock('utils/logger');

describe('Health Service', () => {
  describe('calls function checkHealth', () => {
    describe('successfully', () => {
      it('return data with status ok', () => {
        expect(healthService.checkHealth()).toEqual({ data: { status: 'ok' } });
      });
    });
  });
});
