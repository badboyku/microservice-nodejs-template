import correlator from 'express-correlation-id';
import { logReqRes } from '@middlewares/morgan';
import { config } from '@utils';

jest.mock('@utils/config');

describe('Morgan Middleware', () => {
  const configAppDefault = { logLevel: '', logOutputFormat: '', name: '', nodeEnv: '', port: 0, version: '' };

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
    const severity = 'INFO';
    const message = 'API request received/response sent';
    const context = {
      req: { method, url, ip: remoteAddr, referrer, userAgent },
      res: { status, contentLength: `${contentLength} B`, time: `${responseTime} ms` },
      totalTime: `${totalTime} ms`,
    };
    const log = { correlationId, severity, message, context };

    const testCases = [
      { test: 'successfully', configApp: configAppDefault, expected: JSON.stringify(log) },
      {
        test: 'with logOutputFormat=DEV',
        configApp: { ...configAppDefault, logOutputFormat: 'DEV' },
        expected: JSON.stringify(log, null, 4),
      },
    ];
    testCases.forEach(({ test, configApp, expected }) => {
      describe(`${test}`, () => {
        let result: string;

        beforeEach(() => {
          config.app = configApp;
          jest.spyOn(correlator, 'getId').mockReturnValue(correlationId);

          result = logReqRes(tokens as never, req as never, res as never);
        });

        afterEach(() => {
          jest.restoreAllMocks();
        });

        it('returns log stringified', () => {
          expect(result).toEqual(expected);
        });
      });
    });
  });
});
