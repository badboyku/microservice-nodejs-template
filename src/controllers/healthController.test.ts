import healthService from 'services/healthService';
import healthController from './healthController';

jest.mock('services/healthService');
jest.mock('utils/logger');

describe('Health Controller', () => {
  describe('calls function checkHealth', () => {
    const healthServiceCheckHealthMock = jest.mocked(healthService.checkHealth);
    const req = {};
    const res = { status: jest.fn(), json: jest.fn() };
    const next = jest.fn();

    describe('successfully', () => {
      const data = { status: 'ok' };

      beforeEach(() => {
        healthServiceCheckHealthMock.mockReturnValue({ data });
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('calls healthService.checkHealth', () => {
        healthController.checkHealth(req as never, res as never, next);

        expect(healthServiceCheckHealthMock).toHaveBeenCalled();
      });

      it('calls res.status with 200', () => {
        healthController.checkHealth(req as never, res as never, next);

        expect(res.status).toHaveBeenCalledWith(200);
      });

      it('calls res.json with data', () => {
        healthController.checkHealth(req as never, res as never, next);

        expect(res.json).toHaveBeenCalledWith({ ok: true, data });
      });
    });

    describe('with exception', () => {
      const error = new Error('Foo');

      beforeEach(() => {
        healthServiceCheckHealthMock.mockImplementation(() => {
          throw error;
        });
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('calls next with error', () => {
        healthController.checkHealth(req as never, res as never, next);

        expect(next).toHaveBeenCalledWith(error);
      });
    });
  });
});
