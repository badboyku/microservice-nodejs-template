import healthService from 'services/healthService';
import healthController from './healthController';

jest.mock('services/healthService');
jest.mock('utils/logger');

describe('Health Controller', () => {
  const req = {};
  const res = { status: jest.fn(), json: jest.fn() };
  const next = jest.fn();

  const healthServiceMock = jest.mocked(healthService);

  describe('calls function checkHealth', () => {
    describe('successfully', () => {
      const data = { status: 'ok' };

      beforeEach(() => {
        healthServiceMock.checkHealth.mockReturnValue({ data });
      });

      it('calls healthService.checkHealth', () => {
        healthController.checkHealth(req as never, res as never, next);

        expect(healthServiceMock.checkHealth).toHaveBeenCalled();
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
        healthServiceMock.checkHealth.mockImplementation(() => {
          throw error;
        });
      });

      it('calls next with error', () => {
        healthController.checkHealth(req as never, res as never, next);

        expect(next).toHaveBeenCalledWith(error);
      });
    });
  });
});
