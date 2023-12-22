import correlator from 'express-correlation-id';
import { logReqRes } from '@middlewares/morgan';
import { config } from '@utils';

jest.mock('@utils/config');

describe('Morgan Middleware', () => {
  const configAppDefault = { logLevel: '', logOutputFormat: '', name: '', nodeEnv: '', port: 0, version: '' };
  const correlatorGetIdMock = jest.mocked(correlator.getId);

  describe('calls function logReqRes', () => {
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

    describe('successfully', () => {
      beforeEach(() => {
        correlatorGetIdMock.mockReturnValueOnce(correlationId);
        jest.spyOn(JSON, 'stringify').mockReturnValueOnce(logStringified);
        config.app = configAppDefault;
      });

      afterEach(() => {
        jest.restoreAllMocks();
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
      beforeEach(() => {
        config.app = { ...configAppDefault, logOutputFormat: 'DEV' };
        correlatorGetIdMock.mockReturnValueOnce(correlationId);
        jest.spyOn(JSON, 'stringify').mockReturnValueOnce(logStringified);
      });

      afterEach(() => {
        jest.restoreAllMocks();
      });

      it('calls JSON.stringify with spaces', () => {
        logReqRes(tokens as never, req as never, res as never);

        expect(JSON.stringify).toHaveBeenCalledWith(log, null, 4);
      });
    });
  });
});
