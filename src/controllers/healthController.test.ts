import { healthController } from '@controllers';
import { healthService } from '@services';

jest.mock('@services/healthService');
jest.mock('@utils/logger');

describe('Health Controller', () => {
  describe('calls function checkHealth', () => {
    const healthServiceCheckHealthMock = jest.mocked(healthService.checkHealth);
    const req = {};
    const res = { status: jest.fn(), json: jest.fn() };
    const next = jest.fn();

    describe('successfully', () => {
      const data = { foo: 'bar' };

      beforeEach(() => {
        healthServiceCheckHealthMock.mockReturnValueOnce({ data } as never);
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('calls healthService.checkHealth', () => {
        healthController.checkHealth(req as never, res as never, next as never);

        expect(healthServiceCheckHealthMock).toHaveBeenCalled();
      });

      it('calls res.status with 200', () => {
        healthController.checkHealth(req as never, res as never, next as never);

        expect(res.status).toHaveBeenCalledWith(200);
      });

      it('calls res.json with ok=true and data', () => {
        healthController.checkHealth(req as never, res as never, next as never);

        expect(res.json).toHaveBeenCalledWith({ ok: true, data });
      });
    });

    describe('with no error, and no data', () => {
      beforeEach(() => {
        healthServiceCheckHealthMock.mockReturnValueOnce({} as never);
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('calls res.status with 200', () => {
        healthController.checkHealth(req as never, res as never, next as never);

        expect(res.status).toHaveBeenCalledWith(200);
      });

      it('calls res.json with ok=true and data=undefined', () => {
        healthController.checkHealth(req as never, res as never, next as never);

        expect(res.json).toHaveBeenCalledWith({ ok: true, data: undefined });
      });
    });

    describe('with error containing code and message', () => {
      const error = { code: 500, message: 'foo bar' };

      beforeEach(() => {
        healthServiceCheckHealthMock.mockReturnValueOnce({ error } as never);
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('calls res.status with error.code', () => {
        healthController.checkHealth(req as never, res as never, next as never);

        expect(res.status).toHaveBeenCalledWith(error.code);
      });

      it('calls res.json with ok=false and error=error.message', () => {
        healthController.checkHealth(req as never, res as never, next as never);

        expect(res.json).toHaveBeenCalledWith({ ok: false, error: error.message });
      });
    });

    describe('with error containing no code and no message', () => {
      beforeEach(() => {
        healthServiceCheckHealthMock.mockReturnValueOnce({ error: {} } as never);
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('calls res.status with 200', () => {
        healthController.checkHealth(req as never, res as never, next as never);

        expect(res.status).toHaveBeenCalledWith(200);
      });

      it('calls res.json with ok=false and error=undefined', () => {
        healthController.checkHealth(req as never, res as never, next as never);

        expect(res.json).toHaveBeenCalledWith({ ok: false, error: undefined });
      });
    });

    describe('with error containing no code and no message, and data', () => {
      const data = { foo: 'bar' };

      beforeEach(() => {
        healthServiceCheckHealthMock.mockReturnValueOnce({ data, error: {} } as never);
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('calls res.status with 200', () => {
        healthController.checkHealth(req as never, res as never, next as never);

        expect(res.status).toHaveBeenCalledWith(200);
      });

      it('calls res.json with ok=false and error=data', () => {
        healthController.checkHealth(req as never, res as never, next as never);

        expect(res.json).toHaveBeenCalledWith({ ok: false, error: data });
      });
    });

    describe('with exception', () => {
      const error = new Error('Foo Bar');

      beforeEach(() => {
        healthServiceCheckHealthMock.mockImplementation(() => {
          throw error;
        });
      });

      afterAll(() => {
        jest.restoreAllMocks();
      });

      it('calls next with error', () => {
        healthController.checkHealth(req as never, res as never, next as never);

        expect(next).toHaveBeenCalledWith(error);
      });
    });
  });
});
