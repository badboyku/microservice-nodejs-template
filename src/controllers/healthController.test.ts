import { healthController } from '@controllers';
import { healthService } from '@services';

jest.mock('@services/healthService');
jest.mock('@utils/logger');

describe('Health Controller', () => {
  describe('calls function checkHealth', () => {
    const req = {};
    const res = { status: jest.fn(), json: jest.fn() };
    const next = jest.fn();

    describe('successfully', () => {
      const data = { status: 'ok' };

      beforeEach(() => {
        jest.spyOn(healthService, 'checkHealth').mockReturnValue({ data });

        healthController.checkHealth(req as never, res as never, next);
      });

      afterEach(() => {
        jest.restoreAllMocks();
      });

      it('calls healthService.checkHealth', () => {
        expect(healthService.checkHealth).toHaveBeenCalledWith();
      });

      it('sets status on response with 200', () => {
        expect(res.status).toHaveBeenCalledWith(200);
      });

      it('sets json on response with data', () => {
        expect(res.json).toHaveBeenCalledWith({ ok: true, data });
      });
    });

    describe('with error', () => {
      const error = { code: 400, message: 'foo bar' };

      beforeEach(() => {
        jest.spyOn(healthService, 'checkHealth').mockReturnValue({ error });

        healthController.checkHealth(req as never, res as never, next);
      });

      afterEach(() => {
        jest.restoreAllMocks();
      });

      it('sets status on response with error code', () => {
        expect(res.status).toHaveBeenCalledWith(error.code);
      });

      it('sets json on response with error message', () => {
        expect(res.json).toHaveBeenCalledWith({ ok: false, error: error.message });
      });
    });

    describe('with exception', () => {
      const error = new Error('Foo Bar');

      beforeEach(() => {
        jest.spyOn(healthService, 'checkHealth').mockImplementation(() => {
          throw error;
        });

        healthController.checkHealth(req as never, res as never, next);
      });

      afterEach(() => {
        jest.restoreAllMocks();
      });

      it('calls next with error', () => {
        expect(next).toHaveBeenCalledWith(error);
      });
    });
  });
});
