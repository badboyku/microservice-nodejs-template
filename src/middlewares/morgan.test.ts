import correlator from 'express-correlation-id';
import config from 'utils/config';
import { logReqRes } from './morgan';

jest.mock('utils/config');

describe('Morgan Middleware', () => {
  const configAppDefault = { logLevel: '', logOutputFormat: '', name: '', nodeEnv: '', port: 0, version: '' };
  const correlatorGetIdMock = jest.mocked(correlator.getId);

  describe('calls function logReqRes', () => {
    const timestamp = '2023-10-24T12:35:00.000Z';
    const now = new Date(timestamp);
    const correlationId = 'correlationId';
    const method = 'method';
    const url = 'url';
    const remoteAddr = 'remoteAddr';
    const referrer = 'referrer';
    const userAgent = 'userAgent';
    const status = 'status';
    const contentLength = 'contentLength';
    const responseTime = 'responseTime';
    const totalTime = 'totalTime';
    const toISOString = jest.fn();
    const configAppBackup = config.app;

    const tokens = {
      method: () => method,
      url: () => url,
      'remote-addr': () => remoteAddr,
      referrer: () => referrer,
      'user-agent': () => userAgent,
      status: () => status,
      res: () => contentLength,
      'response-time': () => responseTime,
      'total-time': () => totalTime,
    };
    const req = {};
    const res = {};

    const log = {
      timestamp,
      correlationId,
      severity: 'INFO',
      message: 'API request received/response sent',
      context: {
        req: { method, url, ip: remoteAddr, referrer, userAgent },
        res: { status, contentLength: `${contentLength} B`, time: `${responseTime} ms` },
        totalTime: `${totalTime} ms`,
      },
    };
    const logStringified = 'logStringified';

    beforeEach(() => {
      jest.useFakeTimers({ now });
      correlatorGetIdMock.mockReturnValueOnce(correlationId);
      toISOString.mockReturnValueOnce(timestamp);
      jest.spyOn(global, 'Date').mockImplementation(() => ({ toISOString }) as never);
      jest.spyOn(JSON, 'stringify').mockReturnValueOnce(logStringified);
    });
    afterEach(() => {
      jest.restoreAllMocks();
    });
    afterAll(() => {
      jest.useRealTimers();
      config.app = configAppBackup;
    });

    describe('successfully', () => {
      beforeEach(() => {
        config.app = configAppDefault;
      });

      it('calls Date toISOString', () => {
        logReqRes(tokens as never, req as never, res as never);

        expect(toISOString).toHaveBeenCalled();
      });

      it('calls correlator.getId', () => {
        logReqRes(tokens as never, req as never, res as never);

        expect(correlatorGetIdMock).toHaveBeenCalled();
      });

      it('calls JSON.stringify', () => {
        logReqRes(tokens as never, req as never, res as never);

        expect(JSON.stringify).toHaveBeenCalledWith(log);
      });

      it('returns log stringified', () => {
        const result = logReqRes(tokens as never, req as never, res as never);

        expect(result).toEqual(logStringified);
      });
    });

    describe('with logOutputFormat=DEV', () => {
      it('calls JSON.stringify with spaces', () => {
        config.app = { ...configAppDefault, logOutputFormat: 'DEV' };

        logReqRes(tokens as never, req as never, res as never);

        expect(JSON.stringify).toHaveBeenCalledWith(log, null, 4);
      });
    });
  });
});
